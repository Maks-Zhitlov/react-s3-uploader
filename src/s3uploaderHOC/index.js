import React, {Component} from 'react';
import ReactS3Uploader from 'react-s3-uploader'
import injectSheet from 'react-jss';
import styles from './styles';
import S3Upload from './s3upload.js';
import PropTypes from 'prop-types';

console.log(PropTypes);

export function getDataTransferItems(event) {
    let dataTransferItemsList = [];
    console.log(dataTransferItemsList);
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
    // console.log(dataTransferItemsList);
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

    state = {
        files: []
    };

    handleInputChange = (e) => {
        this.mergeFilesList(getDataTransferItems(e));
    };

    onProgress = (a) => {
        console.log('-------', a);
        if (this.props.onProgress) {
            this.props.onProgress();
        }
    };

    startUpload = () => {
        const {files} = this.state;
        this.myUploader = new S3Upload({
            ...this.props,
            files,
            onProgress: this.onProgress
        });
    };

    removeItem = (item = {}) => (e) => {
        e.preventDefault();
        this.setState({files: this.state.files.filter(el => el.name !== item.name)});
    };

    cleanFiles = () => {
        this.setState({files: []})
    };

    renderFileList = (files = [], classes) => {
        const arr = files.map(el => {
            return (
                <tr key={el.name}>
                    <td>{el.name}</td>
                    <td>{humanFileSize(el.size)}</td>
                    <td>{el.lastModifiedDate.toLocaleDateString()}</td>
                    <td>
                        <button type="button" title="View">
                            <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                        </button>
                        <button type="button" title="Remove" onClick={this.removeItem(el)}>
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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>{arr}</tbody>
                    </table>
                </div>
                : []
        )
    };

    onDragEnter = (e) => {
        e.preventDefault();
        const allowedFiles = this.props.accept === '*' ? getDataTransferItems(e) : getDataTransferItems(e).filter(el => this.props.accept.includes(el.type.split('/')[0]));
        this.mergeFilesList(allowedFiles);
    };

    mergeFilesList = (nextFiles = []) => {
        this.setState({
            files: [
                ...this.state.files.filter(el => nextFiles.map(next => next.name).indexOf(el.name) === -1),
                ...nextFiles
            ]
        });
    };

    render() {
        const {files} = this.state;
        const {classes, title, accept, ...rest} = this.props;
        const filesList = this.renderFileList(files, classes);

        return (
            <div className={classes.box}>
                <header>{title}</header>
                <div className={classes.dropZoneArea}
                     onDragStart={(e) => {
                         e.preventDefault();
                     }}
                     onDragEnter={(e) => {
                         e.preventDefault();
                     }}
                     onDragOver={(e) => {
                         e.preventDefault();
                     }}
                     onDragLeave={(e) => {
                         e.preventDefault();
                     }}
                     onDrop={this.onDragEnter}>
                    <div>
                        <img
                            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5NC4xNTYgMjk0LjE1NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjk0LjE1NiAyOTQuMTU2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPHBhdGggZD0iTTIyNy4wMDIsMTA4LjI1NmMtMi43NTUtNDEuNzUxLTM3LjYtNzQuODc4LTgwLjAzNi03NC44NzhjLTQyLjQ0NywwLTc3LjI5OCwzMy4xNDEtODAuMDM4LDc0LjkwNyAgIEMyOC45NzgsMTEzLjA1OSwwLDE0NS4zOSwwLDE4NC4xODRjMCw0Mi4yMzQsMzQuMzYsNzYuNTk1LDc2LjU5NSw3Ni41OTVoMTE2LjQ4M2MzLjMxMywwLDYtMi42ODcsNi02cy0yLjY4Ny02LTYtNkg3Ni41OTUgICBDNDAuOTc3LDI0OC43NzgsMTIsMjE5LjgwMSwxMiwxODQuMTg0YzAtMzQuMjc1LDI2LjgzMy02Mi41NjgsNjEuMDg3LTY0LjQxMWMzLjE4NC0wLjE3MSw1LjY3OC0yLjgwMyw1LjY3OC01Ljk5MSAgIGMwLTAuMTE5LTAuMDAzLTAuMjM2LTAuMDEtMC4zNTVjMC4wOS0zNy41MzYsMzAuNjU0LTY4LjA0OSw2OC4yMTEtNjguMDQ5YzM3LjU2MywwLDY4LjEzMiwzMC41MTgsNjguMjExLDY4LjA2MyAgIGMtMC4wMDUsMC4xMTYtMC4wMDksMC4yMzgtMC4wMDksMC4zMjljMCwzLjE5NiwyLjUwNSw1LjgzMSw1LjY5Niw1Ljk5MmMzNC4zNywxLjc0MSw2MS4yOTIsMzAuMDM4LDYxLjI5Miw2NC40MjEgICBjMCwxOS41MjYtOC42OTgsMzcuODAxLTIzLjg2NCw1MC4xMzhjLTIuNTcxLDIuMDkxLTIuOTU5LDUuODctMC44NjgsOC40NGMyLjA5MSwyLjU3MSw1Ljg3LDIuOTU5LDguNDQsMC44NjggICBjMTcuOTgtMTQuNjI2LDI4LjI5Mi0zNi4yOTMsMjguMjkyLTU5LjQ0N0MyOTQuMTU2LDE0NS4yNjksMjY1LjA4LDExMi45MjYsMjI3LjAwMiwxMDguMjU2eiIgZmlsbD0iIzNiN2U5MiIvPgoJPHBhdGggZD0iTTE0MC45NjYsMTQxLjA3OHY3Ni41MTFjMCwzLjMxMywyLjY4Nyw2LDYsNnM2LTIuNjg3LDYtNnYtNzYuNTExYzAtMy4zMTMtMi42ODctNi02LTZTMTQwLjk2NiwxMzcuNzY1LDE0MC45NjYsMTQxLjA3OHoiIGZpbGw9IiMzYjdlOTIiLz4KCTxwYXRoIGQ9Ik0xODEuMjgzLDE1Mi4yMDRjMS41MzYsMCwzLjA3MS0wLjU4Niw0LjI0My0xLjc1N2MyLjM0My0yLjM0MywyLjM0My02LjE0MiwwLTguNDg1bC0zNC4zMTctMzQuMzE3ICAgYy0yLjM0My0yLjM0My02LjE0My0yLjM0My04LjQ4NSwwbC0zNC4zMTcsMzQuMzE3Yy0yLjM0MywyLjM0My0yLjM0Myw2LjE0MiwwLDguNDg1YzIuMzQzLDIuMzQzLDYuMTQzLDIuMzQzLDguNDg1LDAgICBsMzAuMDc0LTMwLjA3NGwzMC4wNzQsMzAuMDc0QzE3OC4yMTIsMTUxLjYxOCwxNzkuNzQ4LDE1Mi4yMDQsMTgxLjI4MywxNTIuMjA0eiIgZmlsbD0iIzNiN2U5MiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="/>
                        Drop files here to upload or &nbsp;
                        <label>
                            <input onChange={this.handleInputChange} multiple accept={accept} type="file"/>
                            choose files
                        </label>
                    </div>

                </div>

                {filesList}

                <div className={classes.actionBar}>
                    {files.length ? <button onClick={this.cleanFiles} type="button" role="danger">Clean</button> : []}
                    <button disabled={files.length === 0} type="button" role="primary" onClick={this.startUpload}>Send
                        Files
                    </button>
                </div>
            </div>
        )
    }
}

S3Uploader.defaultProps = {
    title: "Upload Files",
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


