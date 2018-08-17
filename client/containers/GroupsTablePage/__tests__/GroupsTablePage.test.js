import React from 'react';
import { BrowserRouter as Router }    from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import {Groups} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from "../../../components/ModalWindow";
import SearchInput from "../../../components/SearchInput";
import {Group} from '../../../components/GroupItem/group';

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
    users: [user.data],
    _id: 1
};

const groups = {
    data: [group, {...group, _id: 2}]
};

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};

describe('Groups component', () => {

    it('renders without errors', () => {

        const component = shallow(<Groups
            groups={groups}
            actions={actions}
        />);

        const loadingSpinner = component.find(LoadingSpinner);
        const modalWindow = component.find(ModalWindow);

        expect(loadingSpinner.props().loading).toBe(false);
        expect(modalWindow.props().showModal).toBe(false);

        expect(component.find('.groups').length).toBe(1);

        expect(component.find('.groups__table').length).toBe(1);

    });

    it('should call fetch when mounted', () => {
        const mockGroupsRequest = jest.fn();

        const component = mount(
            <Router>
                <Groups
                    groups={groups}
                    actions={{...actions, getGroupsRequest: mockGroupsRequest}}
                />
            </Router>);

        expect(component).toBeDefined();
        expect(mockGroupsRequest).toHaveBeenCalledTimes(1);
    });

    it('show loading spinner', () => {

        const component = shallow(<Groups
            groups={groups}
            actions={actions}
            loading={true}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(true);

    });

    it('should call "searchGroups" after onChange form in SearchInput component', () => {
        const mockGroupsRequest = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            actions={{...actions, getGroupsRequest: mockGroupsRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'searchGroups');
        component.instance().forceUpdate();

        const searchInputComponent = shallow(<SearchInput
            search={component.instance().searchGroups}
        />);

        expect(searchInputComponent.find('.form-control').simulate('change', event));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockGroupsRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "cancelJoinGroup" after click button "cancel join group" in SearchInput component', () => {
        const mockCancelJoinGroup = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            user={user}
            actions={{...actions, cancelJoinGroup: mockCancelJoinGroup}}
        />);

        const spy = jest.spyOn(component.instance(), 'cancelJoinGroup');
        component.instance().forceUpdate();

        const searchInputComponent = shallow(<SearchInput
            handleButtonClick={component.instance().cancelJoinGroup}
        />);

        expect(searchInputComponent.find('button').simulate('click'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockCancelJoinGroup).toHaveBeenCalledTimes(1);
    });

    it('should call "remove" after click button "remove" in Group component', () => {
        const mockRemoveGroupRequest = jest.fn();
        const closeModal = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            actions={{...actions, removeGroupRequest: mockRemoveGroupRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'remove');
        component.instance().forceUpdate();

        const modalWindowComponent =  shallow(<ModalWindow
            remove={component.instance().remove}
            closeModal={closeModal}
        />);
        expect(modalWindowComponent.find('.btn-success').at(0).simulate('click'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockRemoveGroupRequest).toHaveBeenCalledTimes(1);
    });

    it('should call "showModal" after click "remove" in Group component', () => {
        const component = shallow(<Groups
            groups={groups}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'showModal');
        component.instance().forceUpdate();

        const groupComponent = shallow(<Group
            group={group}
            showModal={component.instance().showModal}
        />);

        expect(groupComponent.find('.btn-outline-danger').at(0).simulate('click', event, group._id));
        expect(component.state().groupID).toBe(group._id);
        expect(component.state().showModal).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "closeModal" after click "close" in ModalWindow component', () => {
        const remove = jest.fn();

        const component = shallow(<Groups
            groups={groups}
            actions={actions}
            showModal={true}
        />);

        const spy = jest.spyOn(component.instance(), 'closeModal');
        component.instance().forceUpdate();

        const modalWindowComponent = shallow(<ModalWindow
            remove={remove}
            closeModal={component.instance().closeModal}
        />);

        modalWindowComponent.find('.close').at(0).props().onClick();
        expect(component.state().showModal).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "updateGroup" after click "save" in Group component', () => {
        event.stopPropagation = jest.fn();
        const mockUpdateGroupRequest = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            actions={{...actions, updateGroupRequest: mockUpdateGroupRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'updateGroup');
        component.instance().forceUpdate();

        const groupComponent = shallow(<Group
            group={group}
            update={component.instance().updateGroup}
        />);

        expect(groupComponent.find('.btn-outline-primary').at(1).simulate('click', event, group._id));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockUpdateGroupRequest).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "joinGroup" after click "join group" in Group component', () => {
        event.stopPropagation = jest.fn();
        const mockJoinGroup = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            user={user}
            actions={{...actions, joinGroup: mockJoinGroup}}
            isJoiningGroup={true}
        />);

        const spy = jest.spyOn(component.instance(), 'joinGroup');
        component.instance().forceUpdate();

        const groupComponent = shallow(<Group
            group={group}
            userID={user.data._id}
            joinGroup={component.instance().joinGroup}
        />);

        expect(groupComponent.find('.btn-outline-info').at(0).simulate('click', event, group._id));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockJoinGroup).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "leaveGroup" after click "leave group" in Group component', () => {
        event.stopPropagation = jest.fn();
        const mockLeaveGroupRequest = jest.fn();
        const component = shallow(<Groups
            groups={groups}
            user={user}
            actions={{...actions, leaveGroupRequest: mockLeaveGroupRequest}}
            isJoiningGroup={true}
        />);

        const spy = jest.spyOn(component.instance(), 'leaveGroup');
        component.instance().forceUpdate();

        const groupComponent = shallow(<Group
            group={group}
            userID={user.data._id}
            leaveGroup={component.instance().leaveGroup}
        />);

        expect(groupComponent.find('.btn-outline-danger').at(1).simulate('click', event, group._id));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockLeaveGroupRequest).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

});
