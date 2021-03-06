import React from 'react';
import { shallow } from 'enzyme';
import {Breadcrumb} from '../index';
import history from '../../../services/history';

let location = {
    pathname: '/'
};

const user = {
    data: {
        username: 'username',
        _id: '1'
    }
};

describe('Breadcrumb component', () => {

    it('render Breadcrumb component', () => {

        const component = shallow(<Breadcrumb
            location={location}
            user={user}
        />);

        expect(component.find('.breadcrumb-root').length).toBe(1);

        expect(component.find('.breadcrumb').length).toBe(1);

        expect(component.find('.breadcrumb-item').length).toBe(0);

    });

    it('show new breadcrumb after go to another page', () => {
        location.pathname = '/users';

        const component = shallow(<Breadcrumb
            location={location}
            user={user}
        />);

        expect(component.find('.breadcrumb-root').length).toBe(1);

        expect(component.find('.breadcrumb').length).toBe(1);

        expect(component.find('.breadcrumb-item').length).toBe(1);

        expect(component.find('.breadcrumb-item').at(0).text()).toBe('users');

    });

    it('call "goToPath" after click on breadcrumb', () => {
        const breadcrumb = {
            location: '/users',
            islastPath: false
        };
        const component = shallow(<Breadcrumb
            location={location}
            user={user}
        />);

        component.instance().goToPath(breadcrumb);
        expect(history.location.pathname).toBe(`/users`);

        const spyGoToPath = jest.spyOn(component.instance(), 'goToPath');

        component.find('.breadcrumb-item').at(0).simulate('click');

        expect(spyGoToPath).toHaveBeenCalledTimes(1);
    });

    it('show breadcrumb username after go to user page', () => {
        let location = {
            pathname: '/users/1'
        };

        const component = shallow(<Breadcrumb
            location={location}
            user={user}
        />);

        expect(component.find('.breadcrumb-item').at(1).text()).toBe(user.data.username);
    });

});
