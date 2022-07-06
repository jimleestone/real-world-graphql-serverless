import { inputObjectType, objectType } from 'nexus';
import { Context } from '../context';

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('body');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.field('author', {
      type: 'Profile',
      resolve: ({ id }, _, context: Context) => {
        return context.prisma.comment
          .findUnique({
            where: { id },
          })
          .author();
      },
    });
  },
});

const CommentInput = inputObjectType({
  name: 'CommentInput',
  definition(t) {
    t.nonNull.string('body');
  },
});

export default [Comment, CommentInput];
