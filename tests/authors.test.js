import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Authors API', () => {
  it('GET /authors debe devolver status 200 y un array', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
  });

  it('GET /authors/:id debe devolver status 200 con un author existente', async () => {
    const response = await request(app).get('/authors/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

    it('GET /authors/:id debe devolver status 404 con un author inexistente', async () => {
    const response = await request(app).get('/authors/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

    it('POST /authors debe crear un author con datos válidos', async () => {
    const newAuthor = {
      name: 'Test Usuario',
      email: 'test.usuario@example.com',
      bio: 'Author de prueba para testing'
    };

    const response = await request(app).post('/authors').send(newAuthor);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(newAuthor.email);

    // Limpieza: borramos el author recién creado para no dejar rastro
    await request(app).delete(`/authors/${response.body.id}`);
  });

    it('POST /authors debe devolver status 409 con email duplicado', async () => {
    const response = await request(app).post('/authors').send({
      name: 'Otro Nombre',
      email: 'carlos@example.com',
      bio: 'Intento de duplicar email existente'
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

    it('DELETE /authors/:id debe devolver status 404 con un id inexistente', async () => {
    const response = await request(app).delete('/authors/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});