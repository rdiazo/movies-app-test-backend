const request = require('supertest');
const app = require('../app');

let id;

test('GET /movies debe traer todos las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
});

test('POST /movies/crear una pelicula', async () => {
    const body = {
        name: "Papita, maní, toston",
        image: "https://th.bing.com/th/id/R.96430d3f82d4e2f051b64dbdb3a1ed5d?rik=Vyq%2bRjBTMk6ZPw&pid=ImgRaw&r=0",
        synopsis: "Comedia venezolana sobre la eterna rivalidad de los fanaticos de dos equipos de beisbol",
        releaseYear: "2013",
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /movies:id debe actualizar una pelicula', async () => {
    const body = {
        name: "Papita, maní, toston",
        image: "https://th.bing.com/th/id/R.96430d3f82d4e2f051b64dbdb3a1ed5d?rik=Vyq%2bRjBTMk6ZPw&pid=ImgRaw&r=0",
        synopsis: "Comedia venezolana sobre la eterna rivalidad de los fanaticos de dos equipos de beisbol",
        releaseYear: "2012",
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /movies/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});