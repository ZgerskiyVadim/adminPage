import React from 'react';
import { shallow } from 'enzyme';
import Links from '../index';

describe('Links component', () => {
    it('render Links component', () => {
        shallow(<Links />);
    });

    it('should render links list', () => {
        const component = shallow(<Links />);

        expect(component.find('.links--row').length).toBe(1);

        expect(component.find('.nav-item').length).toBe(2);
    });

    it('should show active link users', () => {
        const component = shallow(<Links lastBreadCrumb={ {path: 'users'} } />);

        expect(component.find('.link-users').hasClass('active')).toBe(true);
        expect(component.find('.link-groups').hasClass('active')).toBe(false);
    });

    it('should show active link groups', () => {
        const component = shallow(<Links lastBreadCrumb={ {path: 'groups'} } />);

        expect(component.find('.link-groups').hasClass('active')).toBe(true);
        expect(component.find('.link-users').hasClass('active')).toBe(false);
    });

    it('should call "goToUsersPage" after click on link users', () => {
        const component = shallow(<Links />);

        const spy = jest.spyOn(component.instance(), 'goToUsersPage');
        component.instance().forceUpdate();

        component.find('.link-users').at(0).props().onClick();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should call "goToGroupsPage" after click on link groups', () => {
        const component = shallow(<Links />);

        const spy = jest.spyOn(component.instance(), 'goToGroupsPage');
        component.instance().forceUpdate();

        component.find('.link-groups').at(0).props().onClick();
        expect(spy).toHaveBeenCalledTimes(1);
    })

});
