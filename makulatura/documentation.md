# Test Documentation

## Description of executed test cases

### Scope
- Functional UI tests for the staging app: `https://staging-stack.alynea.io/`
- API tests for `https://automationexercise.com` endpoints
- Execution includes desktop and mobile browser contexts
- Smoke, sanity, regression, etc tests were not explicitly marked in this project since this was not required by the task and the total number of tests is small, but this can be done easily if needed.
- Deletion of test objects created during a test after the test in which they were created has finished. (Under normal circumstances, creation and deletion would be performed via API, if there were no requirement to delete them specifically within the UI end-to-end flow.)

### Executed test cases

The following cases are covered by automated tests:

1. Authentication (desktop UI)
   - Valid login
   - Invalid email format
   - Wrong password
   - Empty credentials
2. Authentication (mobile UI)
   - Valid login
   - Invalid email format
   - Wrong password
   - Empty credentials
3. Projects (authenticated UI)
   - Navigate to Projects from authenticated home
   - Open Create Project page
   - Project CRUD flow: create, read, delete
   - Required-field validation in create form
   - Non-address value into address field validation
4. Navigation (mobile)
   - Footer links (Home, Inspections, Notifications, More)
5. API endpoints
   - `GET /api/productsList`
   - `POST /api/productsList` (negative)
   - `GET /api/brandsList`
   - `PUT /api/brandsList` (negative)
   - `POST /api/searchProduct` (positive and missing parameter)
   - `POST /api/verifyLogin` (invalid credentials)
   - User lifecycle e2e: create → verify → details → update → delete
   - Negative lifecycle check: deleted user cannot login

## List of bugs
Stored in ./bug-reports
Also bugs (more time is needed to create additional bug reports):
- [Buttons are cutted](https://prnt.sc/cjH91h4grSl2)
- [Chaotic field position in forms](https://prnt.sc/K6rW6V6BRGux)
- [Some buttons are simply located outside the screen. (You need to scroll sideways to see them.)](https://prnt.sc/ITPmt0hZyB8m)
- [As well as design decisions regarding the positioning of the Title and the Button.](https://prnt.sc/dO5kkNmnJ42F)
- [On small monitor screens, the text overflows beyond the boundaries of the components.](https://prnt.sc/FpPvVnTAikwd)
- Unstable map on the **Create Custom Project** page. The **Address** field freezes when trying to change the address.

## Short test summary:
### For all devices
- Tests: 51
- Passed: 35
- Failed: 16
