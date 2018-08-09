import request from 'supertest';
import app from './app';

global.json = function(verb, url) {
    return request(app)
        [verb](url)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');
};