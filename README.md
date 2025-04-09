# Tic Tac Toe Game

A simple Tic Tac Toe game built with HTML, CSS, and JavaScript, using Grunt for task automation.

## Features

- Classic Tic Tac Toe gameplay
- Responsive design
- Player turn indicator
- Win detection
- Draw detection
- Reset game functionality

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd tic-tac-toe
```

3. Install dependencies:
```bash
npm install
```

## Development

To start development with live reload:
```bash
npm start
```

This will:
- Clean the dist directory
- Minify CSS, JavaScript, and HTML files
- Copy assets
- Watch for changes and rebuild automatically

## Build

To build the project for production:
```bash
npm run build
```

This will create a `dist` directory with optimized files ready for deployment.

## Project Structure

```
.
├── src/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── index.html
├── Gruntfile.js
├── package.json
└── README.md
```

## Grunt Tasks

- `cssmin`: Minifies CSS files
- `uglify`: Minifies JavaScript files
- `htmlmin`: Minifies HTML files
- `clean`: Cleans the dist directory
- `copy`: Copies static assets
- `watch`: Watches for file changes

## License

This project is licensed under the MIT License - see the LICENSE file for details. 