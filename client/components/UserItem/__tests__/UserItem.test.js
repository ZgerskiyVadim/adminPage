import React from 'react';
import { shallow } from 'enzyme';
import {User} from '../user';

const user = {
    username: 'username',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    password: 'password',
    _id: 1
};

const event = {
    target: {
        name: 'name',
        value: 'value'
    },
    stopPropagation: jest.fn()
};

describe('User component', () => {

    it('renders without errors', () => {

        const component = shallow(<User user={user}/>);

        expect(component.find('.users--cursor').length).toBe(1);

        expect(component.find('.users__buttons').length).toBe(1);

        expect(component.find('button').length).toBe(3);

    });

    it('should call "handleChange" after change form', () => {

        const component = shallow(<User user={user}/>);

        const spy = jest.spyOn(component.instance(), 'handleChange');
        component.instance().forceUpdate();

        expect(component.find('[name="username"]').at(0).simulate('change', event));
        expect(component.find('[name="firstName"]').at(0).simulate('change', event));
        expect(component.find('[name="lastName"]').at(0).simulate('change', event));
        expect(component.find('[name="email"]').at(0).simulate('change', event));
        expect(component.find('[name="password"]').at(0).simulate('change', event));

        expect(spy).toHaveBeenCalledTimes(5);
    });

    it('should call "handleClick" after click on form', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<User user={user}/>);

        const spy = jest.spyOn(component.instance(), 'handleClick');
        component.instance().forceUpdate();

        expect(component.find('[name="username"]').at(0).simulate('click', event));
        expect(component.find('[name="firstName"]').at(0).simulate('click', event));
        expect(component.find('[name="lastName"]').at(0).simulate('click', event));
        expect(component.find('[name="email"]').at(0).simulate('click', event));
        expect(component.find('[name="password"]').at(0).simulate('click', event));

        expect(spy).toHaveBeenCalledTimes(5);
        expect(event.stopPropagation).toHaveBeenCalledTimes(5);
    });

    it('should call "showForms" after click button "update"', () => {
        event.stopPropagation = jest.fn();
        const component = shallow(<User user={user}/>);

        const spy = jest.spyOn(component.instance(), 'showForms');
        component.instance().forceUpdate();

        expect(component.find('.btn-outline-primary').at(0).simulate('click', event, user._id));
        expect(component.state().id).toBe(user._id);
        expect(component.state().showForm).toBe(true);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should call "sendOptionsUpdate" after click button "save"', () => {
        event.stopPropagation = jest.fn();
        const update = jest.fn();
        const component = shallow(<User
            user={user}
            update={update}
        />);

        const spy = jest.spyOn(component.instance(), 'sendOptionsUpdate');
        component.instance().forceUpdate();

        expect(component.find('.btn-outline-primary').at(0).simulate('click', event, user._id));
        expect(component.state().showForm).toBe(true);
        expect(component.find('.btn-outline-primary').at(1).simulate('click', event));
        expect(component.state().showForm).toBe(false);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(update).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(2);
    });

    it('should call "remove" after click button "remove"', () => {
        const showModal = jest.fn();
        const component = shallow(<User
            user={user}
            showModal={showModal}
        />);

        const spy = jest.spyOn(component.instance(), 'remove');
        component.instance().forceUpdate();

        expect(component.find('.btn-outline-danger').at(0).simulate('click', event, user._id));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(showModal).toHaveBeenCalledTimes(1);
    });

    it('should call "goToUser" after click component', () => {

        const component = shallow(<User user={user}/>);

        const spy = jest.spyOn(component.instance(), 'goToUser');
        component.instance().forceUpdate();

        expect(component.find('.users--cursor').at(0).simulate('click', event));

        expect(spy).toHaveBeenCalledTimes(1);
    });

});
