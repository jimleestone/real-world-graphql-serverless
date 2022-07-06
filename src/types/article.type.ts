import { inputObjectType, objectType } from 'nexus';
import { Context } from '../context';

const Article = objectType({
  name: 'Article',
  definition(t) {
    t.nonNull.string('slug');
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('body');
    t.nonNull.int('favoritesCount');
    t.nonNull.field('createdAt', { type: 'DateTime' });
    t.nonNull.field('updatedAt', { type: 'DateTime' });
    t.field('author', {
      type: 'Profile',
      resolve: ({ slug }, _, context: Context) => {
        return context.prisma.article
          .findUnique({
            where: { slug },
          })
          .author();
      },
    });
    t.nonNull.boolean('favorited', {
      resolve: async ({ slug }, _, context: Context) => {
        if (!context.currentUser) return false;
        const favorites = await context.prisma.article
          .findUnique({
            where: { slug },
          })
          .favoritedBy({ select: { favoritedBy: true }, where: { userId: context.currentUser.id } });
        return !!favorites.length;
      },
    });
    t.list.nonNull.string('tagList', {
      resolve: async ({ slug }, _, context: Context) => {
        const tags = await context.prisma.article
          .findUnique({
            where: { slug },
          })
          .tags({ select: { tag: { select: { name: true } } } });
        return tags.map((t) => t.tag.name);
      },
    });
    t.list.nonNull.field('comments', {
      type: 'Comment',
      resolve: ({ slug }, _, context: Context) => {
        return context.prisma.article
          .findUnique({
            where: { slug },
          })
          .comments({ where: { del: false } });
      },
    });
  },
});

const Articles = objectType({
  name: 'Articles',
  definition(t) {
    t.nonNull.int('articlesCount');
    t.list.nonNull.field('articles', { type: 'Article' });
  },
});

const ArticleInput = inputObjectType({
  name: 'ArticleInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('body');
    t.list.nonNull.string('tagList');
  },
});

export default [Article, Articles, ArticleInput];
