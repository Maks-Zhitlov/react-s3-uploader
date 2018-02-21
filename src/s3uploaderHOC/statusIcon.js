import React, { Component } from 'react';

export class StatusIcon extends Component {

    render() {
        switch (this.props.status) {
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
            default:
                return <span></span>
        }
    }

}