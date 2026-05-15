# datdiego.github.io

Personal blog and project hub for Diego Alducin, Ph.D. — [datdiego.github.io](https://datdiego.github.io/).

Built on [Astro](https://astro.build/) (originally scaffolded from the [AstroPaper](https://github.com/satnaing/astro-paper) theme).

## Local development

```sh
pnpm install
pnpm dev
```

The site builds at `http://localhost:4321`.

## Build

```sh
pnpm build
```

Output goes to `dist/`. Deployment runs from `.github/workflows/deploy.yml` on push to `main`.

## Structure

- `src/data/blog/` — markdown posts
- `src/pages/` — routes (index, about, posts, tags, archives, privacy)
- `src/components/` — Astro components
- `src/config.ts` — site metadata
- `src/constants.ts` — social/share link config
- `public/` — static assets (favicons, OG images, post images)
