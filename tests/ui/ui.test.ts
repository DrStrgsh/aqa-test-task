import { expect, test as base } from '@playwright/test'
import { createProjectData } from '@src/factories/ui/projects'
import { getUiAuthData } from '@src/test-data/ui/auth'
import { PageManager, type Platform } from '@src/pages/core/PageManager'

export const test = base.extend<{
  app: PageManager
  projectData: ReturnType<typeof createProjectData>
  authData: ReturnType<typeof getUiAuthData>
  cookieBanner: void
}>({
  app: async ({ page }, use, testInfo) => {
    const platform = testInfo.project.name.includes('mobile') ? ('mobile' as Platform) : ('ui' as Platform)
    await use(new PageManager(page, platform))
  },
  projectData: async ({}, use) => {
    await use(createProjectData())
  },
  authData: async ({}, use) => {
    await use(getUiAuthData())
  },
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
