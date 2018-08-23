import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../index';
import {usernameEvent, passwordEvent} from "./data";
import authenticationService from '../../../services/authenticationService';

describe('LoginPage component', () => {

    it('render LoginPage component', () => {
        const component = shallow(<LoginPage />);

        expect(component.find('.login').length).toBe(1);

        expect(component.find('.login--row').length).toBe(1);

        expect(component.find('.login__send').length).toBe(1);

        expect(component.find('.form-control').length).toBe(2);

        expect(component.find('.form-control').at(0).prop('name')).toBe('username');
        expect(component.find('.form-control').at(1).prop('name')).toBe('password');

    });

    it('should call "handleChange" and set state after change username form', () => {
        const component = shallow(<LoginPage />);

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        expect(component.state().username).toBe(usernameEvent.target.value);

    });

    it('should call "handleChange" and set state after change password form', () => {
        const component = shallow(<LoginPage />);

        component.find('[name="password"]').at(0).simulate('change', passwordEvent);
        expect(component.state().password).toBe(passwordEvent.target.value);
    });

    it('call "login" after click button "send" in LoginPage component', () => {
        authenticationService.login = jest.fn();
        const component = shallow(<LoginPage/>);
        const expectedLoginUser = {
            username: usernameEvent.target.value,
            password: passwordEvent.target.value
        };
        const event = {
            preventDefault: jest.fn()
        };

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        component.find('[name="password"]').at(0).simulate('change', passwordEvent);

        component.find('.login__send').simulate('click', event);

        const [call = []] = authenticationService.login.mock.calls;
        expect(call).toEqual([expectedLoginUser]);
    });

});
