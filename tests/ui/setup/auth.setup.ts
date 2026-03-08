import { test as setup, expect } from '@playwright/test'
import { MainPage } from '@src/pages/ui/MainPage'
import { LoginPage } from '@src/pages/ui/LoginPage'
import { SidebarComponent } from '@src/components/ui/SidebarComponent'
import { getUiAuthData } from '@src/test-data/ui/auth'
import { AUTH_FILE } from '@src/config/test-paths'
import * as fs from 'fs'
import * as path from 'path'

const authFile = AUTH_FILE

setup('authenticate', async ({ page }) => {
  const mainPage = new MainPage(page)
  const loginPage = new LoginPage(page)
  const { email, password } = getUiAuthData()
  const acceptButton = page.locator('button[data-action="click->cookie-consent#accept"]')

  await mainPage.goto()
  await page.addLocatorHandler(acceptButton, async (locator) => {
    await locator.click()
  }, { times: 1 })
  await loginPage.openLoginModal()
  await loginPage.login(email, password)
  await expect(page).toHaveURL('/')
  const sidebar = new SidebarComponent(page)
  await sidebar.assertVisible()
  await page.removeLocatorHandler(acceptButton)

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
