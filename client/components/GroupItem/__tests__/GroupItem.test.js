import React from 'react';
import { shallow } from 'enzyme';
import {Group} from '../group';
import history from '../../../services/history';

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

        const component = shallow(<Group group={group}/>);

        expect(component.find('.groups--cursor').length).toBe(1);

        expect(component.find('.groups__buttons').length).toBe(1);

        expect(component.find('button').length).toBe(5);

    });

    it('should call "goToGroup" after click component', () => {
        const component = shallow(<Group group={group} />);
        const groupItem = component.find('.groups--cursor').at(0);

        expect(history.location.pathname).toBe(`/`);
        groupItem.simulate('click', event);
        expect(history.location.pathname).toBe(`/groups/${group._id}`);

    });

    it('should call "handleChange" after change form', () => {

        const component = shallow(<Group group={group}/>);

        const spy = jest.spyOn(component.instance(), 'handleChange');
        component.instance().forceUpdate();

        component.find('[name="name"]').at(0).simulate('change', event);
        component.find('[name="title"]').at(0).simulate('change', event);

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should call "handleClick" after click on form', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group group={group}/>);

        const spy = jest.spyOn(component.instance(), 'handleClick');
        component.instance().forceUpdate();

        component.find('[name="name"]').at(0).simulate('click', event);
        component.find('[name="title"]').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(2);
        expect(event.stopPropagation).toHaveBeenCalledTimes(2);
    });

    it('should call "goToGroup" after click component', () => {

        const component = shallow(<Group group={group}/>);

        const spy = jest.spyOn(component.instance(), 'goToGroup');
        component.instance().forceUpdate();

        component.find('.groups--cursor').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "remove" after click button "remove"', () => {
        const showModal = jest.fn();
        const component = shallow(<Group
            group={group}
            showModal={showModal}
        />);

        const spy = jest.spyOn(component.instance(), 'remove');
        component.instance().forceUpdate();

        component.find('.btn-outline-danger').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(showModal).toHaveBeenCalledTimes(1);
    });

    it('should call "sendOptionsUpdate" after click button "save"', () => {
        event.stopPropagation = jest.fn();
        const update = jest.fn();
        const component = shallow(<Group
            group={group}
            update={update}
        />);

        const spy = jest.spyOn(component.instance(), 'sendOptionsUpdate');
        component.instance().forceUpdate();

        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().showForm).toBe(true);
        component.find('.btn-outline-primary').at(1).simulate('click', event);
        expect(component.state().showForm).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(2);
    });

    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<Group group={group}/>);

        const spy = jest.spyOn(component.instance(), 'showForms');
        component.instance().forceUpdate();

        component.find('.btn-outline-primary').at(0).simulate('click', event);
        expect(component.state().id).toBe(group._id);
        expect(component.state().showForm).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "sendOptionsJoinGroup" after click button "join group"', () => {
        event.stopPropagation = jest.fn();
        const joinGroup = jest.fn();
        const component = shallow(<Group
            group={group}
            joinGroup={joinGroup}
        />);

        component.setState({ userID: group._id });

        const spy = jest.spyOn(component.instance(), 'sendOptionsJoinGroup');
        component.instance().forceUpdate();

        component.find('.btn-outline-info').at(0).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(joinGroup).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "sendOptionsLeaveGroup" after click button "leave group"', () => {
        event.stopPropagation = jest.fn();
        const leaveGroup = jest.fn();
        const component = shallow(<Group
            group={group}
            leaveGroup={leaveGroup}
        />);

        component.setState({ userID: group._id });

        const spy = jest.spyOn(component.instance(), 'sendOptionsLeaveGroup');
        component.instance().forceUpdate();

        component.find('.btn-outline-danger').at(1).simulate('click', event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(leaveGroup).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should hide "remove" and "update" and show "join group" buttons if user joining groups', () => {
        const component = shallow(<Group
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
