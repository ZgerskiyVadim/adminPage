import React from 'react';
import { shallow } from 'enzyme';
import {Group} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ModalWindow from '../../../components/ModalWindow';

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

    it('renders without errors', () => {

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

        expect(component.find('.group').length).toBe(1);

        expect(component.find('.group__info').length).toBe(1);

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

    it('should call "goToUser" after click on user', () => {

        const component = shallow(<Group
            match={match}
            group={group}
            users={users}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'goToUser');
        component.instance().forceUpdate();

        expect(component.find('.group__users-list').at(0).simulate('click'));

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "showForms" after click button update', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'showForms');
        component.instance().forceUpdate();

        expect(component.find('.btn-outline-primary').at(0).simulate('click', event, user._id));
        expect(component.state().id).toBe(user._id);
        expect(component.state().showForm).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "updateGroup" after click button save', () => {
        event.stopPropagation = jest.fn();
        event.preventDefault = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
        />);

        const spy = jest.spyOn(component.instance(), 'updateGroup');
        component.instance().forceUpdate();

        expect(component.find('.btn-outline-primary').at(0).simulate('click', event, user._id));
        expect(component.state().showForm).toBe(true);
        expect(component.find('.btn-outline-primary').at(1).simulate('click', event));
        expect(component.state().showForm).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "showModal" after click button remove user', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group
            match={match}
            group={group}
            actions={actions}
            users={users}
        />);

        const spy = jest.spyOn(component.instance(), 'showModal');
        component.instance().forceUpdate();

        expect(component.find('.group__remove-user').at(0).simulate('click', event, user._id));
        expect(component.state().showModal).toBe(true);
        expect(component.state().userID).toBe(user._id);

        const modalWindow = component.find(ModalWindow);

        expect(modalWindow.props().showModal).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });


    // it('should call "sendOptionsJoinGroup" after click button join group', () => {
    //     event.stopPropagation = jest.fn();
    //     const joinGroup = jest.fn();
    //     const component = shallow(<Group
    //         group={group}
    //         joinGroup={joinGroup}
    //     />);
    //
    //     component.setState({ userID: group._id });
    //
    //     const spy = jest.spyOn(component.instance(), 'sendOptionsJoinGroup');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('.btn-outline-info').at(0).simulate('click', event, group._id));
    //
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(joinGroup).toHaveBeenCalledTimes(1);
    //     expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    // });


    // it('should call "handleChange" after change form', () => {
    //
    //     const component = shallow(<Group group={group}/>);
    //
    //     const spy = jest.spyOn(component.instance(), 'handleChange');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('[name="name"]').at(0).simulate('change', event));
    //     expect(component.find('[name="title"]').at(0).simulate('change', event));
    //
    //     expect(spy).toHaveBeenCalledTimes(2);
    // });
    //
    // it('should call "handleClick" after click on form', () => {
    //     event.stopPropagation = jest.fn();
    //     const component = shallow(<Group group={group}/>);
    //
    //     const spy = jest.spyOn(component.instance(), 'handleClick');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('[name="name"]').at(0).simulate('click', event));
    //     expect(component.find('[name="title"]').at(0).simulate('click', event));
    //
    //     expect(spy).toHaveBeenCalledTimes(2);
    //     expect(event.stopPropagation).toHaveBeenCalledTimes(2);
    // });
    //

    //
    // it('should call "remove" after click button remove', () => {
    //     const showModal = jest.fn();
    //     const component = shallow(<Group
    //         group={group}
    //         showModal={showModal}
    //     />);
    //
    //     const spy = jest.spyOn(component.instance(), 'remove');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('.btn-outline-danger').at(0).simulate('click', event, group._id));
    //
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(showModal).toHaveBeenCalledTimes(1);
    // });
    //

    //
    // it('should call "showForms" after click button update', () => {
    //     event.stopPropagation = jest.fn();
    //     const component = shallow(<Group group={group}/>);
    //
    //     const spy = jest.spyOn(component.instance(), 'showForms');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('.btn-outline-primary').at(0).simulate('click', event, group._id));
    //     expect(component.state().id).toBe(group._id);
    //     expect(component.state().showForm).toBe(true);
    //
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    // });
    //
    // it('should call "sendOptionsJoinGroup" after click button join group', () => {
    //     event.stopPropagation = jest.fn();
    //     const joinGroup = jest.fn();
    //     const component = shallow(<Group
    //         group={group}
    //         joinGroup={joinGroup}
    //     />);
    //
    //     component.setState({ userID: group._id });
    //
    //     const spy = jest.spyOn(component.instance(), 'sendOptionsJoinGroup');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('.btn-outline-info').at(0).simulate('click', event, group._id));
    //
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(joinGroup).toHaveBeenCalledTimes(1);
    //     expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    // });
    //
    // it('should call "sendOptionsLeaveGroup" after click button leave group', () => {
    //     event.stopPropagation = jest.fn();
    //     const leaveGroup = jest.fn();
    //     const component = shallow(<Group
    //         group={group}
    //         leaveGroup={leaveGroup}
    //     />);
    //
    //     component.setState({ userID: group._id });
    //
    //     const spy = jest.spyOn(component.instance(), 'sendOptionsLeaveGroup');
    //     component.instance().forceUpdate();
    //
    //     expect(component.find('.btn-outline-danger').at(1).simulate('click', event, group._id));
    //
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     expect(leaveGroup).toHaveBeenCalledTimes(1);
    //     expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    // });

});
