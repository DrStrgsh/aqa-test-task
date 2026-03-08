import { waitPageReady } from '@src/utils/ui-waits'
import { expect, type Page, type Locator } from '@playwright/test'

export class MainPageMobile {
  private readonly page: Page

  readonly headingText: Locator

  constructor(page: Page) {
    this.page = page
    this.headingText = page.getByRole('heading', { name: 'Permitting, Done in Minutes' })

  }

  async goto() {
    await this.page.goto('/')
    await waitPageReady(this.page)
  }

  async assertVisible() {
    await expect(this.headingText).toBeVisible()
  }
}
