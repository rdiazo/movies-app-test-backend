const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

let id;

test('GET /movies you must bring all the movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
});

test('POST /movies/ create a movie', async () => {
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

test('PUT /movies:id must update a movie', async () => {
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

test('POST /movies/:id/actors You must insert the actors of a movie', async () => { 
    const actor = await Actors.create({ 
        firstName: "Maribel",
        lastName: "Zambrano",
        nationality: "Venezolana",
        image: "https://th.bing.com/th/id/OIP.1pMotA5UJ0HM1Aaf0euODAHaJ4?rs=1&pid=ImgDetMain",
        birthday: "1975/11/08"
     });
    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Maribel");
});

test('POST /movies/:id/directors must insert the directors of a movie', async () => { 
    const director = await Directors.create({ 
        firstName: "Luis Carlos",
        lastName: "Hueck",
        nationality: "Venezolano",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg/800px-Luis_Carlos_Hueck_director_de_cine_de_Venezuela.jpg",
        birthday: "1977/05/05"
     });
    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].lastName).toBe("Hueck");
});

test('POST /movies/:id/genres You must insert the genres of a movie', async () => { 
    const genre = await Genres.create({ 
        name: "Action"
     });
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Action");
});


test('DELETE /movies/:id must delete a movie', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});

