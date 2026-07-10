import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // A mappa, ahol a tesztjeid laknak
  testDir: './TypeScript',

  // Maximális idő, amit egy teszt futhat (30 másodperc)
  timeout: 30000,

  expect: {
    timeout: 5000
  },

  // Párhuzamos futás engedélyezése
  fullyParallel: true,

  // Riport formátuma
  reporter: 'html',

  // Globális beállítások a böngészőknek
  use: {
    baseURL: 'https://parabank.parasoft.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Itt történik a varázslat: beállítjuk mind a 3 fő böngészőt */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});