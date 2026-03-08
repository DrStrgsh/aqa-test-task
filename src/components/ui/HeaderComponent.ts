import type { Locator, Page } from '@playwright/test'

export class HeaderComponent {
  readonly header: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.header = page.getByRole('navigation')
    this.loginButton = this.header.getByRole('button', { name: 'Log In' })
  }

  async openLoginModal() {
    await this.loginButton.click()
  }
}
