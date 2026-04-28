# Slicedo

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

**Slicedo** is a task management web application built with React and Redux Toolkit. It lets you organize your to-dos into categories, keeping your work, personal tasks, and priorities clearly separated.

When you open the app, you land on a two-panel layout: a sidebar on the left listing all your categories, and a main area on the right showing the to-dos for whichever category you select. On mobile the sidebar and the to-do view stack on top of each other, and a close button lets you navigate back to the category list.

The app ships with three default categories — **My Day**, **Important**, and **Tasks** — and lets you create as many custom categories as you need. Each custom category gets a name you choose and an emoji icon picked from a full emoji picker, so you can tell your categories apart at a glance.

Inside any category you can:

- **Add** a new to-do by typing its content and submitting the form.
- **Edit** an existing to-do to correct or update its text.
- **Delete** a to-do permanently from the category.
- **Mark a to-do as done or undone** — completed items are visually distinguished with a strikethrough style so you always know what is left.
- **Move a to-do to the Important category** with a single click, without having to recreate it manually.

Every action — adding, editing, deleting, marking as done, or moving a to-do — triggers a brief feedback alert at the bottom of the screen that confirms what just happened and whether it succeeded or failed.

All data is persisted to `localStorage` automatically, so your categories and to-dos survive page refreshes without any backend or account required.

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
"uuid": "^14.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
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

[`https://www.diegolibonati.com.ar/#/project/slicedo`](https://www.diegolibonati.com.ar/#/project/slicedo)

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
