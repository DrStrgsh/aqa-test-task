import { expect, type Page, type Locator } from '@playwright/test'
import { BasePage } from '@src/pages/core/BasePage'

export class ProjectsPageMobile extends BasePage {
  readonly heading: Locator
  readonly createCustomProjectButton: Locator

  constructor(page: Page) {
    super(page, '/projects')
    this.heading = page.getByRole('heading', { name: 'My Project Templates' })
    this.createCustomProjectButton = page.getByRole('link', { name: 'Create Custom Project' })
  }

  projectLocator(name: string): Locator {
    return this.page.getByRole('link', { name })
  }

  async goto() {
    await this.open()
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

  async hasProject(name: string): Promise<boolean> {
    const project = this.projectLocator(name)
    return (await project.count()) > 0
  }
}
