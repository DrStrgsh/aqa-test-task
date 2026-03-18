import { test as setup, expect } from '@tests/ui/ui.test'
import { AUTH_FILE } from '@src/config/test-paths'
import * as fs from 'fs'
import * as path from 'path'

const authFile = AUTH_FILE

setup('authenticate', async ({ app, authData, page }) => {
  const acceptButton = page.locator('button[data-action="click->cookie-consent#accept"]')

  await app.main.goto()
  await page.addLocatorHandler(acceptButton, async (locator) => {
    await locator.click()
  }, { times: 1 })
  await app.login.openLoginModal()
  await app.login.login(authData.email, authData.password)
  await expect(page).toHaveURL('/')
  await app.authedMain.assertVisible()
  await page.removeLocatorHandler(acceptButton)

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
