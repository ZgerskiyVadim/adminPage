import axios from 'axios/index';
import authenticationService from '../authenticationService';
import localStorageOperations from '../localStorageOperations';

describe('authenticationService service', () => {

    it('should have session', () => {
        document.cookie = "userSession=someHash";
        localStorageOperations.setItem('userID', 'someID');
        expect(authenticationService.isHaveSession()).toBe(true);
    });

    it('should have not session', () => {
        document.cookie = "userSession=someHash";
        localStorageOperations.setItem('userID', 'someID');
        localStorageOperations.remove('userID');
        expect(authenticationService.isHaveSession()).toBe(false);
    });

    it('should logout', () => {
        axios.get = () => Promise.resolve();
        const axiosLogout = jest.spyOn(axios, 'get');

        authenticationService.logout();

        const [call = []] = axiosLogout.mock.calls;
        expect(call).toEqual(['/auth/logout']);
    });

    it('should error logout', () => {
        axios.get = () => Promise.reject({data: 'Some error'});
        const axiosLogout = jest.spyOn(axios, 'get');

        authenticationService.logout();

        const [call = []] = axiosLogout.mock.calls;
        expect(call).toEqual(['/auth/logout']);
    });

    it('should login', () => {
        const options = {username: 'usernma', password: 'password'};
        axios.post = () => Promise.resolve();
        const axiosLogin = jest.spyOn(axios, 'post');

        authenticationService.login(options);

        const [[url, params]] = axiosLogin.mock.calls;
        expect(url).toBe('/auth/login');
        expect(params).toEqual(options);
    });

    it('should error logout', () => {
        const options = {username: 'usernma', password: 'password'};
        axios.post = () => Promise.reject({data: 'Some error'});
        const axiosLogin = jest.spyOn(axios, 'post');

        authenticationService.login(options);

        const [[url, params]] = axiosLogin.mock.calls;
        expect(url).toBe('/auth/login');
        expect(params).toEqual(options);
    });

});