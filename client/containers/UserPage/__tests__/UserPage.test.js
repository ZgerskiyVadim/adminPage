import React from 'react';
import { shallow, mount } from 'enzyme';
import {UserPage} from '../index';
import * as groupsActions from '../../../actions/action_creators/groups';
import * as usersActions from '../../../actions/action_creators/users';
import LoadingSpinner from '../../../components/LoadingSpinner';
import SearchInput from "../../../components/SearchInput";
import history from "../../../services/history";
import {
    emailEvent,
    firstNameEvent,
    lastNameEvent,
    passwordEvent,
    usernameEvent
} from "./data";

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

        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={actions}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(false);

        expect(component.find('.user').length).toBe(1);

        expect(component.find('.user__info').length).toBe(1);
    });

    it('show table if user have groups', () => {

        const component = shallow(<UserPage
            match={match}
            user={user}
            groups={groups}
            actions={actions}
        />);

        const usersTable = component.find('.user__groups-table');
        expect(['user--hide'].every(hide => usersTable.hasClass(hide))).toBe(false);
    });


    it('show loading spinner', () => {

        const component = shallow(<UserPage
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

        const component = mount(<UserPage
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
        const mockEvent = {target: {value: 'search'}};
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={{...actions, getUserRequest: mockUserRequest}}
        />);

        component.find(SearchInput).props().search(mockEvent);
        expect(component.state().options.searchBy).toBe(mockEvent.target.value);

        expect(mockUserRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "goToGroup" after click on user', () => {

        const component = shallow(<UserPage
            match={match}
            user={user}
            groups={groups}
            actions={actions}
        />);
        const groupItem = component.find('.user__groups-list').at(0);
        expect(history.location.pathname).toBe(`/`);
        groupItem.simulate('click');
        expect(history.location.pathname).toBe(`/groups/${group._id}`);
    });


    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={actions}
        />);
        const showFormsButton = component.find('.btn-outline-primary').at(0);

        expect(component.state().showForm).toBe(false);
        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);
    });


    it('should call "updateUser" after click button "save"', () => {
        const mockUpdateRequest = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={{...actions, updateUserRequest: mockUpdateRequest}}
        />);
        const expectedUpdatedUser = {
            username: usernameEvent.target.value,
            firstName: firstNameEvent.target.value,
            lastName: lastNameEvent.target.value,
            email: emailEvent.target.value,
            password: passwordEvent.target.value,
            isLoadMore: component.state().isLoadMore,
            options: component.state().options
        };

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

        const [call = []] = mockUpdateRequest.mock.calls;
        expect(call).toEqual([expectedUpdatedUser]);
    });

    it('should call "startJoiningGroup" after click button "join group"', () => {
        const mockStartJoiningGroup = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={{...actions, startJoiningGroup: mockStartJoiningGroup}}
        />);

        const spy = jest.spyOn(component.instance(), 'startJoiningGroup');
        component.instance().forceUpdate();
        const joinGroupButton = component.find('.btn-outline-info').at(0);
        joinGroupButton.simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockStartJoiningGroup).toHaveBeenCalledTimes(2);
        const [call = []] = mockStartJoiningGroup.mock.calls[1];
        expect(call).toEqual(true);
    });

    it('should call "joinGroup" after click button for group "join group"', () => {
        const mockJoinGroup = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={{...actions, joinGroup: mockJoinGroup}}
            groups={groups}
        />);
        const exptectedJoinGroup = {
            userID: match.params.id,
            groupID: group._id
        };

        const spyJoinGroup = jest.spyOn(component.instance(), 'joinGroup');
        component.instance().forceUpdate();
        const joinGroupButton = component.find('.user__join-group').at(0);
        joinGroupButton.simulate('click', event);

        expect(spyJoinGroup).toHaveBeenCalledTimes(1);
        expect(mockJoinGroup).toHaveBeenCalledTimes(1);
        component.instance().joinGroup(group._id, event);

        const [call = []] = mockJoinGroup.mock.calls;
        expect(call).toEqual([exptectedJoinGroup]);
    });

    it('should call "leaveGroup" after click button for group "leave group"', () => {
        const mockleaveGroupRequest = jest.fn();
        event.stopPropagation = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            actions={{...actions, leaveGroupRequest: mockleaveGroupRequest}}
            groups={groups}
        />);
        const exptectedLeaveGroup = {
            userID: match.params.id,
            groupID: group._id
        };

        const spy = jest.spyOn(component.instance(), 'leaveGroup');
        component.instance().forceUpdate();
        const leaveGroupButton = component.find('.user__leave-group').at(0);
        leaveGroupButton.simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockleaveGroupRequest).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        component.instance().leaveGroup(group._id, event);

        const [call = []] = mockleaveGroupRequest.mock.calls;
        expect(call).toEqual([exptectedLeaveGroup]);
    });

    it('should call "handleChange" and set state after change username form', () => {
        const component = shallow(<UserPage
            user={user}
            match={match}
            actions={actions}
        />);

        component.find('[name="username"]').at(0).simulate('change', usernameEvent);
        expect(component.state().username).toBe(usernameEvent.target.value);

    });

    it('should call "handleChange" and set state after change firstName form', () => {
        const component = shallow(<UserPage
            user={user}
            match={match}
            actions={actions}
        />);

        component.find('[name="firstName"]').at(0).simulate('change', firstNameEvent);
        expect(component.state().firstName).toBe(firstNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change lastName form', () => {
        const component = shallow(<UserPage
            user={user}
            match={match}
            actions={actions}
        />);

        component.find('[name="lastName"]').at(0).simulate('change', lastNameEvent);
        expect(component.state().lastName).toBe(lastNameEvent.target.value);
    });

    it('should call "handleChange" and set state after change email form', () => {
        const component = shallow(<UserPage
            user={user}
            match={match}
            actions={actions}
        />);

        component.find('[name="email"]').at(0).simulate('change', emailEvent);
        expect(component.state().email).toBe(emailEvent.target.value);
    });

    it('should call "handleChange" and set state after change password form', () => {
        const component = shallow(<UserPage
            user={user}
            match={match}
            actions={actions}
        />);

        component.find('[name="password"]').at(0).simulate('change', passwordEvent);
        expect(component.state().password).toBe(passwordEvent.target.value);
    });

    it('should load more groups for user', () => {
        const mockUserRequest = jest.fn();
        const component = shallow(<UserPage
            match={match}
            user={user}
            groups={groups}
            actions={{...actions, getUserRequest: mockUserRequest}}
        />);
        component.setState({
            options: {
                limit: 1
            }
        });
        component.instance().loadMore();

        expect(mockUserRequest).toHaveBeenCalledTimes(2);
    });

});
