import { Prisma, PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-lambda';
import { Context } from './context';
import { schema } from './schema';
import Utility from './utils';

const prisma = new PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (event) => {
  console.log(`[query]: ${event.query}, [params]: ${event.params}`);
});

const server = new ApolloServer({
  schema: schema,
  context: ({ express: { req } }): Context => {
    const id = Utility.loadCurrentUser(req.headers.authorization);
    return {
      req,
      prisma,
      currentUser: !!id ? { id } : undefined,
    };
  },
  // introspection: true,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const graphqlHandler = server.createHandler();
