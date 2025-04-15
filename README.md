# 🧪 End-to-End Testing with Cypress – Movie App

This project demonstrates how to write end-to-end tests using **Cypress** for a fictional movie search application. 
The app fetches and displays mocked movie data from a custom API, allowing users to search for movies and view detailed information.

---

## 🚀 Tech Stack

- **Cypress** – for writing and running E2E tests
- **TypeScript** – typed test scripts
- **Mocked API responses** – via static `.json` files
- **Custom commands** – for test reusability and abstraction

---

## 🧪 What We Tested

### 🔍 Home View

- Renders search bar and header elements
- Loads mocked search results from `search-matrix.json`
- Displays correct number of movie cards
- Validates search input behavior

### 🎬 Movie Details View

- Loads movie detail page using `matrix-details.json`
- Displays correct movie metadata (title, year, plot, etc.)
- Verifies presence of ratings and poster image

### 🧰 Custom Cypress Commands

- Defined in `commands.ts` to abstract repeated actions
  - e.g. `cy.mockSearchResults()`, `cy.visitMovieDetails()`

---

## 📁 Project Structure

```bash
cypress/
├── e2e/
│   └── home.cy.ts              # Main test suite
├── fixtures/
│   ├── search-matrix.json      # Mocked movie search results
│   └── matrix-details.json     # Mocked single movie details
├── support/
│   ├── commands.ts             # Custom Cypress commands
│   └── e2e.ts                  # Global setup
```

## 🧠 What I Learned
How to structure and organize a Cypress test suite

Writing readable, maintainable, dynamic E2E tests using TypeScript

Creating and using mocked API responses for predictable tests

Building reusable custom commands in Cypress

Debugging UI flows through DevTools + Cypress test runner
