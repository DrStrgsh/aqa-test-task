import { expect, test as base } from '@playwright/test'

export const test = base.extend<{
  cookieBanner: void
}>({
  cookieBanner: [
    async ({ page }, use) => {
      const acceptButton = page.locator('button[data-action="click->cookie-consent#accept"]')

      await page.addLocatorHandler(acceptButton, async (locator) => {
        await locator.click()
      }, { times: 1 })

      await use()
      await page.removeLocatorHandler(acceptButton)
    },
    { auto: true },
  ],
})

export { expect }
