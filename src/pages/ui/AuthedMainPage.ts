import { BasePage } from '@src/pages/core/BasePage'
import { SidebarComponent } from '@src/components/ui/SidebarComponent'
import type { Page } from '@playwright/test'

export class AuthedMainPage extends BasePage {
  private readonly sidebar: SidebarComponent

  constructor(page: Page) {
    super(page, '/')
    this.sidebar = new SidebarComponent(page)
  }

  async goto() {
    await this.open()
  }

  async assertVisible() {
    await this.sidebar.assertVisible()
  }

  async expandNavBar() {
    await this.sidebar.expandNavBar()
  }

  async openProjectsPage() {
    await this.sidebar.openProjectsPage()
  }

  async openProjects() {
    await this.openProjectsPage()
  }
}
