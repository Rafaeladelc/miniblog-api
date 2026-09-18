import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiniBlog API',
      version: '1.0.0',
      description: 'API REST para gestionar authors y posts - Proyecto Integrador 2, SoyHenry Módulo 2 (DevSpark)',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
      {
        url: 'https://miniblog-api-production-c382.up.railway.app',
        description: 'Servidor de producción (Railway)',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;