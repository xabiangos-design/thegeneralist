import type { CollectionEntry } from "astro:content";

export type Book = CollectionEntry<"books">;
export type BookStatus = Book["data"]["status"];

export type BookListItem = {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  status: BookStatus;
  cover?: string;
  year?: number;
  pages?: number;
  language?: string;
  isbn?: string | null;
  featured?: boolean;
  createdAt: string;
  updatedAt?: string;
};
