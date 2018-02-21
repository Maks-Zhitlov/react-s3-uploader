import React, { Component } from 'react';
import ReactModal from 'react-modal';
import injectSheet from 'react-jss';
import styles from './styles';
import PropTypes from 'prop-types';

class ModalWindow extends Component {

    render() {
        const {classes, isOpen, closeModal, imageSrc} = this.props;

        return (
            <ReactModal isOpen={isOpen}
                        onRequestClose={closeModal}
                        className={classes.modal}
                        overlayClassName={classes.modalOverlay}
            >
                <div className={classes.modalItem}>
                    <img
                        src={imageSrc}
                        alt="/"/>
                    <button className={classes.modalClose} onClick={closeModal}>
                        <svg fill="#000000" height="17" viewBox="0 0 24 24" width="17"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
                </div>
            </ReactModal>
        )
    }
}

ModalWindow.propTypes = {
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    imageSrc: PropTypes.string
};

export default injectSheet(styles)(ModalWindow)