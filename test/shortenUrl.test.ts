import request from 'supertest';
import app from '../src/app';

//this shouldn't be tested on production database, casue it's an additive action
//so I'd have something like this
/*
if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(config.testDbParams);
} else {
  sequelize = new Sequelize(config.productionDbParams);
} 
*/ 
//but I feel like I don't have enough time left to implement it =)

describe('POST /api/shorten', () => {
  describe('recieved a valid link', () => {
    test('should respond with 200 status code', async () => {
      const response = await request(app).post('/api/shorten').send({
        link: 'https://google.com'
      });
      expect(response.statusCode).toBe(200);
    });
    test('should have application/json content-type in headers', async () => {
      const response = await request(app).post('/api/shorten').send({
        link: 'https://google.com'
      });
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    test('should respond with short link data', async () => {
      const response = await request(app).post('/api/shorten').send({
        link: 'https://google.com'
      });
      expect(response.body.data).toBeDefined();
    });
  });

  describe('recieved invalid link', () => {
    test('should respond with 422 status code and provide error message', async () => {
      const response = await request(app).post('/api/shorten').send({
        link: 'some-crapp'
      });
      expect(response.statusCode).toBe(422);
      expect(response.body.message).toBeDefined();
    });
  });
});
