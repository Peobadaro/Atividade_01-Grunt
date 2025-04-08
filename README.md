# Grunt Project Setup

This project demonstrates the use of Grunt for automating LESS compilation and CSS optimization tasks.

## Project Structure

```
├── src/
│   └── less/
│       └── styles.less
├── dist/
│   └── css/
│       ├── styles.css
│       └── styles.min.css
├── Gruntfile.js
└── package.json
```

## Features

- LESS compilation with source maps
- CSS minification
- Automatic file watching
- Development and production builds
- Clean task for removing generated files

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Development Workflow

- The `npm start` command will:
  - Clean the dist directory
  - Compile LESS files with source maps
  - Watch for changes in LESS files

- The `npm run build` command will:
  - Clean the dist directory
  - Compile and minify LESS files for production

## LESS Features Used

- Variables
- Mixins
- Nested rules
- Color functions
- Import statements
- Google Fonts integration 