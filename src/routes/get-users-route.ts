// import { FastifyPluginAsync } from 'fastify';

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from 'zod';

export const getUsersRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/users',
    {
      schema: {
        description: 'Get a list of users',
        tags: ['Users'],
        summary: 'Get all users',
        querystring: z.object({
          page: z.coerce
            .number()
            .int()
            .min(1)
            .default(1)
            .optional()
            .describe('Page number for pagination'),
        }),
        // querystring: {
        //   type: 'object',
        //   properties: {
        //     page: {
        //       type: 'integer',
        //       description: 'Page number for pagination',
        //       minimum: 1,
        //       default: 1,
        //     },
        //   },
        // },
        response: {
          200: z
            .object({
              data: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string().max(100).nullable(),
                  email: z.email(),
                })
              ),
            })
            .describe('Successful response with a list of users'),
        },
        // response: {
        //   200: {
        //     description: 'Successful response with a list of users',
        //     type: 'object',
        //     properties: {
        //       data: {
        //         type: 'array',
        //         items: {
        //           type: 'object',
        //           required: ['id', 'name', 'email'],
        //           properties: {
        //             id: { type: 'string', format: 'uuid' },
        //             name: { type: ['string', 'null'], maxLength: 100 },
        //             email: { type: 'string', format: 'email' },
        //           },
        //         },
        //         examples: [
        //           [
        //             { id: 1, name: 'John Doe', email: 'john.doe@email.com' },
        //             {
        //               id: 2,
        //               name: 'Jane Smith',
        //               email: 'jane.smith@email.com',
        //             },
        //           ],
        //           [],
        //         ],
        //       },
        //     },
        //   },
        // },
      },
    },
    async (req, res) => {
      return {
        data: [
          { id: '', name: 'John Doe', email: 'john.doe@email.com' },
          { id: '', name: 'Jane Smith', email: 'jane.smith@email.com' },
        ],
      };
    }
  );
};
