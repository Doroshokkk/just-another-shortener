import request from 'supertest';

import app from '../src/app';
import { addLinkToDB, removeLinkFromDB } from '../src/services/shortenUrlService';

const mockData = {
  validShortLink: 'localhost:3000/0l2E4S',
  invalidShortLink: 'localhost:3000/zzzzzz'
};

describe('GET /api/resolve', () => {
  beforeAll(async () => {
    await addLinkToDB('https://google.com', mockData.validShortLink);
  });
  //gotta make sure that we have the link in our DB
  afterAll(async () => {
    await removeLinkFromDB(mockData.validShortLink);
  });

  describe('recieved a valid link', () => {
    test('should respond with 200 status code', async () => {
      const response = await request(app).get('/api/resolve').query({ link: mockData.validShortLink });

      expect(response.statusCode).toBe(200);
    });
    test('should have application/json content-type in headers', async () => {
      const response = await request(app).get('/api/resolve').query({ link: mockData.validShortLink });

      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should respond with short link data', async () => {
      const response = await request(app).get('/api/resolve').query({ link: mockData.validShortLink });

      expect(response.body.data).toBeDefined();
    });
  });

  describe('didn`t recieve link parameter', () => {
    test('should respond with 422 status code and provide error message', async () => {
      const response = await request(app).get('/api/resolve').query({ notLink: 'asdasda' });

      expect(response.statusCode).toBe(422);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('link not found', () => {
    test('should respond with 404 status code and provide error message', async () => {
      const response = await request(app).get('/api/resolve').query({ link: mockData.invalidShortLink });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBeDefined();
    });
  });
});
