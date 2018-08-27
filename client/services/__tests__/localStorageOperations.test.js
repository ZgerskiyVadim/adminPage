import localStorageOperations from '../localStorageOperations';

describe('localStorageOperations service', () => {

    it('localStorageOperations setItem', () => {
        localStorageOperations.setItem('someKey', 'data');
        expect(localStorageOperations.getItem('someKey')).toBe('data');
    });

    it('localStorageOperations remove', () => {
        localStorageOperations.setItem('someKey', 'data');
        localStorageOperations.remove('someKey');
        expect(localStorageOperations.getItem('someKey')).toBe(null);
    });
});