# bigbistudio Shopify Vercel Shop

A modern Shopify storefront built with Next.js and based on [Vercel Shop](https://github.com/vercel/shop).

This project is a customized and actively developed storefront foundation for bigbistudio, with a focus on clean UI, maintainable frontend architecture, performance, and real-world ecommerce development.

> **Status:** 🚧 In active development

## Overview

`bigbistudio-shopify-vercel-shop` is a personal implementation and exploration of Vercel's Shopify storefront approach.

The project starts from the Vercel Shop codebase and evolves it into a more opinionated storefront architecture for bigbistudio, with the goal of building a flexible foundation for modern Shopify headless commerce projects.

The project is intentionally being developed incrementally rather than treated as a finished theme or production-ready template.

## Goals

* Build a modern Shopify storefront with Next.js
* Explore Vercel's approach to headless Shopify commerce
* Establish a clean and maintainable storefront architecture
* Separate Shopify data fetching from presentation and UI concerns
* Build reusable ecommerce components and sections
* Develop a flexible theme structure suitable for different Shopify stores
* Focus on performance, accessibility, SEO, and responsive design
* Learn and evaluate modern Shopify headless commerce patterns

## Tech Stack

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
* [Shopify Customer Account API](https://shopify.dev/docs/api/customer)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vercel](https://vercel.com/)
* [pnpm](https://pnpm.io/)

## Development

### Requirements

* Node.js
* pnpm
* A Shopify development store
* Shopify Storefront API access

### Install

```bash
git clone https://github.com/bigbistudio/bigbistudio-shopify-vercel-shop.git

cd bigbistudio-shopify-vercel-shop

pnpm install
```

### Environment

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure the required Shopify and application environment variables in `.env.local`.

The exact environment variables may evolve during development as the Shopify integration and data-fetching architecture are refined.

### Start development

```bash
pnpm dev
```

The storefront will be available at:

```text
http://localhost:3000
```

## Project Structure

The project separates the original storefront foundation from custom bigbistudio components and application code.

```text
.
├── app/                  # Next.js application routes
├── bigbistudio/          # Custom bigbistudio components and storefront UI
├── components/           # Shared components from the storefront foundation
├── lib/                  # Shopify and application utilities
├── public/               # Static assets
├── styles/               # Global styles and design tokens
├── graphql/              # GraphQL queries and generated types
└── ...
```

### `bigbistudio/`

The `bigbistudio/` directory contains **new custom components developed for this project**.

It is the primary area for bigbistudio-specific UI and storefront implementation, allowing custom work to remain clearly separated from the original Vercel Shop code.

As the project evolves, new storefront sections, components, and design patterns can be added here without unnecessarily modifying the underlying foundation.

```text
bigbistudio/
├── components/
├── sections/
├── ...
```

The exact structure inside `bigbistudio/` may evolve as the storefront architecture develops.

## Development Roadmap

The project is being developed incrementally.

### v0.1 — Foundation

* Initialize the storefront
* Configure Shopify Storefront API
* Configure development environment
* Define project architecture
* Establish design tokens
* Configure Tailwind CSS
* Set up global layout and typography
* Configure SEO and metadata
* Clean up the original Vercel Shop foundation

### v0.2 — Storefront Shell

* Header
* Navigation
* Mobile navigation
* Footer
* Global container and layout
* Storefront loading states

### v0.3 — Storefront Pages

* Homepage
* Collection pages
* Product pages
* Cart
* Search
* 404 / not-found experience

### v0.4 — Theme Sections

* Hero
* Promotional banners
* Collection grids
* Featured products
* Product grids
* Editorial sections
* Newsletter
* Additional reusable storefront sections

### Future

* Customer accounts
* Advanced search and filtering
* Cart and checkout improvements
* Shopify Markets considerations
* Performance optimization
* Accessibility improvements
* Structured data and SEO
* Analytics
* Production deployment
* Additional reusable commerce patterns

## Architecture

The project follows a few core principles.

### Shopify as the commerce backend

Shopify remains responsible for commerce functionality and data, while Next.js provides the storefront experience.

```text
Shopify
   │
   │ Storefront API
   ▼
Next.js
   │
   ├── Data
   ├── Routes
   ├── Components
   └── UI
   │
   ▼
Vercel
```

### Clear data boundaries

Shopify data fetching is kept separate from presentation wherever practical.

This makes it easier to:

* understand where data comes from
* reuse storefront components
* change queries without rewriting UI
* test components independently
* evolve the storefront architecture over time

### Theme-oriented frontend

The storefront is being developed with a theme-oriented mindset: reusable sections, predictable layout primitives, consistent design tokens, and components that can be adapted to different commerce experiences.

## Based on Vercel Shop

This project is based on [Vercel Shop](https://github.com/vercel/shop), Vercel's open-source Shopify storefront built with Next.js.

The original project provides the foundation for this implementation. This repository is independently developed and is intended for experimentation, learning, customization, and building a more opinionated storefront architecture.

For the original project, see:

* [Vercel Shop](https://github.com/vercel/shop)
* [Vercel Commerce](https://vercel.com/templates/next.js/nextjs-commerce)

## Design Principles

The storefront is being developed around:

* **Clarity** — simple interfaces and predictable navigation
* **Performance** — fast pages and efficient data access
* **Accessibility** — usable interfaces across devices and abilities
* **Maintainability** — clear architecture and reusable components
* **Consistency** — shared design tokens and UI patterns
* **Progressive enhancement** — build a solid foundation before adding complexity

## Status

This project is **not finished**.

APIs, architecture, components, naming, and implementation details may change as development continues.

It should currently be considered a **development project and learning/reference implementation**, not a production-ready Shopify theme or starter.

## License

This project follows the license of the original Vercel Shop project where applicable. See [`LICENSE`](./LICENSE) for details.

---

Built and maintained by [bigbistudio](https://bigbistudio.com).
