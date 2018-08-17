import React from 'react';
import { shallow, mount } from 'enzyme';
import {User} from '../index';
import * as groupsActions from '../../../actions/action_creators/groups';
import * as usersActions from '../../../actions/action_creators/users';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SearchInput from "../../../components/SearchInput";

const actions = {
    ...groupsActions,
    ...usersActions
};

const match = {
    params: {
        id: 1
    }
};

const user = {
    data: {
        username: 'username',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        _id: 1
    }
};

const group = {
    name: 'name',
    title: 'title',
    users: [],
    _id: 1
};

const groups = [group, {...group, _id: 2}];

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};

describe('User component', () => {

    it('render User component', () => {

        const component = shallow(<User
            match={match}
            user={user}
            actions={actions}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(false);

        expect(component.find('.user').length).toBe(1);

        expect(component.find('.user__info').length).toBe(1);

        const usersTable = component.find('.user__groups-table');
        expect(['user--hide'].every(c => usersTable.hasClass(c))).toBe(true);

    });

    it('show table if have users in group', () => {

        const component = shallow(<User
            match={match}
            user={user}
            groups={groups}
            actions={actions}
        />);

        const usersTable = component.find('.user__groups-table');
        expect(['user--hide'].every(c => usersTable.hasClass(c))).toBe(false);

    });


    it('show loading spinner', () => {

        const component = shallow(<User
            match={match}
            user={user}
            actions={actions}
            loading={true}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(true);

    });

    it('should call fetch when mounted', () => {
        const mockUserRequest = jest.fn();
        const mockJoiningGroup = jest.fn();

        const component = mount(<User
            match={match}
            user={user}
            actions={{...actions, getUserRequest: mockUserRequest, startJoiningGroup: mockJoiningGroup}}
        />);

        expect(component).toBeDefined();
        expect(mockUserRequest).toHaveBeenCalledTimes(1);
        expect(mockJoiningGroup).toHaveBeenCalledTimes(1);
    });


    it('should call "searchGroups" after onChange form in SearchInput component', () => {
        const mockUserRequest = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={{...actions, getUserRequest: mockUserRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'searchGroups');
        component.instance().forceUpdate();

        const searchInputComponent = shallow(<SearchInput
            search={component.instance().searchGroups}
        />);

        searchInputComponent.find('.form-control').simulate('change', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockUserRequest).toHaveBeenCalledTimes(2);
    });



    it('should call "goToGroup" after click on user', () => {

        const component = shallow(<User
            match={match}
            user={user}
            groups={groups}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'goToGroup');
        component.instance().forceUpdate();

        component.find('.user__groups-list').at(0).simulate('click');

        expect(spy).toHaveBeenCalledTimes(1);
    });


    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'showForms');
        component.instance().forceUpdate();

        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().id).toBe(user.data._id);
        expect(component.state().showForm).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });


    it('should call "updateUser" after click button "save"', () => {
        const mockUpdateRequest = jest.fn();
        event.stopPropagation = jest.fn();
        event.preventDefault = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={{...actions, updateUserRequest: mockUpdateRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'updateUser');
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

    it('should call "startJoiningGroup" after click button "join group"', () => {
        const mockStartJoiningGroup = jest.fn();
        event.stopPropagation = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={{...actions, startJoiningGroup: mockStartJoiningGroup}}
        />);

        const spy = jest.spyOn(component.instance(), 'startJoiningGroup');
        component.instance().forceUpdate();

        component.find('.btn-outline-info').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockStartJoiningGroup).toHaveBeenCalledTimes(2);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "joinGroup" after click button for group "join group"', () => {
        const mockJoinGroup = jest.fn();
        event.stopPropagation = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={{...actions, joinGroup: mockJoinGroup}}
            groups={groups}
        />);

        const spy = jest.spyOn(component.instance(), 'joinGroup');
        component.instance().forceUpdate();

        component.find('.user__join-group').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockJoinGroup).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "leaveGroup" after click button for group "leave group"', () => {
        const mockleaveGroupRequest = jest.fn();
        event.stopPropagation = jest.fn();
        const component = shallow(<User
            match={match}
            user={user}
            actions={{...actions, leaveGroupRequest: mockleaveGroupRequest}}
            groups={groups}
        />);

        const spy = jest.spyOn(component.instance(), 'leaveGroup');
        component.instance().forceUpdate();

        component.find('.user__leave-group').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockleaveGroupRequest).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "handleChange" after change form', () => {

        const component = shallow(<User
            match={match}
            user={user}
            actions={actions}
        />);


        const spy = jest.spyOn(component.instance(), 'handleChange');
        component.instance().forceUpdate();

        component.find('[name="username"]').at(0).simulate('change', event);
        component.find('[name="firstName"]').at(0).simulate('change', event);
        component.find('[name="lastName"]').at(0).simulate('change', event);
        component.find('[name="email"]').at(0).simulate('change', event);
        component.find('[name="password"]').at(0).simulate('change', event);

        expect(spy).toHaveBeenCalledTimes(5);
    });

});
