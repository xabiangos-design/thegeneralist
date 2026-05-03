import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bookStatus = z.enum(["pendiente", "leyendo", "leído", "abandonado"]);

const books = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    status: bookStatus,
    cover: z.string().optional(),
    year: z.number().optional(),
    pages: z.number().optional(),
    language: z.string().optional(),
    isbn: z.string().nullable().optional(),
    featured: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date().optional()
  })
});

export const collections = { books };
