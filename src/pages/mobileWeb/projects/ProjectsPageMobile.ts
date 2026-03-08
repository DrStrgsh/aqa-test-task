import { expect, type Page, type Locator } from '@playwright/test'
import { waitPageReady } from '@src/utils/ui-waits'

export class ProjectsPageMobile {
  private readonly page: Page

  readonly heading: Locator
  readonly createCustomProjectButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { name: 'My Project Templates' })
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
    await expect(this.heading).toBeVisible()
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
