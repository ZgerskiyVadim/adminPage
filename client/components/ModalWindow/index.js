import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import classNames from 'classnames';

class ModalWindow extends PureComponent {
    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    removeItem() {
        const {remove, closeModal} = this.props;
        remove();
        closeModal();
    };

    handleClickOutside(event) {
        event.preventDefault();
        if (this.modalContent && !this.modalContent.contains(event.target) && this.modalRoot.contains(event.target)) {
            this.props.closeModal();
        }
    };

    render() {
        const {showModal, closeModal} = this.props;

        return (
            <div ref={node => this.modalRoot = node} className={classNames('modal-cover', {'modal--hide': !showModal})}>
                <div className='modal-window'>
                    <div className="modal-dialog" role="document">
                        <div ref={node => this.modalContent = node} className={classNames('modal-content', {'modal-content--hide': !showModal})}>
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.removeItem} type="button" className="btn btn-success">Yes</button>
                                <button onClick={closeModal} type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ModalWindow.defaultProps = {
    showModal: false
};

ModalWindow.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    modalRoot: PropTypes.node
};

export default ModalWindow;