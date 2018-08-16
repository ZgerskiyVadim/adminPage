import React from 'react';
import { shallow } from 'enzyme';
import {Breadcrumb} from '../index';

const location = {
    pathname: '/'
};

describe('Breadcrumb component', () => {

    it('renders without errors', () => {

        const component = shallow(<Breadcrumb location={location} />);

        expect(component.find('.breadcrumb-root').length).toBe(1);

        expect(component.find('.breadcrumb').length).toBe(1);

        expect(component.find('.breadcrumb-item').length).toBe(1);

        expect(component.find('.breadcrumb-item').at(0).text()).toBe('home');

    });

    it('show new breadcrumb after go to another page', () => {
        location.pathname = '/users';

        const component = shallow(<Breadcrumb location={location} />);

        expect(component.find('.breadcrumb-root').length).toBe(1);

        expect(component.find('.breadcrumb').length).toBe(1);

        expect(component.find('.breadcrumb-item').length).toBe(2);

        expect(component.find('.breadcrumb-item').at(1).text()).toBe('users');

    });

    it('call "goToPath" after click on breadcrumb', () => {

        const component = shallow(<Breadcrumb location={location} />);

            const spy = jest.spyOn(component.instance(), 'goToPath');
            component.instance().forceUpdate();

            expect(component.find('.breadcrumb-item').at(0).simulate('click'));

            expect(spy).toHaveBeenCalledTimes(1);
    });

});
