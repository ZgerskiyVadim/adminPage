import React from 'react';
import { shallow, mount } from 'enzyme';
import {GroupPage} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from '../../../components/ModalWindow';
import SearchInput from "../../../components/SearchInput";
import history from "../../../services/history";
import {
    nameEvent,
    titleEvent
} from "./data";

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

        const component = shallow(<GroupPage
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
    });

    it('show table if have users in group', () => {

        const component = shallow(<GroupPage
            match={match}
            group={group}
            users={users}
            actions={actions}
        />);

        const usersTable = component.find('.group__users-table');
        expect(['group--hide'].every(hide => usersTable.hasClass(hide))).toBe(false);
    });

    it('show loading spinner', () => {

        const component = shallow(<GroupPage
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

        const component = mount(<GroupPage
            match={match}
            group={group}
            actions={{...actions, getGroupRequest: mockGroupRequest}}
        />);

        expect(component).toBeDefined();
        expect(mockGroupRequest).toHaveBeenCalledTimes(1);
    });

    it('should call "searchGroups" after onChange form in SearchInput component', () => {
        const mockGroupRequest = jest.fn();
        const mockEvent = {target: {value: 'search'}};
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={{...actions, getGroupRequest: mockGroupRequest}}
        />);

        component.find(SearchInput).props().search(mockEvent);
        expect(component.state().options.searchBy).toBe(mockEvent.target.value);

        expect(mockGroupRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "goToUser" after click on user', () => {

        const component = shallow(<GroupPage
            match={match}
            group={group}
            users={users}
            actions={actions}
        />);

        const userItem = component.find('.group__users-list').at(0);
        expect(history.location.pathname).toBe(`/`);
        userItem.simulate('click');
        expect(history.location.pathname).toBe(`/users/${user._id}`);
    });

    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={actions}
        />);
        const showFormsButton = component.find('.btn-outline-primary').at(0);

        expect(component.state().showForm).toBe(false);
        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);
    });

    it('should call "updateGroup" after click "save" button with correct parameters', () => {
        const mockUpdateRequest = jest.fn();
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={{...actions, updateGroupRequest: mockUpdateRequest}}
        />);
        const expectedUpdatedGroup = {
            name: nameEvent.target.value,
            title: titleEvent.target.value,
            isLoadMore: component.state().isLoadMore,
            options: component.state().options
        };
        const showFormsButton = component.find('.btn-outline-primary').at(0);
        const updateButton = component.find('.btn-outline-primary').at(1);

        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        component.find('[name="title"]').at(0).simulate('change', titleEvent);

        updateButton.simulate('click', event);
        expect(component.state().showForm).toBe(false);

        const [call = []] = mockUpdateRequest.mock.calls;
        expect(call).toEqual([expectedUpdatedGroup]);
    });

    it('should call "showModal" after click button "remove user"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={actions}
            users={users}
        />);
        component.find('.group__remove-user').at(0).simulate('click', event);
        expect(component.state().showModal).toBe(true);
        expect(component.state().userID).toBe(users[0]._id);

        const modalWindow = component.find(ModalWindow);

        expect(modalWindow.props().showModal).toBe(true);
    });

    it('should call "closeModal" after closeModal in ModalWindow component', () => {
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={actions}
            users={users}
        />);

        component.find('.group__remove-user').at(0).simulate('click', event);
        let modalWindow = component.find(ModalWindow);
        expect(modalWindow.props().showModal).toBe(true);

        modalWindow.props().closeModal(event);
        modalWindow = component.find(ModalWindow);
        expect(modalWindow.props().showModal).toBe(false);
    });

    it('should call "searchUsers" after onChange form in SearchInput component', () => {
        const mockGroupRequest = jest.fn();
        const mockEvent = {target: {value: 'search'}};
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={{...actions, getGroupRequest: mockGroupRequest}}
        />);

        component.find(SearchInput).props().search(mockEvent);
        expect(component.state().options.searchBy).toBe(mockEvent.target.value);

        expect(mockGroupRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "removeUser" after success in ModalWindow component', () => {
        const mockRemoveRequest = jest.fn();
        const expectedUserRemovedFromGroup = {
            userID: users[0]._id,
            groupID: match.params.id
        };
        const component = shallow(<GroupPage
            match={match}
            group={group}
            users={users}
            actions={{...actions, removeUserFromGroupRequest: mockRemoveRequest}}
        />);

        component.instance().showModal(users[0]._id, event);
        component.find(ModalWindow).props().remove();

        const [call = []] = mockRemoveRequest.mock.calls;
        expect(call).toEqual([expectedUserRemovedFromGroup]);
    });

    it('should call "handleChange" and set state after change name form', () => {
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={actions}
        />);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        expect(component.state().name).toBe(nameEvent.target.value);
    });

    it('should call "handleChange" and set state after change title form', () => {
        const component = shallow(<GroupPage
            match={match}
            group={group}
            actions={actions}
        />);

        component.find('[name="title"]').at(0).simulate('change', titleEvent);
        expect(component.state().title).toBe(titleEvent.target.value);
    });

});
