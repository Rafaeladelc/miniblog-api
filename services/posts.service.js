import pool from '../db/config.js';

export async function getAllPosts() {
  const result = await pool.query('SELECT * FROM posts ORDER BY id');
  return result.rows;
}

export async function getPostById(id) {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createPost({ title, content, author_id, published }) {
  const result = await pool.query(
    'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, author_id, published ?? false]
  );
  return result.rows[0];
}

export async function updatePost(id, { title, content, author_id, published }) {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, author_id = $3, published = $4 WHERE id = $5 RETURNING *',
    [title, content, author_id, published ?? false, id]
  );
  return result.rows[0] || null;
}

export async function deletePost(id) {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
}

export async function getPostsByAuthorId(authorId) {
  const result = await pool.query('SELECT * FROM posts WHERE author_id = $1 ORDER BY id', [authorId]);
  return result.rows;
}