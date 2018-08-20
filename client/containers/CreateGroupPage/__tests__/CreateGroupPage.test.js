import React from 'react';
import { shallow } from 'enzyme';
import {CreateGroup} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import {nameEvent, titleEvent} from "./data";

const event = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};


describe('CreateGroupPage component', () => {
    it('render CreateGroupPage component', () => {
        const component = shallow(<CreateGroup />);

        expect(component.find('.create-group').length).toBe(1);

        expect(component.find('.create-group--row').length).toBe(1);
    });

    it('should call "handleChange" and set state after change name form', () => {
        const component = shallow(<CreateGroup />);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        expect(component.state().name).toBe(nameEvent.target.value);
    });

    it('should call "handleChange" and set state after change title form', () => {
        const component = shallow(<CreateGroup />);

        component.find('[name="title"]').at(0).simulate('change', titleEvent);
        expect(component.state().title).toBe(titleEvent.target.value);
    });

    it('should call "createGroup" after click "send" button', () => {
        const mockCreateGroup = jest.fn();

        const component = shallow(<CreateGroup
            actions={{...actions, createGroupRequest: mockCreateGroup}}
        />);
        const expectedCraeteGroup = {
            name: nameEvent.target.value,
            title: titleEvent.target.value
        };

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        component.find('[name="title"]').at(0).simulate('change', titleEvent);

        component.find('.create-group__send').simulate('click', event);

        const [call = []] = mockCreateGroup.mock.calls;
        expect(call).toEqual([expectedCraeteGroup]);
    });

});
