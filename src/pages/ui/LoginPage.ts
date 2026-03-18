import { expect, type Locator, type Page } from '@playwright/test'
import { HeaderComponent } from '@src/components/ui/HeaderComponent'
import { BasePage } from '@src/pages/core/BasePage'

export class LoginPage extends BasePage {
  private readonly headerComponent: HeaderComponent

  readonly email: Locator
  readonly password: Locator
  readonly loginModalButton: Locator
  readonly loginModal: Locator

  constructor(page: Page) {
    super(page)
    this.headerComponent = new HeaderComponent(page)
    const modalSubmitButton = page.locator('form').locator('input[type="submit"]')
    const modalEmailInput = page.getByRole('textbox', { name: 'Email address' })

    this.loginModal = page
      .locator('[data-login-target="loginModal"]')
      .filter({ has: modalSubmitButton })
      .filter({ has: modalEmailInput })
      .last()
    this.email = this.loginModal.getByRole('textbox', { name: 'Email address' })
    this.password = this.loginModal.getByRole('textbox', { name: 'Password' })
    this.loginModalButton = this.loginModal.locator('form').locator('input[type="submit"]')
  }

  validationErrorField(): Locator {
    return this.loginModal.locator('.alynea-field-validation')
  }

  async openLoginModal() {
    await this.headerComponent.openLoginModal()
  }

  async assertMenuClosedAfterLoginOpen() {
    await this.loginModal.isVisible()
  }

  async closeMenuIfOpened() {
    await this.loginModal.isVisible()
  }

  async assertModalContentVisible() {
    await expect(this.loginModal).toBeVisible()
    await expect(this.email).toBeVisible()
    await expect(this.password).toBeVisible()
    await expect(this.loginModalButton).toHaveValue('Log in')
  }

  async login(email: string, password: string) {
    await this.email.fill(email)
    await this.password.fill(password)
    await this.loginModalButton.click()
  }
}
