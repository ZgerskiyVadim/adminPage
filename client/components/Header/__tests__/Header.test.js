import React from 'react';
import { shallow } from 'enzyme';
import {Header} from '../index';

describe('Header component', () => {

    it('render Header component', () => {
        const component = shallow(<Header />);

        expect(component.find('.navbar').length).toBe(1);

        expect(component.find('.navbar-brand').length).toBe(2);

    });

    it('should call "logout" after click on button', () => {
        const component = shallow(<Header />);

        const spyLogout = jest.spyOn(component.instance(), 'logout');
        component.instance().forceUpdate();

        component.find('span.navbar-brand').at(0).props().onClick();
        expect(spyLogout).toHaveBeenCalledTimes(1);
    })

});
