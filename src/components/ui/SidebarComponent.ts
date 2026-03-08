import { expect, type Page, type Locator } from '@playwright/test'

export class SidebarComponent {
  readonly navBar: Locator
  readonly projectsNavLink: Locator

  constructor(page: Page) {
    this.navBar = page.locator('#navbar')
    this.projectsNavLink = this.navBar.getByRole('link', { name: /^Projects$/i })
  }

  async assertVisible() {
    await expect(this.navBar).toBeVisible()
  }

  async expandNavBar() {
    await expect(this.navBar).toBeVisible()
    if (await this.navBar.isVisible()) return

    await this.navBar.click()
    await expect(this.projectsNavLink).toBeVisible()
  }

  async openProjectsPage() {
    await this.expandNavBar()
    await this.projectsNavLink.click()
  }
}
