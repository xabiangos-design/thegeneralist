# Biblioteca personal con Astro

Proyecto estático para gestionar una biblioteca personal editando archivos Markdown. No incluye login, base de datos, backend ni panel de administración: el contenido vive en `src/content/books`.

## Decisiones simples

- Astro genera todo como sitio estático.
- Tailwind CSS se integra con Vite usando `@tailwindcss/vite`.
- Cada libro es un archivo `.md` dentro de una Content Collection.
- El buscador y los filtros usan JavaScript ligero en el navegador, sin React, Vue ni Svelte.
- Las portadas pueden ser archivos locales en `public/covers` o URLs externas.

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Astro mostrará la URL local, normalmente `http://localhost:4321`.

## Comprobar y compilar

```bash
npm run check
npm run build
```

La salida estática se genera en `dist`.

## Añadir un libro

Crea un archivo Markdown en `src/content/books`, por ejemplo:

```md
---
title: "Mi nuevo libro"
author: "Nombre del autor"
category: "Novela"
tags: ["favoritos", "pendiente"]
status: "pendiente"
year: 2024
pages: 320
language: "Español"
isbn: "978-0000000000"
featured: false
createdAt: 2026-05-03
updatedAt: 2026-05-03
---

Descripción, reseña o notas personales del libro.
```

Campos obligatorios: `title`, `author`, `category`, `tags`, `status` y `createdAt`.

`status` solo acepta estos valores:

- `pendiente`
- `leyendo`
- `leído`
- `abandonado`

## Categorías y etiquetas

No hay un archivo central de categorías o etiquetas. La página las calcula automáticamente desde los libros existentes. Para crear una categoría o etiqueta nueva, úsala en el frontmatter de cualquier libro.

## Slugs y rutas

Por defecto, Astro usa el nombre del archivo como identificador. También puedes definir `slug` en el frontmatter si quieres controlar la URL:

```yaml
slug: "mi-url-personalizada"
```

La página de detalle quedará en `/books/mi-url-personalizada/`.

## Portadas automáticas

Si el libro tiene `isbn`, la web intenta mostrar automáticamente la portada desde Open Library:

`https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg?default=false`

Si Open Library no tiene portada para ese ISBN, se muestra una portada neutra generada por la interfaz.

También puedes forzar una portada manual añadiendo `cover` al frontmatter. Puede ser un archivo local en `public/covers` o una URL externa:

```yaml
cover: "/covers/nombre-del-archivo.jpg"
```

## Buscador y filtros

La página principal permite:

- Buscar por título y autor.
- Ignorar mayúsculas, minúsculas y acentos.
- Filtrar por categoría y etiqueta.

Todo ocurre en cliente sin recargar la página.

## Despliegue

Este proyecto funciona como sitio estático en hosting gratuito.

### Vercel

1. Importa el repositorio en Vercel.
2. Framework preset: `Astro`.
3. Build command: `npm run build`.
4. Output directory: `dist`.

### Netlify

1. Importa el repositorio en Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

### Cloudflare Pages

1. Crea un proyecto desde el repositorio.
2. Framework preset: `Astro`.
3. Build command: `npm run build`.
4. Build output directory: `dist`.

## Estructura

```text
src/
  components/
    BookCard.astro
    BookFilters.astro
    EmptyState.astro
    SearchInput.astro
    Tag.astro
  content/
    books/
  layouts/
    BaseLayout.astro
  lib/
    books.ts
    normalize.ts
    types.ts
  pages/
    index.astro
    books/[slug].astro
  styles/
    global.css
```
