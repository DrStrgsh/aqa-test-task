import { BasePage } from '@src/pages/core/BasePage'
import { expect, type Locator, type Page } from '@playwright/test'

export class ProjectsPage extends BasePage {
  readonly createCustomProjectButton: Locator

  constructor(page: Page) {
    super(page)
    this.createCustomProjectButton = page.getByRole('link', { name: 'Create Custom Project' })
  }

  projectLocator(name: string): Locator {
    return this.page.getByRole('link', { name })
  }

  async goto() {
    await this.open('/projects')
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

  async hasProject(name: string): Promise<boolean> {
    const project = this.projectLocator(name)
    return (await project.count()) > 0
  }
}
