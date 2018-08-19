import React from 'react';
import { shallow } from 'enzyme';
import ModalWindow from '../index';

describe('ModalWindow component', () => {

    it('render ModalWindow component', () => {
        shallow(<ModalWindow />);
    });

    it('should render modal window', () => {
        const component = shallow(<ModalWindow />);

        expect(component.find('.modal-window').length).toBe(1);
    });

    it('should show modal window', () => {
        const component = shallow(<ModalWindow
            showModal={true}
        />);

        expect(component.find('.modal--hide').length).toBe(0);

        expect(component.find('.modal-content--hide').length).toBe(0);
    });

    it('should hide modal window', () => {
        const component = shallow(<ModalWindow
            showModal={false}
        />);

        expect(component.find('.modal--hide').length).toBe(1);

        expect(component.find('.modal-content--hide').length).toBe(1);
    });

    it('should call event "closeModal" if click exit button', () => {
        const closeModal = jest.fn();
        const component = shallow(<ModalWindow
            closeModal={closeModal}
        />);

        component.find('.close').at(0).props().onClick();

        expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should remove item after click on "removeItem" tab', () => {
        const remove = jest.fn();
        const closeModal = jest.fn();
        const component = shallow(<ModalWindow
            remove={remove}
            closeModal={closeModal}
        />);

       component.find('.btn-success').at(0).props().onClick();

        expect(remove).toHaveBeenCalledTimes(1);
        expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('should call "handleClickOutside" after click outside the modal window', () => {
        const preventDefault = jest.fn();
        const closeModal = jest.fn();
        const component = shallow(<ModalWindow
            showModal={true}
            closeModal={closeModal}
        />);

        const coverModal = component.find('.modal-cover');
        const event = {
            target: coverModal,
            preventDefault
        };

        const spyHandleClickOutside = jest.spyOn(component.instance(), 'handleClickOutside');

        component.instance().handleClickOutside(event);
        expect(spyHandleClickOutside).toHaveBeenCalledTimes(1);

    })
});
