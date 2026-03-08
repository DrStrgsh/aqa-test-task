import { expect, type Page, type Locator } from '@playwright/test'
import { waitPageReady } from '@src/utils/uiWaits'
import type { ProjectData } from '@src/factories/ui/projects'

export class CreateProjectPageMobile {
  private readonly page: Page

  readonly form: Locator
  readonly nameInput: Locator
  readonly addressInput: Locator
  readonly addressSuggestions: Locator
  readonly apartmentNumberInput: Locator
  readonly jurisdictionSelector: Locator
  readonly optionsList: Locator
  readonly createProjectButton: Locator
  readonly cancelButton: Locator
  readonly mapCanvas: Locator
  readonly mapMarker: Locator

  constructor(page: Page) {
    this.page = page
    this.form = page.locator('form[action="/projects"]')
    this.nameInput = this.form.locator('input#project_name')
    this.addressInput = this.form.locator('input#custom-address-field')
    this.addressSuggestions = this.form.locator('.geocoder-suggestions')
    this.apartmentNumberInput = this.form.locator('input[name="unit_number"]')
    this.jurisdictionSelector = this.form.getByRole('combobox', { name: 'Jurisdiction' })
    this.optionsList = this.form.locator('#project_jurisdiction_id-ts-dropdown')
    this.createProjectButton = this.form.getByRole('button', { name: 'Create Project' })
    this.cancelButton = this.form.getByRole('link', { name: 'Cancel' })
    this.mapCanvas = this.form.getByRole('region', { name: 'Map' })
    this.mapMarker = this.form.getByRole('img', { name: 'Map marker' })
  }

  private option(name: string): Locator {
    return this.optionsList.getByRole('option', { name })
  }

  async goto() {
    await this.page.goto('/projects/new')
    await waitPageReady(this.page)
  }

  async assertVisible() {
    await expect(this.form).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.addressInput).toBeVisible()
    await expect(this.apartmentNumberInput).toBeVisible()
    await expect(this.jurisdictionSelector).toBeVisible()
    await expect(this.createProjectButton).toBeVisible()
    await expect(this.cancelButton).toBeVisible()
    await expect(this.mapCanvas).toBeVisible()
  }

  async selectAddress(address: string) {
    await this.addressInput.fill(address)
    await expect(this.addressSuggestions).toBeVisible()
    const exactSuggestion = this.addressSuggestions
      .locator('.address-suggestion')
      .filter({ hasText: address })
      .first()

    await expect(exactSuggestion).toBeVisible()
    await exactSuggestion.click()
  }

  async fillProjectForm(data: ProjectData) {
    await this.jurisdictionSelector.click()
    await expect(this.optionsList).toBeVisible()
    const jurisdictionOption = this.option(data.jurisdiction)

    await jurisdictionOption.click()
    await this.nameInput.fill(data.name)
    await this.apartmentNumberInput.fill(data.apartmentNumber ?? '')
  }

  async submitForm() {
    await this.createProjectButton.scrollIntoViewIfNeeded()
    let clickable = true

    try {
      await this.createProjectButton.click({ trial: true, timeout: 2000 })
    } catch {
      clickable = false
    }

    expect.soft(
      clickable,
      'Create Project button is obscured by the footer',
    ).toBe(true)

    await this.createProjectButton.click({ position: { x: 5, y: 5 } })
  }

  async submitFormExpectFailure() {
    const currentUrl = this.page.url()

    await this.createProjectButton.click()
    await expect(this.page).toHaveURL(currentUrl)
    await expect(this.form).toBeVisible()
  }
}
