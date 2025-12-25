# anejjar.com

Personal website built with SvelteKit, featuring a clean dark mode UI.

## Tech Stack

- **Framework**: SvelteKit with static site generation
- **Styling**: TailwindCSS with dark mode
- **Content**: Markdown for blog posts
- **Deployment**: Static export ready

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `src/routes/` - Page routes
- `src/lib/components/` - Reusable components
- `src/lib/content/blog/` - Markdown blog posts
- `src/lib/utils/` - Utility functions
- `static/` - Static assets

## Blog Posts

Create markdown files in `src/lib/content/blog/` with frontmatter:

```markdown
---
title: Your Post Title
date: 2024-01-01
description: A brief description
---

Your content here...
```

## License

MIT

