export interface ProjectData {
  jurisdiction: string
  name: string
  address: string
  apartmentNumber?: string
}

export function createProjectData(jurisdiction: string = 'Airway Heights', overrides: Partial<ProjectData> = {}): ProjectData {
  return {
    jurisdiction: jurisdiction,
    name: `Test Project ${Date.now()}`,
    address: 'Alaska',
    apartmentNumber: '123',
    ...overrides,
  }
}
