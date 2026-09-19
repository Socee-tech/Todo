# Frontend

### 1. create your react app:

`npm create vite@latest`

vite will ask you several questions.

for example:

Project name:
> 01-components

Select a framework:
> React

Select a variant:
> JavaScript

Then:

`cd 01-components`
`npm install`

### 2. install Tailwind CSS
`npm install tailwindcss @tailwindcss/vite`

Then configure the vite plugin in:  `vite.config.js`

> in the import section import tailwindcss from @tailwindcss/vite, like this:
`import tailwindcss from @tailwindcss/vite`

> Then inside the "defineConfig" add:
`tailwindcss()`

> to your plugins.

> you'll have something like:

import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

  ],
})

> Then in your css entry file, typically:
`src/index.css`
> use:
`@import "tailwindcss";`

> Then finally start the development server:
`npm run dev`

# BACKEND
