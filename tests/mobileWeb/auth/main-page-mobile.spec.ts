import { test, expect } from '@tests/ui/ui.test'
import { AuthedMainPageMobile } from '@src/pages/mobileWeb/AuthedMainPageMobile'
import { ProjectsPageMobile } from '@src/pages/mobileWeb/projects/ProjectsPageMobile'

test('mobile authed main page: user can go to projects page', async ({ page }) => {
  const authedMobileMainPage = new AuthedMainPageMobile(page)
  const projectsMobilePage = new ProjectsPageMobile(page)

  await test.step('Open authed main page', async () => {
    await authedMobileMainPage.goto()
    await authedMobileMainPage.assertVisible()
  })

  await test.step('Open projects page', async () => {
    await authedMobileMainPage.goToProjects()
    await expect(page).toHaveURL('/projects')
    await projectsMobilePage.assertVisible()
  })
})
