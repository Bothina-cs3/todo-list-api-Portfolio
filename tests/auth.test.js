const request = require('supertest');
const app = require('../server');
//const mongoose = require('mongoose');

describe('Auth Routes', () => {
  //afterAll(async () => {
  //  await mongoose.connection.close();
 // });

  test('User registration works', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@test.com', password: '123456' });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });
});

