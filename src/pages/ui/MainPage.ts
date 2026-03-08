import { waitPageReady } from '@src/utils/uiWaits'
import { expect, type Page, type Locator } from '@playwright/test'
import { HeaderComponent } from '@src/components/ui/HeaderComponent'

export class MainPage {
  private readonly page: Page
  private readonly headerComponent: HeaderComponent

  readonly loginButton: Locator
  readonly header: Locator

  constructor(page: Page) {
    this.page = page
    this.headerComponent = new HeaderComponent(page)
    this.loginButton = this.headerComponent.loginButton
    this.header = this.headerComponent.header
  }

  async goto() {
    await this.page.goto('/')
    await waitPageReady(this.page)
  }

  async assertVisible() {
    await expect(this.header).toBeVisible()
  }
}
