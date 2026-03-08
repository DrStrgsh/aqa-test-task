export const routePatterns = {
  projectDetails: /\/projects\/\d+/,
  projectsByExternalId: /\/projects\/PRJ-[A-Z0-9]+/,
  usersSignIn: /\/users\/sign_in/,
} as const satisfies Record<string, RegExp>
