import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../index';

describe('NotFoundPage component', () => {

    it('renders without errors', () => {
        shallow(<NotFoundPage />);
    });

    it('should render not found', () => {
        const component = shallow(<NotFoundPage />);

        expect(component).toMatchSnapshot();

        expect(component.find('.notFound').length).toBe(1);
    });

});
