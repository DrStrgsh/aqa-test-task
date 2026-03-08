import { expect, type Page, type Locator } from '@playwright/test'

export class FooterComponentMobile {
  readonly footer: Locator
  readonly homeButton: Locator
  readonly inspectiosButton: Locator
  readonly notificationsButton: Locator
  readonly moreButton: Locator

  constructor(page: Page) {
    this.footer = page.locator('footer')
    this.homeButton = this.footer.getByRole('link', { name: 'Home' })
    this.inspectiosButton = this.footer.getByRole('link', { name: 'Inspections' })
    this.notificationsButton = this.footer.getByRole('link', { name: 'Notifications' })
    this.moreButton = this.footer.getByRole('button', { name: 'More' })
  }

  async assertVisible() {
    await expect(this.footer).toBeVisible()
    await expect(this.homeButton).toBeVisible()
    await expect(this.inspectiosButton).toBeVisible()
    await expect(this.notificationsButton).toBeVisible()
    await expect(this.moreButton).toBeVisible()
  }

  async clickOnHome() {
    await this.homeButton.click()
  }

  async clickOnInspections() {
    await this.inspectiosButton.click()
  }

  async clickOnNotifications() {
    await this.notificationsButton.click()
  }

  async clickOnMore() {
    await this.moreButton.click()
  }
}
