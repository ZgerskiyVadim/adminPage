import React from 'react';
import { shallow } from 'enzyme';
import {CreateGroupPage} from '../index';
import * as actions from '../../../actions/action_creators/groups';
import showToastrMessage from '../../../services/showToastrMessage';
import history from "../../../services/history";
import {nameEvent, titleEvent} from "./data";

const event = {
    stopPropagation: jest.fn(),
    preventDefault: jest.fn()
};


describe('CreateGroupPage component', () => {
    it('render CreateGroupPage component', () => {
        const component = shallow(<CreateGroupPage />);

        expect(component.find('.create-group').length).toBe(1);

        expect(component.find('.create-group--row').length).toBe(1);
    });

    it('should call "handleChange" and set state after change name form', () => {
        const component = shallow(<CreateGroupPage />);

        component.find('[name="name"]').at(0).simulate('change', nameEvent);
        expect(component.state().name).toBe(nameEvent.target.value);
    });

    it('should call "handleChange" and set state after change title form', () => {
        const component = shallow(<CreateGroupPage />);

        component.find('[name="title"]').at(0).simulate('change', titleEvent);
        expect(component.state().title).toBe(titleEvent.target.value);
    });

    it('should call "createGroup" after click "send" button', () => {
        const mockCreateGroup = jest.fn();

        const component = shallow(<CreateGroupPage
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

    it('should show error message in CreateGroupPage component', () => {
        showToastrMessage.error = jest.fn();
        const expectedError = true;

        const component = shallow(<CreateGroupPage />);

        component.setProps({
            createGroup: {
                error: true
            }
        });

        const [call = []] = showToastrMessage.error.mock.calls;
        expect(call).toEqual([expectedError]);
    });

    it('should show success message and redirect to "groups" page', () => {
        showToastrMessage.success = jest.fn();
        const component = shallow(<CreateGroupPage />);

        component.setProps({
            createGroup: {
                data: {
                    name: 'new name',
                    title: ' new title'
                }
            }
        });

        expect(showToastrMessage.success).toHaveBeenCalledTimes(1);
        expect(history.location.pathname).toBe(`/groups`);
    });

});
