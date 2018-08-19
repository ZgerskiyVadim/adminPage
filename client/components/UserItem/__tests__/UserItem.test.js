import React from 'react';
import { shallow } from 'enzyme';
import {User} from '../user';
import {usernameEvent, firstNameEvent, lastNameEvent, emailEvent, passwordEvent} from './data';
import history from '../../../services/history';

const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    _id: 1
};

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn()
};


describe('User component', () => {

    it('render User component', () => {

        const component = shallow(<User user={user}/>);

        expect(component.find('.users--cursor').length).toBe(1);

        expect(component.find('.users__buttons').length).toBe(1);

        expect(component.find('button').length).toBe(3);

    });

    it('should call "goToUser" after click component', () => {
        const component = shallow(<User user={user}/>);
        const userItem = component.find('.users--cursor').at(0);

        expect(history.location.pathname).toBe(`/`);
        userItem.simulate('click', event);
        expect(history.location.pathname).toBe(`/users/${user._id}`);

    });

    it('should call "handleChange" and set state after change username form', () => {
        const component = shallow(<User user={user}/>);

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        expect(component.state().username).toBe(usernameEvent.target.value);

    });

    it('should call "handleChange" and set state after change firstName form', () => {
        const component = shallow(<User user={user}/>);

        component.find('[name="firstName"]').at(0).simulate('change', firstNameEvent);
        expect(component.state().firstName).toBe(firstNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change lastName form', () => {
        const component = shallow(<User user={user}/>);

        component.find('[name="lastName"]').at(0).simulate('change', lastNameEvent);
        expect(component.state().lastName).toBe(lastNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change email form', () => {
        const component = shallow(<User user={user}/>);

        component.find('[name="email"]').at(0).simulate('change', emailEvent);
        expect(component.state().email).toBe(emailEvent.target.value);
    });

    it('should call "handleChange" and set state after change password form', () => {
        const component = shallow(<User user={user}/>);

        component.find('[name="password"]').at(0).simulate('change', passwordEvent);
        expect(component.state().password).toBe(passwordEvent.target.value);
    });

    it('should call "handleClick" after click on form', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<User user={user}/>);

        component.find('[name="username"]').at(0).simulate('click', event);
        component.find('[name="firstName"]').at(0).simulate('click', event);
        component.find('[name="lastName"]').at(0).simulate('click', event);
        component.find('[name="email"]').at(0).simulate('click', event);
        component.find('[name="password"]').at(0).simulate('click', event);

        expect(event.stopPropagation).toHaveBeenCalledTimes(5);
    });

    it('should call "showForms" after click button "update"', () => {
        const component = shallow(<User user={user}/>);

        expect(component.state().showForm).toBe(false);
        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().showForm).toBe(true);
    });

    it('should call "update" after click "save" button with correct parameters', () => {
        const expectedUpdatedUser = {
            id: user._id,
            username: usernameEvent.target.value,
            firstName: firstNameEvent.target.value,
            lastName: lastNameEvent.target.value,
            email: emailEvent.target.value,
            password: passwordEvent.target.value
        };
        const update = jest.fn();
        const component = shallow(<User
            user={user}
            update={update}
        />);
        const showFormsButton = component.find('.btn-outline-primary').at(0);
        const updateButton = component.find('.btn-outline-primary').at(1);

        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        component.find('[name="firstName"]').at(0).simulate('change', firstNameEvent);
        component.find('[name="lastName"]').at(0).simulate('change', lastNameEvent);
        component.find('[name="email"]').at(0).simulate('change', emailEvent);
        component.find('[name="password"]').at(0).simulate('change', passwordEvent);

        updateButton.simulate('click', event);
        expect(component.state().showForm).toBe(false);

        const [call = []] = update.mock.calls;
        expect(call).toEqual([expectedUpdatedUser]);
    });

    it('should call "remove" after click button "remove"', () => {
        const expectedRemoveUserID = user._id;
        const expectedRemoveUserEvent = event;
        const showModal = jest.fn();
        const component = shallow(<User
            user={user}
            showModal={showModal}
        />);
        const removeUserButton = component.find('.btn-outline-danger').at(0);

        removeUserButton.simulate('click', event);

        const [call = []] = showModal.mock.calls;
        expect(call).toEqual([expectedRemoveUserID, expectedRemoveUserEvent]);
    });

    it('should hide "remove" button if user joining groups', () => {
        const component = shallow(<User
            user={user}
            isJoining={true}
        />);
        const removeHiddenButton = component.find('.users--hide-remove');

        expect(removeHiddenButton.length).toBe(1);
    })

});
