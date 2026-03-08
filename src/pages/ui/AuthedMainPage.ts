import { waitPageReady } from '@src/utils/uiWaits'
import { SidebarComponent } from '@src/components/ui/SidebarComponent'
import type { Page } from '@playwright/test'

export class AuthedMainPage {
  private readonly page: Page
  private readonly sidebar: SidebarComponent

  constructor(page: Page) {
    this.page = page
    this.sidebar = new SidebarComponent(page)
  }

  async goto() {
    await this.page.goto('/')
    await waitPageReady(this.page)
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
}
