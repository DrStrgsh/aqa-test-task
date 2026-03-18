import { expect, type Page } from '@playwright/test'
import { type WaitPageReadyOptions, waitPageReady } from '@src/utils/ui-waits'

export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    protected readonly route?: string
  ) {}

  protected async open(path?: string, options: WaitPageReadyOptions = {}): Promise<void> {
    const target = path ?? this.route
    if (!target) {
      throw new Error('No route provided for page navigation')
    }

    await this.page.goto(target)
    await waitPageReady(this.page, options)
  }

  async assertUrl(pattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(pattern)
  }
}
