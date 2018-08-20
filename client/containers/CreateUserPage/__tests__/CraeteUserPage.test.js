import React from 'react';
import { shallow } from 'enzyme';
import {CreateUserPage} from '../index';
import * as actions from '../../../actions/action_creators/users';
import {
    emailEvent,
    firstNameEvent,
    lastNameEvent,
    passwordEvent,
    usernameEvent
} from "./data";

const event = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};


describe('CreateGroupPage component', () => {
    it('render CreateGroupPage component', () => {
        const component = shallow(<CreateUserPage />);

        expect(component.find('.create-user').length).toBe(1);

        expect(component.find('.create-user--row').length).toBe(1);
    });

    it('should call "handleChange" and set state after change username form', () => {
        const component = shallow(<CreateUserPage />);

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        expect(component.state().username).toBe(usernameEvent.target.value);

    });

    it('should call "handleChange" and set state after change firstName form', () => {
        const component = shallow(<CreateUserPage />);

        component.find('[name="firstName"]').at(0).simulate('change', firstNameEvent);
        expect(component.state().firstName).toBe(firstNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change lastName form', () => {
        const component = shallow(<CreateUserPage />);

        component.find('[name="lastName"]').at(0).simulate('change', lastNameEvent);
        expect(component.state().lastName).toBe(lastNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change email form', () => {
        const component = shallow(<CreateUserPage />);

        component.find('[name="email"]').at(0).simulate('change', emailEvent);
        expect(component.state().email).toBe(emailEvent.target.value);
    });

    it('should call "handleChange" and set state after change password form', () => {
        const component = shallow(<CreateUserPage />);

        component.find('[name="password"]').at(0).simulate('change', passwordEvent);
        expect(component.state().password).toBe(passwordEvent.target.value);
    });

    it('should call "createGroup" after click "send" button', () => {
        const mockCreateUser = jest.fn();

        const component = shallow(<CreateUserPage
            actions={{...actions, createUserRequest: mockCreateUser}}
        />);
        const expectedCraeteUser = {
            username: usernameEvent.target.value,
            firstName: firstNameEvent.target.value,
            lastName: lastNameEvent.target.value,
            email: emailEvent.target.value,
            password: passwordEvent.target.value,
        };

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        component.find('[name="firstName"]').at(0).simulate('change', firstNameEvent);
        component.find('[name="lastName"]').at(0).simulate('change', lastNameEvent);
        component.find('[name="email"]').at(0).simulate('change', emailEvent);
        component.find('[name="password"]').at(0).simulate('change', passwordEvent);

        component.find('.create-user__send').simulate('click', event);

        const [call = []] = mockCreateUser.mock.calls;
        expect(call).toEqual([expectedCraeteUser]);
    });

});
