import { test, expect } from '@tests/ui/ui.test'
import { ProjectsPageMobile } from '@src/pages/mobileWeb/projects/ProjectsPageMobile'
import { CreateProjectPageMobile } from '@src/pages/mobileWeb/projects/CreateProjectPageMobile'
import { ShowProjectPageMobile } from '@src/pages/mobileWeb/projects/ShowProjectPageMobile'
import { createProjectData } from '@src/factories/ui/projects'
import { routePatterns } from '@src/utils/route-patterns'

test('mobile projects page: user can go to "create project page"', async ({ page }) => {
  const projectsPageMobile = new ProjectsPageMobile(page)
  const createProjectPageMobile = new CreateProjectPageMobile(page)

  await test.step('Open projects page', async () => {
    await projectsPageMobile.goto()
    await expect(page).toHaveURL('/projects')
    await projectsPageMobile.assertVisible()
  })

  await test.step('Open "create custom project page"', async () => {
    await projectsPageMobile.openCreateCustomProjectPage()
    await expect(page).toHaveURL('/projects/new')
    await createProjectPageMobile.assertVisible()
  })
})

test('mobile projects page: user can create, read and delete project', async ({ page }) => {
  const projectData = createProjectData()
  const createProjectPageMobile = new CreateProjectPageMobile(page)
  const projectsPageMobile = new ProjectsPageMobile(page)
  const showProjectPageMobile = new ShowProjectPageMobile(page)

  await test.step('Create project', async () => {
    await createProjectPageMobile.goto()
    await createProjectPageMobile.assertVisible()
    await expect(createProjectPageMobile.mapMarker).not.toBeVisible()
    await createProjectPageMobile.selectAddress(projectData.address)
    await expect(createProjectPageMobile.mapMarker).toBeVisible()
    await createProjectPageMobile.fillProjectForm(projectData)
    await createProjectPageMobile.submitForm()
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    await showProjectPageMobile.assertVisible()
    await expect(showProjectPageMobile.nameLocator(projectData.name)).toBeVisible()
  })

  await test.step('Read project', async () => {
    await projectsPageMobile.goto()
    await projectsPageMobile.assertVisible()
    await projectsPageMobile.openProject(projectData.name)
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    await showProjectPageMobile.assertVisible()
    await expect(showProjectPageMobile.nameLocator(projectData.name)).toBeVisible()
  })

  await test.step('Delete project', async () => {
    await projectsPageMobile.goto()
    await projectsPageMobile.assertVisible()
    await projectsPageMobile.openProject(projectData.name)
    await showProjectPageMobile.assertVisible()
    await showProjectPageMobile.deleteProject()
    await expect(page).toHaveURL('/projects')
    await projectsPageMobile.assertVisible()
    await expect(projectsPageMobile.projectLocator(projectData.name)).not.toBeVisible()
  })
})

test('mobile projects page: validate custom project form rules', async ({ page }) => {
  const createProjectPageMobile = new CreateProjectPageMobile(page)
  const validData = createProjectData()

  await test.step('Submit button is disabled without required address', async () => {
    const dataWithoutAddress = { ...validData, address: '' }

    await createProjectPageMobile.goto()
    await createProjectPageMobile.assertVisible()
    await createProjectPageMobile.fillProjectForm(dataWithoutAddress)
    await expect(createProjectPageMobile.createProjectButton).toBeDisabled()
  })

  await test.step('Subit button is disabled without requried name', async () => {
    const dataWithoutName = { ...validData, name: '' }

    await createProjectPageMobile.goto()
    await createProjectPageMobile.assertVisible()
    await createProjectPageMobile.selectAddress(dataWithoutName.address)
    await createProjectPageMobile.fillProjectForm(dataWithoutName)
    await expect(createProjectPageMobile.createProjectButton).toBeDisabled()
  })

  await test.step('Submit button is disabled without required jurisdiction', async () => {
    await createProjectPageMobile.goto()
    await createProjectPageMobile.assertVisible()
    await createProjectPageMobile.fillProjectForm(validData)
    await expect(createProjectPageMobile.createProjectButton).toBeDisabled()
  })
})

test.fail('mobile projects page: user cannot create project with name length > 300', async ({ page }) => {
  const projectData = createProjectData()
  const createProjectPageMobile = new CreateProjectPageMobile(page)
  const showProjectPageMobile = new ShowProjectPageMobile(page)
  const longName = 'm'.repeat(301)
  const longNameData = { ...projectData, name: longName }

  await test.step('Create project with long name', async () => {
    await createProjectPageMobile.goto()
    await createProjectPageMobile.assertVisible()
    await createProjectPageMobile.selectAddress(projectData.address)
    await createProjectPageMobile.fillProjectForm(longNameData)
    await createProjectPageMobile.submitForm()
    await expect(page).toHaveURL(routePatterns.projectsByExternalId)
    await showProjectPageMobile.assertVisible()
    await expect(showProjectPageMobile.nameLocator(longName.slice(0, 30))).toContainText(longName.slice(0, 30))
    await showProjectPageMobile.deleteProject()
  })
})
