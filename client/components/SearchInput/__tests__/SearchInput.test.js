import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../index';

describe('SearchInput component', () => {
    it('render SearchInput component', () => {
        const search = jest.fn();
        const handleButtonClick = jest.fn();
        const style = 'some styles';

        const component = shallow(<SearchInput
            search={search}
            style={style}
            handleButtonClick={handleButtonClick}
        />);

        expect(component.find('.search').length).toBe(1);

        expect(component.find('.form-control').length).toBe(1);

        expect(component.find('button').length).toBe(1);
    });

    it('should call "search" after onChange form', () => {
        const search = jest.fn();

        const component = shallow(<SearchInput
            search={search}
        />);

        component.find('.form-control').simulate('change');

        expect(search).toHaveBeenCalledTimes(1);
    });

    it('should call "handleButtonClick" after click on button', () => {
        const handleButtonClick = jest.fn();

        const component = shallow(<SearchInput
            handleButtonClick={handleButtonClick}
        />);

        component.find('button').simulate('click');

        expect(handleButtonClick).toHaveBeenCalledTimes(1);
    });


});
