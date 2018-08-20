import React from 'react';
import { shallow } from 'enzyme';
import {GroupItem} from '../group';
import history from '../../../services/history';
import {
    nameEvent,
    titleEvent
} from "./data";

const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    _id: 1
};

const group = {
    users: [1, 2],
    name: 'name',
    title: 'title',
    _id: 1
};

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn()
};

describe('GroupItem component', () => {

    it('render GroupItem component', () => {

        const component = shallow(<GroupItem group={group}/>);

        expect(component.find('.groups--cursor').length).toBe(1);

        expect(component.find('.groups__buttons').length).toBe(1);

        expect(component.find('button').length).toBe(5);

    });

    it('should call "goToGroup" after click component', () => {
        const component = shallow(<GroupItem group={group} />);
        const groupItem = component.find('.groups--cursor').at(0);

        expect(history.location.pathname).toBe(`/`);
        groupItem.simulate('click', event);
        expect(history.location.pathname).toBe(`/groups/${group._id}`);

    });

    it('should call "handleChange" and set state after change name form', () => {
        const component = shallow(<GroupItem group={group} />);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        expect(component.state().name).toBe(nameEvent.target.value);
    });

    it('should call "handleChange" and set state after change title form', () => {
        const component = shallow(<GroupItem group={group} />);

        component.find('[name="title"]').at(0).simulate('change', titleEvent);
        expect(component.state().title).toBe(titleEvent.target.value);
    });

    it('should call "handleClick" after click on form', () => {
        const component = shallow(<GroupItem group={group}/>);

        const spy = jest.spyOn(component.instance(), 'handleClick');
        component.instance().forceUpdate();

        component.find('[name="name"]').at(0).simulate('click', event);
        component.find('[name="title"]').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should call "showForms" after click button "update"', () => {
        const component = shallow(<GroupItem group={group}/>);
        const showFormsButton = component.find('.btn-outline-primary').at(0);

        expect(component.state().showForm).toBe(false);
        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);
    });

    it('should call "update" after click "save" button with correct parameters', () => {
        const expectedUpdatedGroup = {
            id: group._id,
            name: nameEvent.target.value,
            title: titleEvent.target.value,
        };
        const update = jest.fn();
            const component = shallow(<GroupItem
                group={group}
                update={update}
            />);
        const showFormsButton = component.find('.btn-outline-primary').at(0);
        const updateButton = component.find('.btn-outline-primary').at(1);

        showFormsButton.simulate('click', event);
        expect(component.state().showForm).toBe(true);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        component.find('[name="title"]').at(0).simulate('change', titleEvent);

        updateButton.simulate('click', event);
        expect(component.state().showForm).toBe(false);

        const [call = []] = update.mock.calls;
        expect(call).toEqual([expectedUpdatedGroup]);
    });

    it('should call "remove" after click button "remove"', () => {
        const expectedRemoveUserID = group._id;
        const expectedRemoveUserEvent = event;
        const showModal = jest.fn();
        const component = shallow(<GroupItem
            group={group}
            showModal={showModal}
        />);
        const removeUserButton = component.find('.btn-outline-danger').at(0);

        removeUserButton.simulate('click', event);

        const [call = []] = showModal.mock.calls;
        expect(call).toEqual([expectedRemoveUserID, expectedRemoveUserEvent]);
    });

    it('should call "sendOptionsJoinGroup" after click button "join group"', () => {
        const joinGroup = jest.fn();
        const expectedUserJoinGroup = {
            userID: user._id,
            groupID: group._id
        };
        const component = shallow(<GroupItem
            group={group}
            userID={user._id}
            joinGroup={joinGroup}
        />);

        component.find('.btn-outline-info').at(0).simulate('click', event);

        const [call = []] = joinGroup.mock.calls;
        expect(call).toEqual([expectedUserJoinGroup]);
    });

    it('should call "sendOptionsLeaveGroup" after click button "leave group"', () => {
        const leaveGroup = jest.fn();
        const expectedUserLeaveGroup = {
            userID: user._id,
            groupID: group._id
        };
        const component = shallow(<GroupItem
            group={group}
            userID={user._id}
            leaveGroup={leaveGroup}
        />);

        component.find('.btn-outline-danger').at(1).simulate('click', event);

        const [call = []] = leaveGroup.mock.calls;
        expect(call).toEqual([expectedUserLeaveGroup]);
    });

    it('should hide "remove" and "update" and show "join group" buttons if user joining groups', () => {
        const component = shallow(<GroupItem
            group={group}
            userJoinedGroup={false} // if false show "join group" button, else show "leave group" button
            isJoiningGroup={true}
        />);
        const removeButtons = component.find('.groups__remove');
        const updateButtons = component.find('.groups__update');
        const joinGroupButtons = component.find('.btn-outline-info');
        removeButtons.forEach(button => expect(button.hasClass('groups--hide')).toBe(true));
        updateButtons.forEach(button => expect(button.hasClass('groups--hide')).toBe(true));
        joinGroupButtons.forEach(button => expect(button.hasClass('groups--hide')).toBe(false));
    })

});
