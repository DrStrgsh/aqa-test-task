import { test, expect } from '@tests/ui/ui.test'
import { routePatterns } from '@src/utils/route-patterns'

const invalidAuthCases = [
  {
    name: 'invalid email',
    password: 'Passw0rd!23',
    getEmail: () => 'not-an-email',
    expected: { type: 'validation', message: 'Please enter a valid email address' },
  },
  {
    name: 'wrong password',
    password: 'wrong-password-123',
    getEmail: (email: string) => email,
    expected: { type: 'flash', message: 'Invalid Email or password' },
  },
  {
    name: 'empty credentials',
    password: '',
    getEmail: () => '',
    expected: { type: 'flash', message: 'Invalid Email or password' },
  },
]

test.describe('ui login', () => {
  test.beforeEach(async ({ app }) => {
    await app.main.goto()
    await app.main.assertVisible()
    await app.login.openLoginModal()
    await app.login.assertModalContentVisible()
  })

  test('happy path', async ({ app, authData }) => {
    await app.login.login(authData.email, authData.password)
    await app.main.assertUrl('/')
    await app.main.assertVisible()
  })

  for (const testCase of invalidAuthCases) {
    test(`invalid: ${testCase.name}`, async ({ app, authData, page }) => {
      await app.login.login(testCase.getEmail(authData.email), testCase.password)
      await expect(app.login.loginModal).toBeVisible()
      await expect(app.main.loginButton).toBeVisible()

      if (testCase.expected.type === 'validation') {
        await expect(app.login.validationErrorField()).toHaveText(testCase.expected.message)
      } else {
        await expect(page).toHaveURL(routePatterns.usersSignIn)
        await expect(page.locator('#flash')).toContainText(testCase.expected.message)
      }
    })
  }
})

