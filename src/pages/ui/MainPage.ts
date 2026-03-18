import { expect, type Locator, type Page } from '@playwright/test'
import { HeaderComponent } from '@src/components/ui/HeaderComponent'
import { BasePage } from '@src/pages/core/BasePage'

export class MainPage extends BasePage {
  private readonly headerComponent: HeaderComponent

  readonly loginButton: Locator
  readonly header: Locator

  constructor(page: Page) {
    super(page, '/')
    this.headerComponent = new HeaderComponent(page)
    this.loginButton = this.headerComponent.loginButton
    this.header = this.headerComponent.header
  }

  async goto() {
    await this.open()
  }

  async assertVisible() {
    await expect(this.header).toBeVisible()
  }
}
