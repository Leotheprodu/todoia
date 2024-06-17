import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()),

    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  posts: postsCollection,
};
