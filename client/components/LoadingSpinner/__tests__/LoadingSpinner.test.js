import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from '../index';

describe('LoadingSpinner component', () => {
    it('render LoadingSpinner component', () => {
        shallow(<LoadingSpinner />);
    });

    it('should render cover and loading spinner', () => {
        const component = shallow(<LoadingSpinner />);

        expect(component.find('.cover').length).toBe(1);

        expect(component.find('.loader').length).toBe(1);
    });

    it('should show loading spinner', () => {
        const component = shallow(<LoadingSpinner loading={true} />);

        expect(component.find('.loader--hide').length).toBe(0);
    });

    it('should hide loading spinner', () => {
        const component = shallow(<LoadingSpinner loading={false} />);

        expect(component.find('.loader--hide').length).toBe(1);
    })

});
