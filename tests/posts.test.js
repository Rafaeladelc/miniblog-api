import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Posts API', () => {
  it('GET /posts debe devolver status 200 y un array', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /posts/:id debe devolver status 200 con un post existente', async () => {
    const response = await request(app).get('/posts/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
    it('GET /posts/:id debe devolver status 404 con un post inexistente', async () => {
    const response = await request(app).get('/posts/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
  it('POST /posts debe crear un post con datos válidos', async () => {
    const newPost = {
      title: 'Post de prueba',
      content: 'Contenido de prueba para testing',
      author_id: 1,
      published: false
    };

    const response = await request(app).post('/posts').send(newPost);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newPost.title);

    await request(app).delete(`/posts/${response.body.id}`);
  });
  it('POST /posts debe devolver status 409 con author_id inexistente', async () => {
    const response = await request(app).post('/posts').send({
      title: 'Post con author inválido',
      content: 'Este post no debería crearse',
      author_id: 9999,
      published: false
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /posts/author/:authorId debe devolver los posts de ese author', async () => {
    const response = await request(app).get('/posts/author/1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach(post => {
      expect(post.author_id).toBe(1);
    });
  });
  it('PUT /posts/:id debe devolver status 404 con un id inexistente', async () => {
    const response = await request(app).put('/posts/9999').send({
      title: 'Cualquiera',
      content: 'Cualquiera',
      author_id: 1,
      published: false
    });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
  it('DELETE /posts/:id debe devolver status 404 con un id inexistente', async () => {
    const response = await request(app).delete('/posts/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

});

