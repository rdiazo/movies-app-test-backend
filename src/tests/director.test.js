const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
});

test('POST /directors/crear un director', async () => {
    const body = {
        firstName: "Luis C",
        lastName: "Hueck",
        nationality: "Venezolano",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg/800px-Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg",
        birthday: "1977/05/05"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT //directors:id debe actualizar un director', async () => {
    const body = {
        firstName: "Luis Carlos",
        lastName: "Hueck",
        nationality: "Venezolano",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg/800px-Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg",
        birthday: "1977/05/05"
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
