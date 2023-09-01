import request from 'supertest';

import app from '../src/app';
import { addLinkToDB, removeLinkFromDB } from '../src/services/shortenUrlService';


const mockData = {
  validShortCode: 'Ol2E4S',
  invalidShortCode: 'zzzzzz',
  validShortLink: 'localhost:3000/Ol2E4S',
  invalidShortLink: 'localhost:3000/zzzzzz'
};

describe('GET /:6-digit-code', () => {

  beforeAll(async () => {
    await addLinkToDB('https://google.com', mockData.validShortLink);
  });
  //gotta make sure that we have the link in our DB
  afterAll(async () => {
    await removeLinkFromDB(mockData.validShortLink);
  });


  describe('user entered an existing short link', () => {
    test('should redirect with 302 status code', async () => {
      const response = await request(app).get(`/${mockData.validShortCode}`);

      expect(response.statusCode).toBe(302);
    });
  });

  describe('user entered a non-existant short link', () => {
    test('should respond with 404 status code and provide a not found html page', async () => {
      const response = await request(app).get(`/${mockData.invalidShortCode}`);

      expect(response.statusCode).toBe(404);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('html'));
    });
  });

});
