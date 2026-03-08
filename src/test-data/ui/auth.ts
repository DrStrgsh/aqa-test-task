function getAuthData(
  emailKey: string,
  passwordKey: string,
  userType: 'UI' | 'API'
): { email: string; password: string } {
  const email = process.env[emailKey]?.trim()
  const password = process.env[passwordKey]?.trim()

  if (!email || !password) {
    throw new Error(`${userType} test user credentials are not set (.env)`)
  }

  return { email, password }
}

export function getUiAuthData(): { email: string; password: string } {
  return getAuthData('UI_TEST_USER_EMAIL', 'UI_TEST_USER_PASSWORD', 'UI')
}
