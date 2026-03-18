import path from 'path'
import { test, expect } from '@tests/ui/ui.test'
import { routePatterns } from '@src/utils/route-patterns'

test.describe('mobile projects page', () => {
  test.beforeEach(async ({ app }) => {
    await app.projects.goto()
    await app.projects.assertVisible()
  })

  test.afterEach(async ({ app, projectData }) => {
    await app.projects.goto()
    const exists = await app.projects.hasProject(projectData.name)
    if (!exists) return

    await app.projects.openProject(projectData.name)
    await app.showProject.deleteProject()
    await app.projects.goto()
    await expect(app.projects.assertVisible()).resolves.toBeUndefined()
    await expect(app.projects.hasProject(projectData.name)).resolves.toBe(false)
  })

  test('user can go to "create project page"', async ({ app, page }) => {
    await test.step('Open projects page', async () => {
      await expect(page).toHaveURL('/projects')
      await app.projects.assertVisible()
    })

    await test.step('Open "create custom project page"', async () => {
      await app.projects.openCreateCustomProjectPage()
      await expect(page).toHaveURL('/projects/new')
      await app.createProject.assertVisible()
    })
  })

  test('user can create, read and delete project', async ({ app, page, projectData }) => {
    await test.step('Create project', async () => {
      await app.createProject.goto()
      await app.createProject.assertVisible()
      await app.createProject.fillProjectForm(projectData)
      await app.createProject.selectAddress(projectData.address)
      await app.createProject.submitForm()
      await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    })

    await test.step('Read project', async () => {
      await app.projects.goto()
      await app.projects.assertVisible()
      await app.projects.openProject(projectData.name)
      await expect(page).toHaveURL(routePatterns.projectsByExternalId)
      await app.showProject.assertVisible()
      await expect(app.showProject.nameLocator(projectData.name)).toBeVisible()
    })

    await test.step('Delete project', async () => {
      await app.projects.goto()
      await app.projects.assertVisible()
      await app.projects.openProject(projectData.name)
      await app.showProject.assertVisible()
      await app.showProject.deleteProject()
      await expect(page).toHaveURL('/projects')
      await app.projects.assertVisible()
      await expect(app.projects.projectLocator(projectData.name)).not.toBeVisible()
    })
  })

  test('validate custom project form rules', async ({ app, projectData }) => {
    await test.step('Submit button is disabled without required address', async () => {
      const dataWithoutAddress = { ...projectData, address: '' }

      await app.createProject.goto()
      await app.createProject.assertVisible()
      await app.createProject.fillProjectForm(dataWithoutAddress)
      await expect(app.createProject.createProjectButton).toBeDisabled()
    })

    await test.step('Submit button is disabled without required name', async () => {
      const dataWithoutName = { ...projectData, name: '' }

      await app.createProject.goto()
      await app.createProject.assertVisible()
      await app.createProject.selectAddress(dataWithoutName.address)
      await app.createProject.fillProjectForm(dataWithoutName)
      await expect(app.createProject.createProjectButton).toBeDisabled()
    })

    await test.step('Submit button is disabled without required jurisdiction', async () => {
      await app.createProject.goto()
      await app.createProject.assertVisible()
      await app.createProject.fillProjectForm(projectData)
      await expect(app.createProject.createProjectButton).toBeDisabled()
    })
  })

  test('user cannot submit a text file path as address', async ({ app, projectData }) => {
    const filePath = path.resolve(process.cwd(), 'src', 'test-data', 'ui', 'sample.txt')
    const dataWithoutName = { ...projectData, name: '' }

    await test.step('Open create project form', async () => {
      await app.createProject.goto()
      await app.createProject.assertVisible()
    })

    await test.step('Paste file path into address field', async () => {
      await app.createProject.fillProjectForm(dataWithoutName)
      await app.createProject.addressInput.fill(filePath)
      await expect(app.createProject.nameInput).toHaveValue('')
      await expect(app.createProject.createProjectButton).toBeDisabled()
    })
  })

  test.fail('user cannot create project with name length > 300', async ({ app, page, projectData }) => {
    const longNameBase = `Proj-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}-`
    const longName = `${longNameBase}${'x'.repeat(301)}`.slice(0, 301)
    const longNameData = { ...projectData, name: longName }

    await test.step('Create project with long name', async () => {
      await app.createProject.goto()
      await app.createProject.assertVisible()
      await app.createProject.selectAddress(projectData.address)
      await app.createProject.fillProjectForm(longNameData)
      await app.createProject.submitForm()
      await expect(page).toHaveURL(routePatterns.projectsByExternalId)
      await app.showProject.assertVisible()
      await expect(app.showProject.nameLocator(longName.slice(0, 30))).toContainText(longName.slice(0, 30))
      await app.showProject.deleteProject()
    })
  })
})
