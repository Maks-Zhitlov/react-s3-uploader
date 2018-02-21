import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './styles';
import S3Upload from './s3upload.js';
import PropTypes from 'prop-types';
import { getDataTransferItems } from './helpers'
import FileList from './filelist';
import ModalWindow from './modalwindow'

class S3Uploader extends Component {
    myUploader;
    draggableEl;

    state = {
        files: [],
        disableUpload: false,
        dragOver: false,
        showModal: false,
        viewImageSrc: null
    };


    handleOpenModal = (file) => () => {
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({showModal: true, viewImageSrc: reader.result})
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    handleCloseModal = () => {
        this.setState({showModal: false})
    };

    handleInputChange = (e) => {
        this.mergeFilesList(getDataTransferItems(e));
    };

    onError = (status, file) => {
        const nextFiles = this.state.files.map(el => el.name !== file.name ? el : Object.assign(el, {status: 'Failed'}));
        this.setState({files: nextFiles, disableUpload: false});
        if (typeof this.props.onError === 'function') {
            this.props.onError();
        }
    };

    onProgress = (percent, status, file) => {
        const nextFiles = this.state.files.map(el => el.name !== file.name ? el : Object.assign(el, {status}));
        const allCompleted = nextFiles.every(el => el.status === 'Upload completed' || el.status === 'Failed');
        this.setState({
            files: nextFiles,
            disableUpload: !allCompleted
        });
        if (typeof this.props.onProgress === 'function') {
            this.props.onProgress();
        }
    };

    preprocess = (file, next) => {
        this.setState({disableUpload: true});
        if (typeof this.props.preprocess === 'function') {
            this.props.preprocess();
        }
        return next(file);
    };

    startUpload = () => {
        const {files} = this.state;
        this.myUploader = new S3Upload({
            ...this.props,
            files: files.filter(el => el.status !== 'Upload completed'),
            preprocess: this.preprocess,
            onProgress: this.onProgress,
            onError: this.onError,
        });
    };

    removeItem = (item = {}) => (e) => {
        e.preventDefault();
        this.setState({files: this.state.files.filter(el => el.name !== item.name)});
    };

    cleanFiles = () => {
        this.setState({files: []})
    };

    onDropFiles = (e) => {
        e.preventDefault();
        const {disableUpload} = this.state;
        if (!disableUpload) {
            this.setState({dragOver: false});
            const allowedFiles = this.props.accept === '*' ? getDataTransferItems(e) : getDataTransferItems(e).filter(el => this.props.accept.includes(el.type.split('/')[0]));
            this.mergeFilesList(allowedFiles);
        }
    };

    mergeFilesList = (nextFiles = []) => {
        const currentFiles = this.state.files
            .filter(el => el.status !== 'Upload completed')
            .filter(el => nextFiles.map(next => next.name).indexOf(el.name) === -1);

        this.setState({files: [].concat(currentFiles, nextFiles)});
    };

    onDragEnter = () => {
        const {disableUpload} = this.state;
        if (!disableUpload) {
            this.setState({dragOver: true});
        }
    };

    onDragLeave = (e) => {
        e.preventDefault();
        if (e.target === this.draggableEl && this.state.dragOver) {
            this.setState({dragOver: false});
        }
    };

    render() {
        const {files, disableUpload, dragOver, viewImageSrc} = this.state;
        const {classes, title, accept, ...rest} = this.props;

        return (
            <div
                ref={(el) => this.draggableEl = el}
                onDragStart={(e) => {
                    e.preventDefault();
                }}
                onDragEnter={this.onDragEnter}
                onDragOver={(e) => {
                    e.preventDefault();
                }}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDropFiles}
                className={`${classes.box} ${dragOver ? 'is-drag-over' : ''}`}>
                <header>{title}</header>
                <div className={`${classes.dropZoneArea} ${dragOver ? 'is-drag-over' : ''}`}>
                    <div>
                        <img
                            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5NC4xNTYgMjk0LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjk0LjE1NiAyOTQuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPHBhdGggZD0iTTIyNy4wMDIsMTA4LjI1NmMtMi43NTUtNDEuNzUxLTM3LjYtNzQuODc4LTgwLjAzNi03NC44NzhjLTQyLjQ0NywwLTc3LjI5OCwzMy4xNDEtODAuMDM4LDc0LjkwNyAgIEMyOC45NzgsMTEzLjA1OSwwLDE0NS4zOSwwLDE4NC4xODRjMCw0Mi4yMzQsMzQuMzYsNzYuNTk1LDc2LjU5NSw3Ni41OTVoMTE2LjQ4M2MzLjMxMywwLDYtMi42ODcsNi02cy0yLjY4Ny02LTYtNkg3Ni41OTUgICBDNDAuOTc3LDI0OC43NzgsMTIsMjE5LjgwMSwxMiwxODQuMTg0YzAtMzQuMjc1LDI2LjgzMy02Mi41NjgsNjEuMDg3LTY0LjQxMWMzLjE4NC0wLjE3MSw1LjY3OC0yLjgwMyw1LjY3OC01Ljk5MSAgIGMwLTAuMTE5LTAuMDAzLTAuMjM2LTAuMDEtMC4zNTVjMC4wOS0zNy41MzYsMzAuNjU0LTY4LjA0OSw2OC4yMTEtNjguMDQ5YzM3LjU2MywwLDY4LjEzMiwzMC41MTgsNjguMjExLDY4LjA2MyAgIGMtMC4wMDUsMC4xMTYtMC4wMDksMC4yMzgtMC4wMDksMC4zMjljMCwzLjE5NiwyLjUwNSw1LjgzMSw1LjY5Niw1Ljk5MmMzNC4zNywxLjc0MSw2MS4yOTIsMzAuMDM4LDYxLjI5Miw2NC40MjEgICBjMCwxOS41MjYtOC42OTgsMzcuODAxLTIzLjg2NCw1MC4xMzhjLTIuNTcxLDIuMDkxLTIuOTU5LDUuODctMC44NjgsOC40NGMyLjA5MSwyLjU3MSw1Ljg3LDIuOTU5LDguNDQsMC44NjggICBjMTcuOTgtMTQuNjI2LDI4LjI5Mi0zNi4yOTMsMjguMjkyLTU5LjQ0N0MyOTQuMTU2LDE0NS4yNjksMjY1LjA4LDExMi45MjYsMjI3LjAwMiwxMDguMjU2eiIgZmlsbD0iIzNiN2U5MiIvPgoJPHBhdGggZD0iTTE0MC45NjYsMTQxLjA3OHY3Ni41MTFjMCwzLjMxMywyLjY4Nyw2LDYsNnM2LTIuNjg3LDYtNnYtNzYuNTExYzAtMy4zMTMtMi42ODctNi02LTZTMTQwLjk2NiwxMzcuNzY1LDE0MC45NjYsMTQxLjA3OHoiIGZpbGw9IiMzYjdlOTIiLz4KCTxwYXRoIGQ9Ik0xODEuMjgzLDE1Mi4yMDRjMS41MzYsMCwzLjA3MS0wLjU4Niw0LjI0My0xLjc1N2MyLjM0My0yLjM0MywyLjM0My02LjE0MiwwLTguNDg1bC0zNC4zMTctMzQuMzE3ICAgYy0yLjM0My0yLjM0My02LjE0My0yLjM0My04LjQ4NSwwbC0zNC4zMTcsMzQuMzE3Yy0yLjM0MywyLjM0My0yLjM0Myw2LjE0MiwwLDguNDg1YzIuMzQzLDIuMzQzLDYuMTQzLDIuMzQzLDguNDg1LDAgICBsMzAuMDc0LTMwLjA3NGwzMC4wNzQsMzAuMDc0QzE3OC4yMTIsMTUxLjYxOCwxNzkuNzQ4LDE1Mi4yMDQsMTgxLjI4MywxNTIuMjA0eiIgZmlsbD0iIzNiN2U5MiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/>
                        {dragOver ? 'Drop' : 'Drag'} files here to upload or &nbsp;
                        <label>
                            <input onChange={this.handleInputChange} multiple accept={accept} type="file"/>
                            choose files
                        </label>
                    </div>

                </div>

                <FileList
                    onDeleteClick={this.removeItem}
                    onViewItem={this.handleOpenModal}
                    disableUpload={disableUpload}
                    files={files}>
                </FileList>

                <div className={classes.actionBar}>
                    {files.length ?
                        <button onClick={this.cleanFiles} disabled={disableUpload} type="button" role="danger">
                            Clean</button> : []}
                    <button disabled={files.length === 0 || disableUpload} type="button" role="primary"
                            onClick={this.startUpload}>Send
                        Files
                    </button>
                </div>
                <ModalWindow
                    openModal={this.handleOpenModal}
                    closeModal={this.handleCloseModal}
                    isOpen={this.state.showModal}
                    imageSrc={this.state.viewImageSrc}
                ></ModalWindow>
            </div>
        )
    }
}

S3Uploader.defaultProps = {
    title: 'Upload Files',
    contentDisposition: 'auto',
    accept: '*',
    server: '',
    signingUrlMethod: 'GET',
    s3path: '',
    autoUpload: true
};

S3Uploader.propTypes = {
    accept: PropTypes.string.isRequired,
    title: PropTypes.string,
    signingUrl: PropTypes.string,
    getSignedUrl: PropTypes.func,
    preprocess: PropTypes.func,
    onProgress: PropTypes.func,
    onFinish: PropTypes.func,
    onError: PropTypes.func,
    signingUrlMethod: PropTypes.string,
    signingUrlHeaders: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    signingUrlQueryParams: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    signingUrlWithCredentials: PropTypes.bool,
    uploadRequestHeaders: PropTypes.object,
    contentDisposition: PropTypes.string,
    server: PropTypes.string,
    scrubFilename: PropTypes.func,
    s3path: PropTypes.string,
    inputRef: PropTypes.func,
    autoUpload: PropTypes.bool
};

export default injectSheet(styles)(S3Uploader)


