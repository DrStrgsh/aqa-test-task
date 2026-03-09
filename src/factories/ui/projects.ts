export interface ProjectData {
  jurisdiction: string
  name: string
  address: string
  apartmentNumber?: string
}

export function createProjectData(jurisdiction: string = 'Airway Heights', overrides: Partial<ProjectData> = {}): ProjectData {
  const randomSuffix = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0')
  return {
    jurisdiction: jurisdiction,
    name: `Test Project ${Date.now()}-${randomSuffix}`,
    address: 'Asdale Court, Kennesaw, Georgia 30152, United States',
    apartmentNumber: '123',
    ...overrides,
  }
}
