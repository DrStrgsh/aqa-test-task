import { test, expect } from '@tests/ui/ui.test'
import { getUiAuthData } from '@src/test-data/ui/auth'
import { LoginPage } from '@src/pages/ui/LoginPage'
import { MainPage } from '@src/pages/ui/MainPage'
import { routePatterns } from '@src/utils/route-patterns'

test('ui login: happy path', async ({ page }) => {
  const { email, password } = getUiAuthData()
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await test.step('Open main page', async () => {
    await mainPage.goto()
    await mainPage.assertVisible()
  })

  await test.step('Open login modal', async () => {
    await loginPage.openLoginModal()
    await loginPage.assertModalContentVisible()
  })

  await test.step('Login with valid credentials', async () => {
    await loginPage.login(email, password)
  })

  await test.step('Authed main page is visible', async () => {
    await expect(page).toHaveURL('/')
    await mainPage.assertVisible()
  })
})

test('ui login: invalid email format is rejected', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await test.step('Open login modal', async () => {
    await mainPage.goto()
    await mainPage.assertVisible()
    await loginPage.openLoginModal()
    await loginPage.assertModalContentVisible()
  })

  await test.step('Submit invalid email format', async () => {
    await loginPage.login('not-an-email', 'Passw0rd!23')
    await expect(loginPage.loginModal).toBeVisible()
    await expect(mainPage.loginButton).toBeVisible()
    await expect(loginPage.validationErrorField()).toHaveText('Please enter a valid email address')
  })
})

test('ui login: wrong password is rejected', async ({ page }) => {
  const { email } = getUiAuthData()
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await test.step('Open login modal', async () => {
    await mainPage.goto()
    await mainPage.assertVisible()
    await loginPage.openLoginModal()
    await loginPage.assertModalContentVisible()
  })

  await test.step('Submit invalid credentials', async () => {
    await loginPage.login(email, 'wrong-password-123')
    await expect(loginPage.loginModal).toBeVisible()
    await expect(mainPage.loginButton).toBeVisible()
    await expect(page).toHaveURL(routePatterns.usersSignIn)
    await expect(page.locator('#flash')).toContainText('Invalid Email or password')
  })
})

test('ui login: empty credentials are rejected', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const mainPage = new MainPage(page)

  await test.step('Open login modal', async () => {
    await mainPage.goto()
    await mainPage.assertVisible()
    await loginPage.openLoginModal()
    await loginPage.assertModalContentVisible()
  })

  await test.step('Submit empty email/password', async () => {
    await loginPage.login('', '')
    await expect(loginPage.loginModal).toBeVisible()
    await expect(mainPage.loginButton).toBeVisible()
    await expect(page).toHaveURL(routePatterns.usersSignIn)
    await expect(page.locator('#flash')).toContainText('Invalid Email or password')
  })
})
