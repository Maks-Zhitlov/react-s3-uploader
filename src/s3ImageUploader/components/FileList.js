import React, {Component} from 'react';
import injectSheet from 'react-jss';
import styles from '../styles';
import {humanFileSize} from '../helpers'
import {StatusIcon} from './StatusIcon'
import PropTypes from 'prop-types';
import {statuses} from '../helpers';

const iconSize = 17;
const iconColor = '#000';

class FileList extends Component {
    render() {
        const trClassNames = {
            [statuses.uploading]: 'uploading-in-process',
            [statuses.finalizing]: 'uploading-finalize',
            [statuses.complete]: 'uploading-done',
            [statuses.fail]: 'uploading-fail'
        };

        const {classes, disableUpload, onDeleteClick, onViewItem, files} = this.props;

        const arr = files.map((el) => {
            const trClassName = trClassNames[el.status];
            return (
                <tr key={el.name} className={trClassName || ''}>
                    <td>{el.name}</td>
                    <td>{humanFileSize(el.size)}</td>
                    <td>{el.lastModifiedDate.toLocaleDateString()}</td>
                    <td className={'statusColumn'}>
                        <StatusIcon status={el.status}></StatusIcon>
                        {el.status || 'Not uploaded'}
                    </td>
                    <td>
                        <button type="button" title="View" onClick={onViewItem(el)}>
                            <svg fill={iconColor} height={iconSize} viewBox="0 0 24 24" width={iconSize}
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                        </button>
                        <button disabled={disableUpload} type="button" title="Remove" onClick={onDeleteClick(el)}>
                            <svg fill={iconColor} height={iconSize} viewBox="0 0 24 24" width={iconSize}
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
    }
}

FileList.propTypes = {
    onDeleteClick: PropTypes.func.isRequired,
    onViewItem: PropTypes.func.isRequired,
    disableUpload: PropTypes.bool,
    files: PropTypes.array.isRequired
};

export default injectSheet(styles)(FileList)