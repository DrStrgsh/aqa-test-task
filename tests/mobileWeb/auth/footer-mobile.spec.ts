import { test, expect } from '@tests/ui/ui.test'

test('mobile footer navigation (in my case just url checking)', async ({ app, page }) => {
  await app.authedMain.goto()
  await app.footer.assertVisible()

  await test.step('Go to home', async () => {
    await app.footer.clickOnHome()
    await expect(page).toHaveURL('/')
  })

  await test.step('Go to Inspections', async () => {
    await app.footer.clickOnInspections()
    await expect(page).toHaveURL('/inspections')
  })

  await test.step('Go to Notifications', async () => {
    await app.footer.clickOnNotifications()
    await expect(page).toHaveURL('/notifications')
  })

  await test.step('Go to More', async () => {
    await app.footer.clickOnMore()
    await expect(page).toHaveURL('/more')
  })
})
