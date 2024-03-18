const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres must bring all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
});

test('POST / create a genre', async () => {
    const body = {
        name: "Terror",
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /genres/:id must update a genre', async () => {
    const body = {
        name: "Acction"
    }
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /genres/:id must eliminate a genre', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});