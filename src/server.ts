import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import scalarUI from '@scalar/fastify-api-reference';
import { fastify } from 'fastify';
import { createUserRoute } from './routes/create-user-route.ts';
import { getUsersRoute } from './routes/get-users-route.ts';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifySwagger, {
  openapi: {
    info: { title: 'Example API Docs', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

app.get('/openapi.json', async (request, reply) => {
  return app.swagger();
});

app.register(createUserRoute);
app.register(getUsersRoute);

app.register(scalarUI, {
  routePrefix: '/docs',
});

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333');
});
