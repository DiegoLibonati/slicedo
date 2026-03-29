# ToDo React Redux

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

I made a web application that serves to save things to do. In addition we have a sidebar where you will find our default categories: My Day, Important and Tasks. There is a button to add a new custom category in which we can put the name we want and an emoji of our choice for that category. Within each category you will be able to create, edit and delete all of them. When marking an all as done it will change color. Each action of the user will show an alert.

## Technologies used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3

## Libraries used

#### Dependencies

```
"@reduxjs/toolkit": "^2.5.0"
"animate.css": "^4.1.1"
"emoji-picker-react": "^3.6.2"
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-icons": "^4.4.0"
"react-redux": "^9.2.0"
"redux": "^5.0.1"
"uuid": "^11.0.3"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/ToDo-React-Redux`](https://www.diegolibonati.com.ar/#/project/ToDo-React-Redux)

## Video

https://user-images.githubusercontent.com/99032604/199861233-0a2873d1-06fd-495c-a0d3-6ea432c885a5.mp4

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Known Issues

None at the moment.
