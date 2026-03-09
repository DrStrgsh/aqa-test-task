import { test, expect } from '@tests/ui/ui.test'
import { ProjectsPage } from '@src/pages/ui/projects/ProjectsPage'
import { CreateProjectPage } from '@src/pages/ui/projects/CreateProjectPage'
import { createProjectData } from '@src/factories/ui/projects'
import { ShowProjectPage } from '@src/pages/ui/projects/ShowProjectPage'
import { routePatterns } from '@src/utils/route-patterns'
import * as path from 'path'

test('projects page: user can go to "create project page"', async ({ page }) => {
  const projectsPage = new ProjectsPage(page)
  const createProjectPage = new CreateProjectPage(page)

  await test.step('Open projects page', async () => {
    await projectsPage.goto()
    await expect(page).toHaveURL('/projects')
    await projectsPage.assertVisible()
  })

  await test.step('Open "create custom project page"', async () => {
    await projectsPage.openCreateCustomProjectPage()
    await expect(page).toHaveURL('/projects/new')
    await createProjectPage.assertVisible()
  })
})

test('projects page: user can create, read and delete project', async ({ page }) => {
  const projectData = createProjectData()
  const createProjectPage = new CreateProjectPage(page)
  const projectsPage = new ProjectsPage(page)
  const showProjectPage = new ShowProjectPage(page)

  await test.step('Create project', async () => {
    await createProjectPage.goto()
    await createProjectPage.assertVisible()
    await createProjectPage.fillProjectForm(projectData)
    await createProjectPage.selectAddress(projectData.address)
    await createProjectPage.submitForm()
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
  })

  await test.step('Read project', async () => {
    await projectsPage.goto()
    await projectsPage.assertVisible()
    await projectsPage.openProject(projectData.name)
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    await showProjectPage.assertVisible()
    await expect(showProjectPage.nameLocator(projectData.name)).toBeVisible()
  })

  await test.step('Delete project', async () => {
    await projectsPage.goto()
    await projectsPage.assertVisible()
    await projectsPage.openProject(projectData.name)
    await showProjectPage.assertVisible()
    // Deletion as a part of test flow
    await showProjectPage.deleteProject()
    await expect(page).toHaveURL('/projects')
    await projectsPage.assertVisible()
    await expect(projectsPage.projectLocator(projectData.name)).not.toBeVisible()
  })
})

test('projects page: validate custom project form rules', async ({ page }) => {
  const createProjectPage = new CreateProjectPage(page)
  const validData = createProjectData()

  await test.step('Submit button is disabled without required address', async () => {
    const dataWithoutAddress = { ...validData, address: '' }

    await createProjectPage.goto()
    await createProjectPage.assertVisible()
    await createProjectPage.fillProjectForm(dataWithoutAddress)
    await expect(createProjectPage.createProjectButton).toBeDisabled()
  })

  await test.step('Submit button is disabled without required name', async () => {
    const dataWithoutName = { ...validData, name: '' }

    await createProjectPage.goto()
    await createProjectPage.assertVisible()
    await createProjectPage.selectAddress(dataWithoutName.address)
    await createProjectPage.fillProjectForm(dataWithoutName)
    await expect(createProjectPage.createProjectButton).toBeDisabled()
  })

  await test.step('Submit button is disabled without required jurisdiction', async () => {
    await createProjectPage.goto()
    await createProjectPage.assertVisible()
    await createProjectPage.fillProjectForm(validData)
    await expect(createProjectPage.createProjectButton).toBeDisabled()
  })
})

test('projects page: user cannot submit a text file path as address', async ({ page }) => {
  const createProjectPage = new CreateProjectPage(page)
  const validData = createProjectData()
  const dataWithotName = { ...validData, name: '' }
  const filePath = path.resolve(process.cwd(), 'src', 'test-data', 'ui', 'sample.txt')

  await test.step('Open create project form', async () => {
    await createProjectPage.goto()
    await createProjectPage.assertVisible()
  })

  await test.step('Paste file path into address field', async () => {
    await createProjectPage.fillProjectForm(dataWithotName)
    await createProjectPage.addressInput.fill(filePath)
    await expect(createProjectPage.nameInput).toHaveValue('')
    await expect(createProjectPage.createProjectButton).toBeDisabled()
  })
})

test.fail('projects page: user cannot create project with name length > 300', async ({ page }) => {
  const projectData = createProjectData()
  const createProjectPage = new CreateProjectPage(page)
  const showProjectPage = new ShowProjectPage(page)
  const longNameBase = `Proj-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}-`
  const longName = `${longNameBase}${'x'.repeat(301)}`.slice(0, 301)
  const longNameData = { ...projectData, name: longName }

  await test.step('Create project with long name', async () => {
    await createProjectPage.goto()
    await createProjectPage.assertVisible()
    await createProjectPage.selectAddress(projectData.address)
    await createProjectPage.fillProjectForm(longNameData)
    await createProjectPage.submitForm()
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    await showProjectPage.assertVisible()
    await expect(showProjectPage.nameLocator(longName.slice(0, 30))).toContainText(longName.slice(0, 30))
    // Under normal circumstances, deletion would be performed via API.
    await showProjectPage.deleteProject()
  })
})
