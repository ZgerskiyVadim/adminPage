import React from 'react';
import { shallow } from 'enzyme';
import Links from '../index';

describe('Links component', () => {
    it('renders without errors', () => {
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
    })

});
