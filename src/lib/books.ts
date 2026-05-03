import type { Book, BookListItem } from "@/lib/types";

export function getBookSlug(book: Book) {
  return book.data.slug ?? book.id;
}

export function formatDateForData(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function normalizeIsbn(isbn?: string | null) {
  return isbn?.replace(/[^0-9Xx]/g, "") ?? "";
}

export function getBookCoverUrl(cover?: string, isbn?: string | null) {
  if (cover) return cover;

  const cleanIsbn = normalizeIsbn(isbn);
  if (!cleanIsbn) return undefined;

  return `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg?default=false`;
}

export function toBookListItem(book: Book): BookListItem {
  return {
    id: book.id,
    slug: getBookSlug(book),
    title: book.data.title,
    author: book.data.author,
    category: book.data.category,
    tags: book.data.tags,
    status: book.data.status,
    cover: getBookCoverUrl(book.data.cover, book.data.isbn),
    year: book.data.year,
    pages: book.data.pages,
    language: book.data.language,
    isbn: book.data.isbn,
    featured: book.data.featured,
    createdAt: formatDateForData(book.data.createdAt),
    updatedAt: book.data.updatedAt
      ? formatDateForData(book.data.updatedAt)
      : undefined
  };
}

export function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
}
