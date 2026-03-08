import { test, expect } from '@tests/ui/ui.test'
import { getUiAuthData } from '@src/test-data/ui/auth'
import { LoginPageMobile } from '@src/pages/mobileWeb/LoginPageMobile'
import { MainPageMobile } from '@src/pages/mobileWeb/MainPageMobile'
import { HeaderComponentMobile } from '@src/components/mobileWeb/HeaderComponentMobile'
import { routePatterns } from '@src/utils/route-patterns'

test('mobile ui login: happy path', async ({ page }) => {
  const { email, password } = getUiAuthData()
  const mobileLoginModal = new LoginPageMobile(page)
  const mobileMainPage = new MainPageMobile(page)
  const mobileHeaderComponent = new HeaderComponentMobile(page)

  await test.step('Open main page', async () => {
    await mobileMainPage.goto()
    await mobileMainPage.assertVisible()
  })

  await test.step('Open menu by clicking on hamburger icon on header', async () => {
    await mobileHeaderComponent.openHamburgerMenu()
  })

  await test.step('Open log in modal', async () => {
    await mobileHeaderComponent.openLoginModal()
    await mobileLoginModal.assertModalContentVisible()
  })

  await test.step('Menu should close automatically', async () => {
    await expect.soft(mobileHeaderComponent.loginButton).not.toBeVisible()
    await mobileHeaderComponent.closeMenu()
  })

  await test.step('Fill fields with valid test data', async () => {
    await mobileLoginModal.login(email, password)
    await expect(page).toHaveURL('/')
  })
})

test('mobile ui login: invalid email format is rejected', async ({ page }) => {
  const mobileLoginModal = new LoginPageMobile(page)
  const mobileMainPage = new MainPageMobile(page)
  const mobileHeaderComponent = new HeaderComponentMobile(page)

  await test.step('Open login modal', async () => {
    await mobileMainPage.goto()
    await mobileMainPage.assertVisible()
  })

  await test.step('Open menu by clicking on hamburger icon on header', async () => {
    await mobileHeaderComponent.openHamburgerMenu()
  })

  await test.step('Open log in modal', async () => {
    await mobileHeaderComponent.openLoginModal()
    await mobileLoginModal.assertModalContentVisible()
  })

  await test.step('Menu should close automatically', async () => {
    await expect.soft(mobileHeaderComponent.loginButton).not.toBeVisible()
    await mobileHeaderComponent.closeMenu()
  })

  await test.step('Submit invalid email format', async () => {
    await mobileLoginModal.login('not-an-email', 'Pass123')
    await expect(mobileLoginModal.loginModal).toBeVisible()
    await expect(mobileLoginModal.validationErrorField()).toHaveText('Please enter a valid email address')
  })
})

test('mobile ui login: wrong password is rejected', async ({ page }) => {
  const { email } = getUiAuthData()
  const mobileLoginModal = new LoginPageMobile(page)
  const mobileMainPage = new MainPageMobile(page)
  const mobileHeaderComponent = new HeaderComponentMobile(page)

  await test.step('Open login modal', async () => {
    await mobileMainPage.goto()
    await mobileMainPage.assertVisible()
  })

  await test.step('Open menu by clicking on hamburger icon on header', async () => {
    await mobileHeaderComponent.openHamburgerMenu()
  })

  await test.step('Open log in modal', async () => {
    await mobileHeaderComponent.openLoginModal()
    await mobileLoginModal.assertModalContentVisible()
  })

  await test.step('Menu should close automatically', async () => {
    await expect.soft(mobileHeaderComponent.loginButton).not.toBeVisible()
    await mobileHeaderComponent.closeMenu()
  })

  await test.step('Submit with invalid password', async () => {
    await mobileLoginModal.login(email, 'Pass123')
    await expect(mobileLoginModal.loginModal).toBeVisible()
    await expect(page).toHaveURL(routePatterns.usersSignIn)
    await expect(page.locator('#flash')).toContainText('Invalid Email or password')
  })
})

test('mobile ui login: empty credentials are rejected', async ({ page }) => {
  const mobileLoginModal = new LoginPageMobile(page)
  const mobileMainPage = new MainPageMobile(page)
  const mobileHeaderComponent = new HeaderComponentMobile(page)

  await test.step('Open login modal', async () => {
    await mobileMainPage.goto()
    await mobileMainPage.assertVisible()
  })

  await test.step('Open menu by clicking on hamburger icon on header', async () => {
    await mobileHeaderComponent.openHamburgerMenu()
  })

  await test.step('Open log in modal', async () => {
    await mobileHeaderComponent.openLoginModal()
    await mobileLoginModal.assertModalContentVisible()
  })

  await test.step('Menu should close automatically', async () => {
    await expect.soft(mobileHeaderComponent.loginButton).not.toBeVisible()
    await mobileHeaderComponent.closeMenu()
  })

  await test.step('Submit empty email/password', async () => {
    await mobileLoginModal.login('', '')
    await expect(mobileLoginModal.loginModal).toBeVisible()
    await expect(page).toHaveURL(routePatterns.usersSignIn)
    await expect(page.locator('#flash')).toContainText('Invalid Email or password')
  })
})
