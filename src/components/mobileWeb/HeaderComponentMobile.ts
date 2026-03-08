import { expect, type Page, type Locator } from '@playwright/test'

export class HeaderComponentMobile {
  readonly menuButton: Locator
  readonly menuList: Locator
  readonly loginButton: Locator
  readonly menuFunctionalHeader: Locator

  constructor(page: Page) {
    this.menuButton = page.locator('button[type="button"][data-action="click->mobile-menu#toggle"]')
    this.menuFunctionalHeader = page.locator('div[data-action="click->mobile-menu#toggle"]')
    this.menuList = page.locator('[data-mobile-menu-target="mobileMenu"]')
    this.loginButton = this.menuList.locator('[data-action="click->login#openLoginModal"]')
  }

  async assertMenuButtonVisible() {
    await expect(this.menuButton).toBeVisible()
  }

  async openMenu() {
    await this.menuButton.click()
  }

  async assertMenuListVisible() {
    await expect(this.loginButton).toBeVisible()
  }

  async openLoginModal() {
    await this.loginButton.click()
  }

  async closeMenu() {
    if (!(this.loginButton.isVisible())) return

    await this.menuFunctionalHeader.click()
  }

  async openHamburgerMenu() {
    await this.assertMenuButtonVisible()
    await this.openMenu()
    await this.assertMenuListVisible()
  }
}
