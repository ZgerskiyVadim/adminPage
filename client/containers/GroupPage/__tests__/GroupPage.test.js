import React from 'react';
import { shallow, mount } from 'enzyme';
import {Group} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from '../../../components/ModalWindow';
import SearchInput from "../../../components/SearchInput";

const match = {
    params: {
        id: 1
    }
};

const group = {
    data: {
        name: 'name',
        title: 'title',
        _id: 1
    }
};

const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    _id: 1
};

const users = [user, {...user, _id: 2}];

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};

describe('Group component', () => {

    it('render Group component', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
        />);

        const loadingSpinner = component.find(LoadingSpinner);
        const modalWindow = component.find(ModalWindow);

        expect(loadingSpinner.props().loading).toBe(false);
        expect(modalWindow.props().showModal).toBe(false);

        expect(component.find('.group').length).toBe(1);

        expect(component.find('.group__info').length).toBe(1);

        const usersTable = component.find('.group__users-table');
        expect(['group--hide'].every(c => usersTable.hasClass(c))).toBe(true);

    });

    it('show table if have users in group', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            users={users}
            actions={actions}
        />);

        const usersTable = component.find('.group__users-table');
        expect(['group--hide'].every(c => usersTable.hasClass(c))).toBe(false);

    });

    it('show loading spinner', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
            loading={true}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(true);

    });

    it('should call fetch when mounted', () => {
        const mockGroupRequest = jest.fn();

        const component = mount(<Group
            match={match}
            group={group}
            actions={{...actions, getGroupRequest: mockGroupRequest}}
        />);

        expect(component).toBeDefined();
        expect(mockGroupRequest).toHaveBeenCalledTimes(1);
    });

    it('should call "removeUser" after success in ModalWindow component', () => {
        const closeModal = jest.fn();
        const mockRemoveRequest = jest.fn();

        const component = shallow(<Group
            match={match}
            group={group}
            actions={{...actions, removeUserRequest: mockRemoveRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'removeUser');
        component.instance().forceUpdate();

        const modalWindowComponent =  shallow(<ModalWindow
            remove={component.instance().removeUser}
            closeModal={closeModal}
        />);
        modalWindowComponent.find('.btn-success').at(0).simulate('click');

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockRemoveRequest).toHaveBeenCalledTimes(1);
    });

    it('should call "showModal" after click button "remove user"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
            users={users}
        />);

        const spy = jest.spyOn(component.instance(), 'showModal');
        component.instance().forceUpdate();

        component.find('.group__remove-user').at(0).simulate('click', event, group.data._id);
        expect(component.state().showModal).toBe(true);
        expect(component.state().userID).toBe(group.data._id);

        const modalWindow = component.find(ModalWindow);

        expect(modalWindow.props().showModal).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "closeModal" after closeModal in ModalWindow component', () => {
        const remove = jest.fn();

        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
            users={users}
        />);

        const spy = jest.spyOn(component.instance(), 'closeModal');
        component.instance().forceUpdate();

        const modalWindowComponent =  shallow(<ModalWindow
            remove={remove}
            closeModal={component.instance().closeModal}
        />);

        component.find('.group__remove-user').at(0).simulate('click', event);
        expect(component.state().showModal).toBe(true);

        modalWindowComponent.find('.close').at(0).props().onClick();
        expect(component.state().showModal).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "searchUsers" after onChange form in SearchInput component', () => {
        const mockGroupRequest = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={{...actions, getGroupRequest: mockGroupRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'searchUsers');
        component.instance().forceUpdate();

        const searchInputComponent = shallow(<SearchInput
            search={component.instance().searchUsers}
        />);

        searchInputComponent.find('.form-control').simulate('change', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockGroupRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "goToUser" after click on user', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            users={users}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'goToUser');
        component.instance().forceUpdate();

        component.find('.group__users-list').at(0).simulate('click');

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'showForms');
        component.instance().forceUpdate();

        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().id).toBe(group.data._id);
        expect(component.state().showForm).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "updateGroup" after click button "save"', () => {
        const mockUpdateRequest = jest.fn();
        event.stopPropagation = jest.fn();
        event.preventDefault = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={{...actions, updateGroupRequest: mockUpdateRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'updateGroup');
        component.instance().forceUpdate();

        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().showForm).toBe(true);
        component.find('.btn-outline-primary').at(1).simulate('click', event);
        expect(component.state().showForm).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockUpdateRequest).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });


    it('should call "handleChange" after change form', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'handleChange');
        component.instance().forceUpdate();

        component.find('[name="name"]').at(0).simulate('change', event);
        component.find('[name="title"]').at(0).simulate('change', event);

        expect(spy).toHaveBeenCalledTimes(2);
    });

});
