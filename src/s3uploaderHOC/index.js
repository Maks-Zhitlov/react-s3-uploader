import React, { Component } from 'react';
import ReactS3Uploader from 'react-s3-uploader'
import injectSheet from 'react-jss';
import styles from './styles';
import S3Upload from './s3upload.js';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

export function getDataTransferItems(event) {
    let dataTransferItemsList = [];
    if (event.dataTransfer) {
        const dt = event.dataTransfer
        if (dt.files && dt.files.length) {
            dataTransferItemsList = dt.files
        } else if (dt.items && dt.items.length) {
            // During the drag even the dataTransfer.files is null
            // but Chrome implements some drag store, which is accesible via dataTransfer.items
            dataTransferItemsList = dt.items
        }
    } else if (event.target && event.target.files) {
        dataTransferItemsList = event.target.files
    }
    return Array.from(dataTransferItemsList);
}

function humanFileSize(num) {
    const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (!Number.isFinite(num)) {
        throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
    }

    const neg = num < 0;

    if (neg) {
        num = -num;
    }

    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }

    const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1);
    const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
    const unit = UNITS[exponent];

    return (neg ? '-' : '') + numStr + ' ' + unit;
}

class S3Uploader extends Component {
    myUploader;
    draggableEl;

    state = {
        files: [],
        disableUpload: false,
        dragOver: false,
        showModal: false
    };

    handleOpenModal = this.handleOpenModal.bind(this);
    handleCloseModal = this.handleCloseModal.bind(this);

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

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

    filesStatus(status) {
        switch (status) {
            case 'Waiting': {
                return (
                    <span className={'waitingIcon'}>
                        <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                             xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    </span>
                );
            }
            case 'Finalizing': {
                return (
                    <span className={'finalizingIcon'}>
                        <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                             xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    </span>
                )
            }
            case 'Uploading':
                return (
                    <span className={'loadIcon'}>
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </span>
                );
            case 'Upload completed':
                return (
                    <span className={'succesIcon'}>
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                        </span>
                );
                break;
            case 'Failed':
                return (
                    <span className={'failedIcon'}>
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                        </span>
                );
                break;
        }
    }

    renderFileList = (files = [], classes) => {
        const trClassNames = {
            'Uploading': 'uploading-in-process',
            'Finalizing': 'uploading-finalize',
            // 'Waiting': 'uploading-in-process',
            'Upload completed': 'uploading-done',
            'Failed': 'uploading-fail',
        };

        const arr = files.map(el => {
            const trClassName = trClassNames[el.status];
            const {disableUpload} = this.state;
            return (
                <tr key={el.name} className={trClassName || ''}>
                    <td>{el.name}</td>
                    <td>{humanFileSize(el.size)}</td>
                    <td>{el.lastModifiedDate.toLocaleDateString()}</td>
                    <td className={'statusColumn'}>
                        {this.filesStatus(el.status)}
                        {el.status || 'Not uploaded'}
                    </td>
                    <td>
                        <button type="button" title="View" onClick={this.handleOpenModal}>
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                        </button>
                        <button disabled={disableUpload} type="button" title="Remove" onClick={this.removeItem(el)}>
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            arr.length ?
                <div className={classes.filesListWrapper}>
                    <table className={classes.filesList}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Modified Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>{arr}</tbody>
                    </table>
                </div>
                : []
        )
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

    onDragEnter = (e) => {
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
        const {files, disableUpload, dragOver} = this.state;
        const {classes, title, accept, ...rest} = this.props;
        const filesList = this.renderFileList(files, classes);

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

                {filesList}

                <div className={classes.actionBar}>
                    {files.length ?
                        <button onClick={this.cleanFiles} disabled={disableUpload} type="button" role="danger">
                            Clean</button> : []}
                    <button disabled={files.length === 0 || disableUpload} type="button" role="primary"
                            onClick={this.startUpload}>Send
                        Files
                    </button>
                </div>
                <ReactModal isOpen={this.state.showModal}
                            onRequestClose={this.handleCloseModal}
                            className={classes.modal}
                            overlayClassName={classes.modalOverlay}
                >
                    <button className={classes.modalClose} onClick={this.handleCloseModal}>
                        <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
                    <div className={classes.modalItem}>
                        <img
                            src="https://getbg.net/upload/full/444995_adventure-time_cn_priklyuchenie-vremya_luch_1920x1080_(www.GetBg.net).jpg"
                            alt="/"/>
                    </div>
                </ReactModal>
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


