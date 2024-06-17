# Astro & Tailwind CSS Starter Kit originally by lexingtonthemes.com and modified by [Leonardo Serrano](https://leonardoserrano.site/) for personal use

adding some features and integrations like eslint, react, a simple api for save emails for a newsletter.

## Template Integrations

- @astrojs/tailwind - https://docs.astro.build/en/guides/integrations-guide/tailwind/
- @astrojs/sitemap - https://docs.astro.build/en/guides/integrations-guide/sitemap/
- @astrojs/mdx - https://docs.astro.build/en/guides/markdown-content/
- @astrojs/rss - https://docs.astro.build/en/guides/rss/

## Basics

- all the basic config is in the constants.ts file in ./src folder
- add a image in the public folder to default image for the site with the name mainImg.jpg
- add the env variables in the .env file , this variables is used in the API for the newsletter that is connected to Hubspot, remember first create a custom property called `subscribe_to`, its a array of strings, with the values of our newsletters.
- this project use hybrid rendering, and its configured to release in vercel. remember add the env variables in the vercel dashboard.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## Want to learn more?

Feel free to check Astros [documentation](https://docs.astro.build)
