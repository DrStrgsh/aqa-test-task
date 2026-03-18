import { test, expect } from '@tests/ui/ui.test'

test('authed main page: user can go to projects page through nav bar', async ({ app, page }) => {
  await test.step('Open authed main page', async () => {
    await app.authedMain.goto()
    await app.authedMain.assertVisible()
  })

  await test.step('Expand nav bar', async () => {
    await app.authedMain.expandNavBar()
  })

  await test.step('Open projects page', async () => {
    await app.authedMain.openProjects()
    await expect(page).toHaveURL('/projects')
    await app.projects.assertVisible()
  })
})
