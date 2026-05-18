# NordShop — Premium E-commerce Store

Live demo: http://64.188.63.171:3220  
Repo: https://github.com/pskudarnov/nordshop-store

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- ESLint
- Prettier
- lucide-react
- clsx

## Features

- Product catalog with mock data
- Filters: category, featured, in-stock
- Sorting: featured, price asc/desc, rating
- Search by product name
- Product detail pages with quantity selector and related products
- Cart page with item controls and summary totals
- Responsive mobile-first UI
- Accessibility basics (landmarks, labels, button semantics, focus styles)
- SEO metadata + OpenGraph/Twitter + robots + sitemap

## Pages

- `/`
- `/products`
- `/products/[slug]`
- `/cart`

## Architecture

- `src/data/*`: typed mock products and categories
- `src/lib/*`: formatting and product helpers
- `src/store/cart-store.ts`: Zustand cart state
- `src/components/*`: layout, landing, products, cart, ui
- `src/app/*`: routes, metadata, robots and sitemap

## Mock data

- 10 products across lighting, accessories, audio, furniture and power
- Includes `featured`, `inStock`, `rating`, `features[]`, and gradient image themes

## How to run

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run format`
- `npm run format:check`

## Deployment notes

- PM2 process: `nordshop-store`
- Port: `3220`
- Start command:

```bash
PORT=3220 pm2 start npm --name nordshop-store -- start
```

## Production smoke-check

После деплоя выполнить:

```bash
npm run smoke:assets -- https://nordshop.pavel-skudarnov.ru
```

Это защищает от ситуации, когда HTML ссылается на stale Next.js CSS/JS assets.

## What this project demonstrates

- Product catalog composition
- Filtering and sorting UI
- Product detail pages
- Cart state management
- Responsive e-commerce UX
- TypeScript data modeling
- Accessibility and SEO basics
