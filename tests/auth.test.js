const request = require('supertest');
const app = require('../app'); 

describe('Auth API', () => {
  it('harus berhasil register user baru', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Indah',
        email: 'indah@example.com',
        password: 'secret123'
      });

    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });
});
