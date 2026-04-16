# AutomationPracticePlaywright

## Overview
This project is an automated testing framework built with Playwright and TypeScript. It is designed for end-to-end testing of web applications, focusing on modular, maintainable, and scalable test cases.

## Features
- **Authentication Test Cases**: Includes login and signup scenarios.
- **Modular Structure**: Organized with page objects, fixtures, helpers, and test data for easy maintenance and scalability.
- **Playwright Reporting**: Generates detailed HTML reports for test runs.

## Project Structure
```
├── src/
│   ├── components/         # Browser setup and utilities
│   ├── config/             # Environment configuration
│   ├── fixture/            # Playwright fixtures
│   ├── helpers/            # Helper functions and actions
│   ├── pages/              # Page Object Models (POM)
│   ├── testdata/           # Test data (JSON)
│   └── utils/              # Constants and utilities
├── tests/
│   ├── auth/               # Authentication test cases
│   └── example.spec.ts     # Example test
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
└── report/                 # Test reports
```

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run tests**
   ```bash
   npx playwright test
   ```
3. **View reports**
   - After running tests, open the HTML report:
     ```bash
     npx playwright show-report
     ```

## Current Test Coverage
- **Authentication**: Login and registration scenarios are implemented.
- **Planned**: Additional test cases such as add-to-cart and other e-commerce flows will be added soon.

## Contributing
- Follow the modular structure for adding new test cases.
- Place new page objects in `src/pages/` and new test files in `tests/`.
- Use fixtures and helpers for reusable logic.

## License
MIT
