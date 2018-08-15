import {isEqualProps} from '../../isEqualProps';

const data = {
    text: 'test',
    title: 'title'
};

const sameData = {
    text: 'test',
    title: 'title'
};

const differentData = {
    text: 'fake-test',
    title: 'fake-title'
};

describe('isEqualProps service:', () => {

    it('should get success if equal items', () => {
        expect(isEqualProps(data, sameData)).toBe(true);
    });

    it('should get error if not equal items', () => {
        expect(isEqualProps(data, differentData)).toBe(false);
    });
});