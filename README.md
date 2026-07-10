# ParaBank Automated Test Suite (Playwright & TypeScript)

This repository contains a professional end-to-end (E2E) GUI and API test automation suite built for the **ParaBank** demo banking application. The project is structured using the industry-standard **Page Object Model (POM)** pattern to ensure clean, maintainable, and scalable test code.

---

## 🚀 Key Features & Test Coverage

### 🖥️ GUI Automation (6 Scenarios / 18 Tests)
* **User Authentication:** Robust login, negative test scenarios (empty/invalid fields), and logout cycles.
* **Registration:** End-to-end user registration with dynamic test data.
* **Financial Operations:** Transferring funds between accounts and processing bill payments.
* **Account Overview:** Dynamic validation of transaction details and history.

### 🔌 API Automation (5 Test Suites / 15 Tests)
* **Full CRUD Lifecycle:** POST, GET, PUT, and DELETE requests validated via `JSONPlaceholder`.
* **Query Parameters:** Advanced filtering capabilities tested via `/comments?postId=1`.
* **Negative & Error Handling:** Validating `404 Not Found` behaviors and boundary scenarios.
* **Performance SLA Tests:** Ensuring API response times stay strictly below a custom limit (< 800ms).

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Playwright (Latest)
* **Language:** TypeScript
* **Design Pattern:** Page Object Model (POM)
* **Execution Strategy:** Multi-browser support (Chromium, Firefox, WebKit) with parallel execution optimized for server load (`--workers=1` for GUI stability).

---

## 🏃 How to Run the Tests Locally

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the dependencies:
```bash
npm install