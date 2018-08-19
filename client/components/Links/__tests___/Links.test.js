import React from 'react';
import { shallow } from 'enzyme';
import Links from '../index';
import history from '../../../services/history';

describe('Links component', () => {
    it('render Links component', () => {
        shallow(<Links />);
    });

    it('should render links list', () => {
        const component = shallow(<Links />);

        expect(component.find('.links--row').length).toBe(1);

        expect(component.find('.nav-item').length).toBe(2);
    });

    it('should show active link users for location path "users"', () => {
        const component = shallow(<Links lastBreadCrumb={ {path: 'users'} } />);
        const usersLink = component.find('.link-users');
        const groupsLink = component.find('.link-groups');

        expect(usersLink.hasClass('active')).toBe(true);
        expect(groupsLink.hasClass('active')).toBe(false);
    });

    it('should show active link groups for location path "groups"', () => {
        const component = shallow(<Links lastBreadCrumb={ {path: 'groups'} } />);
        const usersLink = component.find('.link-users');
        const groupsLink = component.find('.link-groups');

        expect(groupsLink.hasClass('active')).toBe(true);
        expect(usersLink.hasClass('active')).toBe(false);
    });

    it('should call "goToUsersPage" after click on link users', () => {
        const component = shallow(<Links />);

        const spyGoToUsersPage = jest.spyOn(component.instance(), 'goToUsersPage');
        component.instance().forceUpdate();
        const usersLink = component.find('.link-users');

        usersLink.props().onClick();
        expect(history.location.pathname).toBe(`/users`);
        expect(spyGoToUsersPage).toHaveBeenCalledTimes(1);
    });

    it('should call "goToGroupsPage" after click on link groups', () => {
        const component = shallow(<Links />);

        const spyGoToGroupsPage = jest.spyOn(component.instance(), 'goToGroupsPage');
        component.instance().forceUpdate();
        const groupsLink = component.find('.link-groups');

        groupsLink.props().onClick();
        expect(history.location.pathname).toBe(`/groups`);
        expect(spyGoToGroupsPage).toHaveBeenCalledTimes(1);
    })

});
