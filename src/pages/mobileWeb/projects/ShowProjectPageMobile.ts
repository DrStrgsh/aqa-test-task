import { expect, type Page, type Locator } from '@playwright/test'

export class ShowProjectPageMobile {
  private readonly page: Page

  readonly deleteButton: Locator
  readonly flashMessage: Locator
  readonly addApplicationButton: Locator

  constructor(page: Page) {
    this.page = page
    this.flashMessage = page.locator('#flash')
    this.deleteButton = page.getByRole('button', { name: 'Delete Project' })
    this.addApplicationButton = page.getByRole('button', { name: 'Add Application' })
  }

  nameLocator(name: string): Locator {
    return this.page.getByRole('heading', { name })
  }

  async assertVisible() {
    await expect(this.deleteButton).toBeVisible()
    await expect(this.addApplicationButton).toBeVisible()
  }

  async deleteProject() {
    await this.deleteButton.click()
  }
}
