// import { FastifyPluginAsync } from 'fastify';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/users',
    {
      schema: {
        description: 'Create an user',
        tags: ['Users'],
        summary: 'Create a new user',
        security: [{ bearerAuth: [] }],

        // Zod ainda não suporta examples
        body: z
          .object({
            name: z.string().max(100).nullable().optional(),
            email: z.email(),
          })
          .describe('Request body to create a new user'),
        // body: {
        //   type: 'object',
        //   required: ['email'],
        //   properties: {
        //     name: { type: ['string', 'null'], maxLength: 100 },
        //     email: { type: 'string', format: 'email' },
        //   },
        //   examples: [
        //     { name: 'John Doe', email: 'john.doe@email.com' },
        //     {
        //       name: 'Jane Smith',
        //       email: 'jane.smith@email.com',
        //     },
        //   ],
        // },

        response: {
          201: z
            .object({
              id: z.uuid(),
              name: z.string().max(100).nullable(),
              email: z.email(),
            })
            .describe('User created successfully'),
          400: z
            .object({
              message: z.string(),
            })
            .describe('Invalid request body'),
          409: z
            .object({
              message: z.string(),
            })
            .describe('User email already exists'),
        },
        // response: {
        //   201: {
        //     description: 'User created successfully',
        //     type: 'object',
        //     properties: {
        //       id: { type: 'string', format: 'uuid' },
        //       name: { type: ['string', 'null'], maxLength: 100 },
        //       email: { type: 'string', format: 'email' },
        //     },
        //     examples: [
        //       { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
        //       {
        //         id: 2,
        //         name: 'Jane Smith',
        //         email: 'jane.smith@email.com',
        //       },
        //     ],
        //   },
        //   400: {
        //     description: 'Invalid request body',
        //     type: 'object',
        //     properties: {
        //       message: { type: 'string' },
        //     },
        //   },
        //   409: {
        //     description: 'User email already exists',
        //     type: 'object',
        //     properties: {
        //       message: { type: 'string' },
        //     },
        //   },
        // },
      },
    },
    async (req, res) => {
      return { id: '', name: 'John Doe', email: 'john.doe@email.com' };
    }
  );
};
