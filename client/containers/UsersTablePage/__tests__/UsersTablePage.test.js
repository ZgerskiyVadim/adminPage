import React from 'react';
import { shallow } from 'enzyme';
import {Users} from '../index';
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

        const component = shallow(<Users
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

        const component = shallow(<Users
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
        const component = shallow(<Users
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
        const component = shallow(<Users
            users={users}
            actions={{...actions, removeUserRequest: mockRemoveUserRequest}}
        />);

        component.find(User).at(0).props().showModal(user._id, event);
        component.find(ModalWindow).props().remove();

        const [call = []] = mockRemoveUserRequest.mock.calls;
        expect(call).toEqual([expectedRemovedUser]);
    });

    it('should call "showModal" after click "remove" button in User component', () => {
        const component = shallow(<Users
            users={users}
            actions={actions}
        />);

        component.find(User).at(0).props().showModal(user._id, event);

        expect(component.state().userID).toBe(user._id);
        expect(component.state().showModal).toBe(true);
    });

    it('should call "closeModal" after click "close" button in ModalWindow component', () => {
        const component = shallow(<Users
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
        const component = shallow(<Users
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
        const component = shallow(<Users
            users={users}
            actions={{...actions, getUsersRequest: mockUsersRequest}}
        />);
        const mockGetUsers = {
            limit: component.state().options.limit,
            searchBy: component.state().options.searchBy
        };
        component.instance().loadMore();

        const [call = []] = mockUsersRequest.mock.calls;
        expect(call).toEqual([mockGetUsers]);

    })

});
