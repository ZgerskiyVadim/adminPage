import React from 'react';
import { shallow } from 'enzyme';
import CreatePage from '../index';

describe('CreatePage component', () => {
    it('render CreatePage component', () => {
        const component = shallow(<CreatePage />);

        expect(component.find('.home--row').length).toBe(1);

        expect(component.find('.home--margin-right').length).toBe(1);
    });

});
