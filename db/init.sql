-- ============================================
-- MiniBlog API - DevSpark
-- Script de inicialización: setup + seed
-- ============================================

-- SETUP: Creación de tablas
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- SEED: Datos de prueba
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);

-- SETUP: Tabla de comments (extra credit)
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER NOT NULL,
  author_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- SEED: Datos de prueba para comments
INSERT INTO comments (content, post_id, author_id) VALUES
('Excelente artículo, muy claro', 1, 2),
('Gracias por la explicación', 1, 3),
('Me gustaría ver un ejemplo con TypeScript', 3, 2);