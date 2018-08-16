import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../index';

describe('LoadingSpinner component', () => {
    it('renders without errors', () => {
        shallow(<LoadingSpinner />);
    });

    it('should render cover and loading spinner', () => {
        const component = shallow(<LoadingSpinner />);

        expect(component).toMatchSnapshot();

        expect(component.find('.cover').length).toBe(1);

        expect(component.find('.loader').length).toBe(1);
    });

    it('should show loading spinner', () => {
        const component = shallow(<LoadingSpinner loading={true} />);

        expect(component).toMatchSnapshot();

        expect(component.find('.loader--hide').length).toBe(0);
    });

    it('should hide loading spinner', () => {
        const component = shallow(<LoadingSpinner loading={false} />);

        expect(component).toMatchSnapshot();

        expect(component.find('.loader--hide').length).toBe(1);
    })

});
