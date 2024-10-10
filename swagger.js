const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos y Categorías',
      version: '1.0.0',
      description: 'API para gestionar productos y categorías',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Cambia esto por el URL de tu servidor si es necesario
      },
    ],
  },
  apis: ['./routes/*.js'], // Archivos donde Swagger buscará los comentarios de documentación
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
