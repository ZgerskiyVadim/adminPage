import React, { PureComponent } from 'react';
import {createPortal} from "react-dom";
import './index.scss';
import classNames from 'classnames';

class ModalWindow extends PureComponent {
    constructor(props) {
        super(props);

        this.successModal = this.successModal.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        this.modalRoot.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        this.modalRoot.removeEventListener('click', this.handleClickOutside);
    }

    successModal() {
        this.props.remove();
        this.props.closeModal();
    };

    handleClickOutside(event) {
        event.preventDefault();
        if (!this.modalContent.contains(event.target)) {
            this.props.closeModal();
        }
    };

    render() {
        const {isShow, closeModal} = this.props;

        return createPortal(
            <div ref={node => this.modalRoot = node} className={classNames('modal-root', {'modal--hide': !isShow})}>
                <div className='modal-window'>
                    <div className="modal-dialog" role="document">
                        <div ref={node => this.modalContent = node} className={classNames('modal-content', {'modal-content--hide': !isShow})}>
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.successModal} type="button" className="btn btn-success">Yes</button>
                                <button onClick={closeModal} type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>,
            document.getElementById('modal-window')
        )
    }
}

export default ModalWindow;