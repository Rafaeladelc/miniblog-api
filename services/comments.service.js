import pool from '../db/config.js';

export async function getCommentsByPostId(postId) {
  const result = await pool.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY id', [postId]);
  return result.rows;
}

export async function createComment({ content, post_id, author_id }) {
  const result = await pool.query(
    'INSERT INTO comments (content, post_id, author_id) VALUES ($1, $2, $3) RETURNING *',
    [content, post_id, author_id]
  );
  return result.rows[0];
}