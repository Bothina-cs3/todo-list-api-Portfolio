const request = require('supertest');
const app = require('../server');

describe('Task Routes', () => {
  test('Create a new task', async () => {
    const token = 'your-valid-jwt-token';
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test description' });
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });
});

