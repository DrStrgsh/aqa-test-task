import { test, expect } from '@tests/ui/ui.test'
import { FooterComponentMobile } from '@src/components/mobileWeb/FooterComponentMobile'
import { AuthedMainPageMobile } from '@src/pages/mobileWeb/AuthedMainPageMobile'

test('mobile footer navigation (in my case just url checking)', async ({ page }) => {
  const authedMainPageMobile = new AuthedMainPageMobile(page)
  const footerComponentMobile = new FooterComponentMobile(page)

  await authedMainPageMobile.goto()
  await footerComponentMobile.assertVisible()

  await test.step('Go to home', async () => {
    await footerComponentMobile.clickOnHome()
    await expect(page).toHaveURL('/')
  })

  await test.step('Go to Inspections', async () => {
    await footerComponentMobile.clickOnInspections()
    await expect(page).toHaveURL('/inspections')
  })

  await test.step('Go to Notifications', async () => {
    await footerComponentMobile.clickOnNotifications()
    await expect(page).toHaveURL('/notifications')
  })

  await test.step('Go to More', async () => {
    await footerComponentMobile.clickOnMore()
    await expect(page).toHaveURL('/more')
  })
})
