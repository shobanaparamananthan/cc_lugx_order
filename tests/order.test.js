const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('Order Service Integration Tests', () => {

  it('GET /health should return service status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('Order Service is running');
  });

  it('POST /orders should create a new order', async () => {
    const res = await request(app).post('/orders').send({
      customer_name: "Test Customer",
      games: "Game1, Game2",
      total_price: 120.50
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Order created');
    expect(res.body).toHaveProperty('id');
  });

  it('GET /orders should return order list', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(() => {
    db.end(); // Close DB connection
  });

});
