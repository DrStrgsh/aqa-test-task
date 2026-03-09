import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'
import { AUTH_FILE } from '@src/config/test-paths'
import * as path from 'path'

config({ path: path.resolve(__dirname, '.env') })

const uiBaseURL = process.env.BASE_UI_URL
const apiBaseURL = process.env.BASE_API_URL

export default defineConfig({
  timeout: 60_000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers and mobile devices */
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-guest-chromium',
      testDir: './tests/ui/guest',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-guest-firefox',
      testDir: './tests/ui/guest',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-guest-webkit',
      testDir: './tests/ui/guest',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-guest-mobile-chrome',
      testDir: './tests/mobileWeb/guest',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Pixel 5'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-guest-mobile-safari',
      testDir: './tests/mobileWeb/guest',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['iPhone 12'],
        baseURL: uiBaseURL,
      },
    },
    {
      name: 'ui-auth-chromium',
      testDir: './tests/ui/auth',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'ui-auth-firefox',
      testDir: './tests/ui/auth',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Firefox'],
        baseURL: uiBaseURL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'ui-auth-webkit',
      testDir: './tests/ui/auth',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Safari'],
        baseURL: uiBaseURL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'ui-auth-mobile-chrome',
      testDir: './tests/mobileWeb/auth',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Pixel 5'],
        baseURL: uiBaseURL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'ui-auth-mobile-safari',
      testDir: './tests/mobileWeb/auth',
      testMatch: /.*\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['iPhone 12'],
        baseURL: uiBaseURL,
        storageState: AUTH_FILE,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      testMatch: /.*\.spec\.ts/,
      use: {
        baseURL: apiBaseURL,
      },
    },
  ],
})
