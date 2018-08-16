import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../index';

describe('LoginPage component', () => {

    it('renders without errors', () => {
        const component = shallow(<LoginPage />);

        expect(component.find('.login').length).toBe(1);

        expect(component.find('.login--row').length).toBe(1);

        expect(component.find('.login__send').length).toBe(1);

        expect(component.find('.form-control').length).toBe(2);

        expect(component.find('.form-control').at(0).prop('name')).toBe('username');
        expect(component.find('.form-control').at(1).prop('name')).toBe('password');

    });

});
