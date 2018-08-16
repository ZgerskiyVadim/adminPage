import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../index';

describe('CreatePage component', () => {
    it('renders without errors', () => {
        const component = shallow(<HomePage />);

        expect(component.find('.home--row').length).toBe(1);

        expect(component.find('.home--margin-right').length).toBe(1);
    });

});
