import { BasePage } from '@src/pages/core/BasePage'
import { FooterComponentMobile } from '@src/components/mobileWeb/FooterComponentMobile'
import { expect, type Page, type Locator } from '@playwright/test'

export class AuthedMainPageMobile extends BasePage {

  readonly footer: FooterComponentMobile
  readonly projectsLink: Locator


  constructor(page: Page) {
    super(page, '/')
    this.footer = new FooterComponentMobile(page)
    this.projectsLink = page.getByRole('link', { name: /Projects Work within project/i })
  }

  async goto() {
    await this.open('/')
  }

  async assertVisible() {
    await expect(this.projectsLink).toBeVisible()
  }

  async goToProjects() {
    await this.projectsLink.click()
  }

  async openProjects() {
    await this.goToProjects()
  }

  async expandNavBar() {
    await this.footer.clickOnMore()
  }

  async openProjectsPage() {
    await this.openProjects()
  }
}
