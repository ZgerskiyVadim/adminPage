import React from 'react';
import { shallow } from 'enzyme';
import ModalWindow from '../index';

describe('ModalWindow component', () => {
    it('renders without errors', () => {
        shallow(<ModalWindow />);
    });

    it('should render modal window', () => {
        const component = shallow(<ModalWindow />);
        expect(component).toMatchSnapshot();

        expect(component.find('.modal-window').length).toBe(1);
    });

    it('should show modal window', () => {
        const component = shallow(<ModalWindow showModal={true} />);

        expect(component).toMatchSnapshot();

        expect(component.find('.modal--hide').length).toBe(0);

        expect(component.find('.modal-content--hide').length).toBe(0);
    });

    it('should hide modal window', () => {
        const component = shallow(<ModalWindow showModal={false} />);

        expect(component).toMatchSnapshot();

        expect(component.find('.modal--hide').length).toBe(1);

        expect(component.find('.modal-content--hide').length).toBe(1);
    })

});
