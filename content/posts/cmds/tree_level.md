+++
date = '2025-06-24T10:25:26-05:00'
draft = false
title = 'print directory structure'
authors = ["diego"]
description = "cmd to print directory structure"
tags= ["cli", "cmd"]
categories=["Programming"]
+++

Quick tip to print directory structure in the command line.

Requires `tree` library, usually comes with linux distros.

```bash
tree -L 6 -I '.next|node_modules'
```

`-L` flag is number of levels

`-I` Ignore folders

Will print the following:

```bash
.
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── restaurant
│   │       └── [slug]
│   │           └── page.tsx
│   ├── components
│   ├── data
│   │   └── posts
│   │       └── best-tacos.md
│   ├── lib
│   │   ├── markdownToHtml.ts
│   │   └── posts.ts
│   └── styles
│       └── pages
├── tailwind.config.js
└── tsconfig.json
```

more info in the following [link](https://linux.die.net/man/1/tree).