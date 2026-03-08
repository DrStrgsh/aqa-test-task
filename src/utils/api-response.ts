import type { APIResponse } from '@playwright/test'

type Guard<T> = (value: unknown) => value is T

export async function getJsonResponse<T>(
  response: APIResponse,
  options?: {
    guard?: Guard<T>
  }
): Promise<T> {
  const bodyText = await response.text()
  let parsed: unknown

  try {
    parsed = JSON.parse(bodyText)
  } catch (error) {
    throw new Error(`Invalid JSON response: ${(error as Error).message}`)
  }

  if (options?.guard && !options.guard(parsed)) {
    throw new Error('Response body does not match expected schema')
  }

  return parsed as T
}
