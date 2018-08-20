import React from 'react';
import { shallow } from 'enzyme';
import {UsersTablePage} from '../index';
import * as actions from '../../../actions/action_creators/users';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from "../../../components/ModalWindow";
import SearchInput from "../../../components/SearchInput";
import User from '../../../components/UserItem/user';

const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    _id: 1
};

const users = {
    data: [user, {...user, _id: 2}]
};

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};

describe('Users component', () => {

    it('render Users component', () => {

        const component = shallow(<UsersTablePage
            users={users}
            actions={actions}
        />);

        const loadingSpinner = component.find(LoadingSpinner);
        const modalWindow = component.find(ModalWindow);

        expect(loadingSpinner.props().loading).toBe(false);
        expect(modalWindow.props().showModal).toBe(false);

        expect(component.find('.users').length).toBe(1);

        expect(component.find('.users__table').length).toBe(1);

    });

    it('should call fetch when mounted', () => {
        const mockUsersRequest = jest.fn();

        const component = shallow(<UsersTablePage
            users={users}
            actions={{...actions, getUsersRequest: mockUsersRequest}}
        />);
        const expectedGetUsers = {
            searchBy: component.state().options.searchBy,
            limit: component.state().options.limit
        };

        const [call = []] = mockUsersRequest.mock.calls;
        expect(call).toEqual([expectedGetUsers]);
    });

    it('should call "searchUsers" after onChange form in SearchInput component', () => {
        const mockUsersRequest = jest.fn();
        const mockEvent = {target: {value: 'search'}};
        const component = shallow(<UsersTablePage
            users={users}
            actions={{...actions, getUsersRequest: mockUsersRequest}}
        />);

        component.find(SearchInput).props().search(mockEvent);
        expect(component.state().options.searchBy).toBe(mockEvent.target.value);

        expect(mockUsersRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "remove" after click "remove" button in User component and click "yes" in ModalWindow component', () => {
        const mockRemoveUserRequest = jest.fn();
        const expectedRemovedUser = user._id;
        const component = shallow(<UsersTablePage
            users={users}
            actions={{...actions, removeUserRequest: mockRemoveUserRequest}}
        />);

        component.find(User).at(0).props().showModal(user._id, event);
        component.find(ModalWindow).props().remove();

        const [call = []] = mockRemoveUserRequest.mock.calls;
        expect(call).toEqual([expectedRemovedUser]);
    });

    it('should call "showModal" after click "remove" button in User component', () => {
        const component = shallow(<UsersTablePage
            users={users}
            actions={actions}
        />);

        component.find(User).at(0).props().showModal(user._id, event);

        expect(component.state().userID).toBe(user._id);
        expect(component.state().showModal).toBe(true);
    });

    it('should call "closeModal" after click "close" button in ModalWindow component', () => {
        const component = shallow(<UsersTablePage
            users={users}
            actions={actions}
        />);

        component.find(User).at(0).props().showModal(user._id, event);
        let modalWindow = component.find(ModalWindow);
        expect(modalWindow.props().showModal).toBe(true);

        component.find(ModalWindow).props().closeModal(event);
        modalWindow = component.find(ModalWindow);
        expect(modalWindow.props().showModal).toBe(false);
    });

    it('should call "updateUser" after click "save" button in User component', () => {
        const mockUpdateUserRequest = jest.fn();
        const expectedUpdatedUser = {
            id: user._id,
            username: 'new username'
        };
        const component = shallow(<UsersTablePage
            users={users}
            actions={{...actions, updateUserRequest: mockUpdateUserRequest}}
        />);

        component.find(User).at(0).props().update({
            id: user._id,
            username: 'new username'
        });

        const [call = []] = mockUpdateUserRequest.mock.calls;
        expect(call).toEqual([expectedUpdatedUser]);
    });

    it('should load more users on page', () => {
        const mockUsersRequest = jest.fn();
        const component = shallow(<UsersTablePage
            users={users}
            actions={{...actions, getUsersRequest: mockUsersRequest}}
        />);
        component.setState({
            options: {
                limit: 1
            }
        });
        component.instance().loadMore();

        expect(mockUsersRequest).toHaveBeenCalledTimes(2);
    });

    it('should hide "remove" button if user joining groups', () => {
        const user = {
            data: {
                _id: 1
            }
        };
        const component = shallow(<UsersTablePage
            users={users}
            actions={actions}
            isJoiningGroup={true}
            user={user}
        />);

        const userComponent = component.find(User);
        expect(userComponent.at(0).props().isJoining).toBe(true);
        expect(userComponent.at(1).props().isJoining).toBe(false);
    })

});
