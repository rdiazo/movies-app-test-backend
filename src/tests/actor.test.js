const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors you must bring all the actors', async () => {
    const res = await request(app).get('/actors');
    //console.log(res.body);
    expect(res.status).toBe(200);
});

test('POST /actor/ create an actor', async () => {
  const body = {
      firstName: "Maribel",
      lastName: "Zambrano",
      nationality: "Venezolana",
      image: "https://th.bing.com/th/id/OIP.1pMotA5UJ0HM1Aaf0euODAHaJ4?rs=1&pid=ImgDetMain",
      birthday: "1975/11/08"
  }
 
  const res = await request(app).post('/actors').send(body);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);
});

test('PUT /actor/:id must update an actor', async () => {
  const body = {
      firstName: "Gladiuska",
      lastName: "Acosta",
      nationality: "Venezolana",
      image: "https://th.bing.com/th/id/OIP.p2xywOs13eB1O3SAS-bsqAHaI0?rs=1&pid=ImgDetMain",
      birthday: "1975/11/08"
  }
  const res = await request(app).put(`/actors/${id}`).send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
});

test('DELETE /actors/:id must remove an actor', async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});