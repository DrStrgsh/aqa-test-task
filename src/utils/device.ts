import type { Page } from '@playwright/test'

export function isMobileViewport(page: Page, maxWidth = 768): boolean {
  const viewport = page.viewportSize()
  return !!(viewport && viewport.width <= maxWidth)
}
