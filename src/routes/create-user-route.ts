import { FastifyPluginAsync } from 'fastify';

export const createUserRoute: FastifyPluginAsync = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        description: 'Create an user',
        tags: ['Users'],
        summary: 'Create a new user',
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            name: { type: ['string', 'null'], maxLength: 100 },
            email: { type: 'string', format: 'email' },
          },
          examples: [
            { name: 'John Doe', email: 'john.doe@email.com' },
            {
              name: 'Jane Smith',
              email: 'jane.smith@email.com',
            },
          ],
        },

        response: {
          201: {
            description: 'User created successfully',
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: ['string', 'null'], maxLength: 100 },
              email: { type: 'string', format: 'email' },
            },
            examples: [
              { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
              {
                id: 2,
                name: 'Jane Smith',
                email: 'jane.smith@email.com',
              },
            ],
          },
          400: {
            description: 'Invalid request body',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          409: {
            description: 'User email already exists',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      return { id: 1, name: 'John Doe', email: 'john.doe@email.com' };
    }
  );
};
