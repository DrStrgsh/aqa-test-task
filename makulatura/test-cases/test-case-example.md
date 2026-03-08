# Test Case ID
TC-UI-LOGIN-001

# Title
User can log in with valid credentials

# Description
Verify that a user can successfully log in using valid credentials.

Test credentials used for this test:

- **Email:** \<some email\>
- **Password:** \<some pass\>

The test validates that the login modal works correctly, authentication is successful, the user is redirected to the main page, and authenticated content becomes visible.

# Preconditions
- The user account exists in the system.
- The user is **not logged in**.
- The web application is accessible.
- The user has valid credentials:
  - Email: `<some email>`
  - Password: `<some pass>`

# Test Steps

| Step | Action | Expected Result |
|-----|------|----------------|
| 1 | Open the main page of the application | The main page loads successfully |
| 2 | Verify that the **Main Page** is visible | Main page elements are displayed |
| 3 | Click the **Login** button | The **Login modal** opens |
| 4 | Verify that the **Login modal** content is visible | Fields **Email**, **Password**, and **Login button** are displayed |
| 5 | Enter valid email `<some email>` | Email is accepted by the form |
| 6 | Enter valid password `<some pass>` | Password is accepted by the form |
| 7 | Click the **Login** button | Login request is sent |
| 8 | Verify the page URL | URL becomes `/` |
| 9 | Verify that the **Authenticated Main Page** is visible | Main page elements for a logged-in user are displayed |

# Expected Result
The user successfully logs into the system and is redirected to the **Main Page**.

# Postconditions
The user is logged into the system.

# Test Type
UI / Authentication / Positive
