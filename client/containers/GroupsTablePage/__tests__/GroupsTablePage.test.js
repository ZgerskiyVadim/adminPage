import React from 'react';
import { shallow } from 'enzyme';
import {GroupsTablePage} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from "../../../components/ModalWindow";
import SearchInput from "../../../components/SearchInput";
import Group from '../../../components/GroupItem/group';
import history from '../../../services/history';

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
    data: [group,
        {...group, _id: 2,
            users: [{...user.data, _id: 2}]
        }]
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




    it('render Groups component', () => {

        const component = shallow(<GroupsTablePage
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

        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={{...actions, getGroupsRequest: mockGroupsRequest}}
        />);
        const expectedGetGroups = {
            searchBy: component.state().options.searchBy,
            limit: component.state().options.limit
        };

        const [call = []] = mockGroupsRequest.mock.calls;
        expect(call).toEqual([expectedGetGroups]);
    });

    it('show loading spinner', () => {

        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={actions}
            loading={true}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(true);

    });

    it('should call "searchGroups" after onChange form in SearchInput component', () => {
        const mockGroupsRequest = jest.fn();
        const mockEvent = {target: {value: 'search'}};
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={{...actions, getGroupsRequest: mockGroupsRequest}}
        />);

        component.find(SearchInput).props().search(mockEvent);
        expect(component.state().options.searchBy).toBe(mockEvent.target.value);

        expect(mockGroupsRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "remove" after click "remove" button in User component and click "yes" in ModalWindow component', () => {
        const mockRemoveGroupRequest = jest.fn();
        const expectedRemovedGroup = group._id;
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={{...actions, removeGroupRequest: mockRemoveGroupRequest}}
        />);

        component.find(Group).at(0).props().showModal(group._id, event);
        component.find(ModalWindow).props().remove();

        const [call = []] = mockRemoveGroupRequest.mock.calls;
        expect(call).toEqual([expectedRemovedGroup]);
    });

    it('should call "showModal" after click "remove" button in Group component', () => {
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={actions}
        />);

        component.find(Group).at(0).props().showModal(group._id, event);

        expect(component.state().groupID).toBe(group._id);
        expect(component.state().showModal).toBe(true);
    });

    it('should call "closeModal" after click "close" button in ModalWindow component', () => {
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={actions}
        />);

        component.find(Group).at(0).props().showModal(group._id, event);
        expect(component.state().showModal).toBe(true);

        component.find(ModalWindow).props().closeModal(event);
        expect(component.state().showModal).toBe(false);
    });

    it('should call "updateGroup" after click "save" in Group component', () => {
        const mockUpdateGroupRequest = jest.fn();
        const expectedUpdatedGroup = {
            id: group._id,
            name: 'new name'
        };
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={{...actions, updateGroupRequest: mockUpdateGroupRequest}}
        />);

        component.find(Group).at(0).props().update({
            id: group._id,
            name: 'new name'
        });

        const [call = []] = mockUpdateGroupRequest.mock.calls;
        expect(call).toEqual([expectedUpdatedGroup]);
    });

    it('should call "cancelJoinGroup" after click "cancel join group" button in SearchInput component', () => {
        const mockCancelJoinGroup = jest.fn();
        const component = shallow(<GroupsTablePage
            groups={groups}
            user={user}
            actions={{...actions, cancelJoinGroup: mockCancelJoinGroup}}
        />);

        expect(history.location.pathname).toBe(`/`);
        component.find(SearchInput).props().handleButtonClick();
        expect(history.location.pathname).toBe(`/users/${user.data._id}`);

        const [call = []] = mockCancelJoinGroup.mock.calls;
        expect(call).toEqual([false]);
        expect(mockCancelJoinGroup).toHaveBeenCalledTimes(1);
    });

    it('should call "joinGroup" after click "join group" button in Group component', () => {
        const mockJoinGroup = jest.fn();
        const expectedJoinedGroup = {
            userID:user.data._id,
            groupID: group._id
        };
        const component = shallow(<GroupsTablePage
            groups={groups}
            user={user}
            actions={{...actions, joinGroup: mockJoinGroup}}
            isJoiningGroup={true}
        />);

        component.find(Group).at(0).props().joinGroup({
            userID: user.data._id,
            groupID: group._id
        });

        const [call = []] = mockJoinGroup.mock.calls;
        expect(call).toEqual([expectedJoinedGroup]);
    });

    it('should call "leaveGroup" after click "leave group" button in Group component', () => {
        const mockLeaveGroupRequest = jest.fn();
        const expectedLeaveGroup = {
            userID:user.data._id,
            groupID: group._id
        };
        const component = shallow(<GroupsTablePage
            groups={groups}
            user={user}
            actions={{...actions, leaveGroupRequest: mockLeaveGroupRequest}}
            isJoiningGroup={true}
        />);

        component.find(Group).at(0).props().leaveGroup({
            userID: user.data._id,
            groupID: group._id
        });

        const [call = []] = mockLeaveGroupRequest.mock.calls;
        expect(call).toEqual([expectedLeaveGroup]);
    });

    it('should load more groups on page', () => {
        const mockGroupsRequest = jest.fn();
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={{...actions, getGroupsRequest: mockGroupsRequest}}
        />);
        component.setState({
            options: {
                limit: 1
            }
        });
        component.instance().loadMore();

        expect(mockGroupsRequest).toHaveBeenCalledTimes(2);

    });

    it('should show "join group" button if user joining groups', () => {
        const component = shallow(<GroupsTablePage
            groups={groups}
            actions={actions}
            isJoiningGroup={true}
            user={user}
        />);

        const groupComponent = component.find(Group);
        expect(groupComponent.at(0).props().isJoiningGroup).toBe(true);
        expect(groupComponent.at(0).props().userJoinedGroup).toBe(true);
        expect(groupComponent.at(1).props().userJoinedGroup).toBe(false);
    })

});
