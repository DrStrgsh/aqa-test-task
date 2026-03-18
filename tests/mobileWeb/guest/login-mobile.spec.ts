import { test, expect } from '@tests/ui/ui.test'
import { routePatterns } from '@src/utils/route-patterns'

const invalidAuthCases = [
  {
    name: 'invalid email',
    password: 'Pass123',
    getEmail: () => 'not-an-email',
    expected: { type: 'validation', message: 'Please enter a valid email address' },
  },
  {
    name: 'wrong password',
    password: 'Pass123',
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

test.describe('mobile ui login', () => {
  test.beforeEach(async ({ app }) => {
    await app.main.goto()
    await app.main.assertVisible()
    await app.login.openLoginModal()
    await app.login.assertMenuClosedAfterLoginOpen()
    await app.login.assertModalContentVisible()
  })

  test('happy path', async ({ app, authData }) => {
    await app.login.login(authData.email, authData.password)
    await app.main.assertUrl('/')
  })

  for (const tc of invalidAuthCases) {
    test(`invalid: ${tc.name}`, async ({ app, authData, page }) => {
      await app.login.closeMenuIfOpened()
      await app.login.login(tc.getEmail(authData.email), tc.password)
      await expect(app.login.loginModal).toBeVisible()
      if (tc.expected.type === 'validation') {
        await expect(app.login.validationErrorField()).toHaveText(tc.expected.message)
      } else {
        await expect(page).toHaveURL(routePatterns.usersSignIn)
        await expect(page.locator('#flash')).toContainText(tc.expected.message)
      }
    })
  }
})
