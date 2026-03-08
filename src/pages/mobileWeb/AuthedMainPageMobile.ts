import { waitPageReady } from '@src/utils/uiWaits'
import { expect, type Page, type Locator } from '@playwright/test'
import { FooterComponentMobile } from '@src/components/mobileWeb/FooterComponentMobile'

export class AuthedMainPageMobile {
  private readonly page: Page

  readonly footer: FooterComponentMobile
  readonly projectsLink: Locator


  constructor(page: Page) {
    this.page = page
    this.footer = new FooterComponentMobile(page)

    this.projectsLink = page.getByRole('link', { name: /Projects Work within project/i })
  }

  async goto() {
    await this.page.goto('/')
    await waitPageReady(this.page)
  }

  async assertVisible() {
    await expect(this.projectsLink).toBeVisible()
  }

  async goToProjects() {
    await this.projectsLink.click()
  }
}
