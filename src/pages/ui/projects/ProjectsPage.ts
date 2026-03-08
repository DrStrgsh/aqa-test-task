import { waitPageReady } from '@src/utils/uiWaits'
import { expect, type Page, type Locator } from '@playwright/test'

export class ProjectsPage {
  private readonly page: Page

  readonly createCustomProjectButton: Locator

  constructor(page: Page) {
    this.page = page
    this.createCustomProjectButton = page.getByRole('link', { name: 'Create Custom Project' })
  }

  projectLocator(name: string): Locator {
    return this.page.getByRole('link', { name })
  }

  async goto() {
    await this.page.goto('/projects')
    await waitPageReady(this.page)
  }

  async assertVisible() {
    await expect(this.createCustomProjectButton).toBeVisible()
  }

  async openCreateCustomProjectPage() {
    await this.createCustomProjectButton.click()
  }

  async openProject(name: string) {
    const project = this.projectLocator(name)
    await project.click()
  }
}
