# Playwright UI & API Automation Scaffold

This repository is a minimal scaffold for learning Playwright for both UI and API automation using TypeScript.

Prerequisites
- Node.js 18+ (LTS)
- Git (optional)

Quick setup
1. Install dependencies:

```powershell
npm install
```

2. Install Playwright browsers:

```powershell
npx playwright install
```

Run tests
- Run all tests:

```powershell
npm test
```

- Run only UI tests:

```powershell
npm run test:ui
```

- Run only API tests:

```powershell
npm run test:api
```

Debugging (PowerShell)
- To run Playwright in debug mode in PowerShell:

```powershell
$env:PWDEBUG=1; npx playwright test --debug
```

Files of interest
- `playwright.config.ts` — Playwright config and project definitions
- `tsconfig.json` — TypeScript configuration
- `tests/ui/example.spec.ts` — simple UI test example
- `tests/api/example.api.spec.ts` — simple API test example

Learning Tasks
Follow these progressive tasks to master Playwright test automation.

**Setup (Task 0)**
Fix PowerShell execution policy so npm commands work directly:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

**Task 1: Add a second UI test** (Beginner)
- Create a new test in `tests/ui/`
- Navigate to `https://example.com`
- Verify the page title contains `'Example'`
- Use: `page.goto()`, `expect()`, `toHaveTitle()`
- Run: `npm run test:ui`

**Task 2: Write a POST API test** (Beginner)
- Add a test in `tests/api/`
- POST to `https://jsonplaceholder.typicode.com/posts` with body: `{ title: 'Test', body: 'Learning', userId: 1 }`
- Verify response status is 201 and body has an `id`
- Use: `request.post()`, `response.json()`, `expect()`
- Run: `npm run test:api`

**Task 3: Create a Page Object** (Intermediate)
- Create `src/pages/PlaywrightPage.ts` with a class
- Add methods: `goto()`, `getTitle()`, `clickButton(selector)` optional
- Refactor `tests/ui/example.spec.ts` to use this Page Object
- Learn: class structure, async/await, encapsulation

**Task 4: Add API fixtures & data** (Intermediate)
- Create a helper or fixture for API base URLs
- Write a parameterized test that GETs posts with IDs: 1, 2, 3
- Use: `test.describe()`, data arrays, loops
- Run: `npm run test:api`

**Task 5: Error handling & negative tests** (Intermediate)
- Add tests that verify error responses (POST missing fields, GET invalid ID)
- Verify response codes (400, 404) and error messages
- Learn: negative testing patterns

Notes & next steps
- You can add page object models under `src/` and helper modules.
- Consider adding GitHub Actions and ESLint/Prettier configs for CI and code quality.
