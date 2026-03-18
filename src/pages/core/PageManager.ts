import { FooterComponentMobile } from '@src/components/mobileWeb/FooterComponentMobile'
import { HeaderComponent } from '@src/components/ui/HeaderComponent'
import { HeaderComponentMobile } from '@src/components/mobileWeb/HeaderComponentMobile'
import { MainPage } from '@src/pages/ui/MainPage'
import { MainPageMobile } from '@src/pages/mobileWeb/MainPageMobile'
import { LoginPage } from '@src/pages/ui/LoginPage'
import { LoginPageMobile } from '@src/pages/mobileWeb/LoginPageMobile'
import { AuthedMainPage } from '@src/pages/ui/AuthedMainPage'
import { AuthedMainPageMobile } from '@src/pages/mobileWeb/AuthedMainPageMobile'
import { ProjectsPage } from '@src/pages/ui/projects/ProjectsPage'
import { ProjectsPageMobile } from '@src/pages/mobileWeb/projects/ProjectsPageMobile'
import { CreateProjectPage } from '@src/pages/ui/projects/CreateProjectPage'
import { CreateProjectPageMobile } from '@src/pages/mobileWeb/projects/CreateProjectPageMobile'
import { ShowProjectPage } from '@src/pages/ui/projects/ShowProjectPage'
import { ShowProjectPageMobile } from '@src/pages/mobileWeb/projects/ShowProjectPageMobile'
import type { Page } from '@playwright/test'

export type Platform = 'ui' | 'mobile'

export class PageManager {
  private readonly cache = new Map<string, unknown>()

  constructor(
    private readonly page: Page,
    private readonly platform: Platform
  ) {}

  private getCached<T>(key: string, factory: () => T): T {
    if (!this.cache.has(key)) {
      this.cache.set(key, factory())
    }
    return this.cache.get(key) as T
  }

  get main() {
    return this.platform === 'mobile'
      ? this.getCached('main', () => new MainPageMobile(this.page))
      : this.getCached('main', () => new MainPage(this.page))
  }

  get login() {
    return this.platform === 'mobile'
      ? this.getCached('login', () => new LoginPageMobile(this.page))
      : this.getCached('login', () => new LoginPage(this.page))
  }

  get authedMain() {
    return this.platform === 'mobile'
      ? this.getCached('authedMain', () => new AuthedMainPageMobile(this.page))
      : this.getCached('authedMain', () => new AuthedMainPage(this.page))
  }

  get projects() {
    return this.platform === 'mobile'
      ? this.getCached('projects', () => new ProjectsPageMobile(this.page))
      : this.getCached('projects', () => new ProjectsPage(this.page))
  }

  get createProject() {
    return this.platform === 'mobile'
      ? this.getCached('createProject', () => new CreateProjectPageMobile(this.page))
      : this.getCached('createProject', () => new CreateProjectPage(this.page))
  }

  get showProject() {
    return this.platform === 'mobile'
      ? this.getCached('showProject', () => new ShowProjectPageMobile(this.page))
      : this.getCached('showProject', () => new ShowProjectPage(this.page))
  }

  get header() {
    return this.platform === 'mobile'
      ? this.getCached('header', () => new HeaderComponentMobile(this.page))
      : this.getCached('header', () => new HeaderComponent(this.page))
  }

  get footer() {
    if (this.platform !== 'mobile') {
      throw new Error('Footer fixture is only supported for mobile platform')
    }
    return this.getCached('footer', () => new FooterComponentMobile(this.page))
  }
}

