let db = require('./../../../model/index');
let request = require('supertest');
const app = require('../../../app');

const productEndpoint = '/Products';

describe('Product Routes', () => {
  it('should test my get Route', async () => {
    const res = await request(app).get(productEndpoint);

    expect(res.statusCode).toEqual(201);
  });
});
