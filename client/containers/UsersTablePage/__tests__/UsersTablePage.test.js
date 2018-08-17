import React from 'react';
import { BrowserRouter as Router }    from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import {Users} from '../index';
import * as actions from '../../../actions/action_creators/users';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from "../../../components/ModalWindow";
import SearchInput from "../../../components/SearchInput";
import {User} from '../../../components/UserItem/user';

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

    it('renders without errors', () => {

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

        const component = mount(
            <Router>
                <Users
                    users={users}
                    actions={{...actions, getUsersRequest: mockUsersRequest}}
                />
            </Router>);

        expect(component).toBeDefined();
        expect(mockUsersRequest).toHaveBeenCalledTimes(1);
    });

    it('show loading spinner', () => {

        const component = shallow(<Users
            users={users}
            actions={actions}
            loading={true}
        />);

        const loadingSpinner = component.find(LoadingSpinner);

        expect(loadingSpinner.props().loading).toBe(true);

    });

    it('should call "searchUsers" after onChange form in SearchInput component', () => {
        const mockUsersRequest = jest.fn();
        const component = shallow(<Users
            users={users}
            actions={{...actions, getUsersRequest: mockUsersRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'searchUsers');
        component.instance().forceUpdate();

        const searchInputComponent = shallow(<SearchInput
            search={component.instance().searchUsers}
        />);

        expect(searchInputComponent.find('.form-control').simulate('change', event));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockUsersRequest).toHaveBeenCalledTimes(2);
    });

    it('should call "remove" after click button "remove" in User component', () => {
        const mockRemoveUserRequest = jest.fn();
        const closeModal = jest.fn();
        const component = shallow(<Users
            users={users}
            actions={{...actions, removeUserRequest: mockRemoveUserRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'remove');
        component.instance().forceUpdate();

        const modalWindowComponent =  shallow(<ModalWindow
            remove={component.instance().remove}
            closeModal={closeModal}
        />);
        expect(modalWindowComponent.find('.btn-success').at(0).simulate('click'));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockRemoveUserRequest).toHaveBeenCalledTimes(1);
    });

    it('should call "showModal" after click "remove" in User component', () => {
        const component = shallow(<Users
            users={users}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'showModal');
        component.instance().forceUpdate();

        const userComponent = shallow(<User
            user={user}
            showModal={component.instance().showModal}
        />);

        expect(userComponent.find('.btn-outline-danger').at(0).simulate('click', event, user._id));
        expect(component.state().userID).toBe(user._id);
        expect(component.state().showModal).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "closeModal" after click "close" in ModalWindow component', () => {
        const remove = jest.fn();

        const component = shallow(<Users
            users={users}
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

    it('should call "updateUser" after click "save" in User component', () => {
        event.stopPropagation = jest.fn();
        const mockUpdateUserRequest = jest.fn();
        const component = shallow(<Users
            users={users}
            actions={{...actions, updateUserRequest: mockUpdateUserRequest}}
        />);

        const spy = jest.spyOn(component.instance(), 'updateUser');
        component.instance().forceUpdate();

        const userComponent = shallow(<User
            user={user}
            update={component.instance().updateUser}
        />);

        expect(userComponent.find('.btn-outline-primary').at(1).simulate('click', event, user._id));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(mockUpdateUserRequest).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

});
