import { BasePage } from '@src/pages/core/BasePage'
import { HeaderComponentMobile } from '@src/components/mobileWeb/HeaderComponentMobile'
import { expect, type Page, type Locator } from '@playwright/test'

export class MainPageMobile extends BasePage {
  private readonly headerComponent: HeaderComponentMobile

  readonly headingText: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    super(page, '/')
    this.headerComponent = new HeaderComponentMobile(page)
    this.headingText = page.getByRole('heading', { name: 'Permitting, Done in Minutes' })
    this.loginButton = this.headerComponent.loginButton
  }

  async goto() {
    await this.open('/')
  }

  async assertVisible() {
    await expect(this.headingText).toBeVisible()
  }
}
