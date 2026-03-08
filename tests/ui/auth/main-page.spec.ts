import { test, expect } from '@tests/ui/ui.test'
import { AuthedMainPage } from '@src/pages/ui/AuthedMainPage'
import { ProjectsPage } from '@src/pages/ui/projects/ProjectsPage'

test('authed main page: user can go to projects page through nav bar', async ({ page }) => {
  const authedMainPage = new AuthedMainPage(page)
  const projectsPage = new ProjectsPage(page)

  await test.step('Open authed main page', async () => {
    await authedMainPage.goto()
    await authedMainPage.assertVisible()
  })

  await test.step('Expand nav bar', async () => {
    await authedMainPage.expandNavBar()
  })

  await test.step('Open projects page', async () => {
    await authedMainPage.openProjectsPage()
    await expect(page).toHaveURL('/projects')
    await projectsPage.assertVisible()
  })
})
