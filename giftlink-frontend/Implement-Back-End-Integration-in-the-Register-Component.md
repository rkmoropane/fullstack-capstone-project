# Implement Back-End Integration in the Register Component

**Estimated duration:** 40 minutes

## Overview

This hands-on lab connects the registration form in the `RegisterPage` component to the back-end registration API.

In the previous lab, the registration user interface was created with form fields and React state management. In this lab, the registration form will:

- Send user details to the back-end API.
- Register the user when the `"Register"` button is clicked.
- Store the authentication token in session storage.
- Update the global authentication state.
- Redirect the user to `"/app"` after successful registration.
- Display registration errors below the email field.
- Update the navigation bar to display the username and logout button.

## Objectives

By completing this lab, you will:

- Use React state to obtain the first name, last name, email, and password.
- Implement the `"handleRegister"` function.
- Call the back-end registration API.
- Configure an asynchronous `fetch` request.
- Process JSON data returned by the API.
- Store the authentication token in `"sessionStorage"`.
- Set the global login state using `"useAppContext"`.
- Navigate to the main application page after registration.
- Display registration errors to the user.
- Update the navigation bar for authenticated users.
- Push the completed changes to GitHub.

## Prerequisites

Before starting, ensure that:

- You have completed the previous labs.
- You have pushed your previous changes to GitHub.
- The `"giftlink-backend"` directory is available.
- The `"giftlink-frontend"` directory is available.
- The repository has been cloned to the local environment.
- The previous registration user interface has already been implemented.
- The authentication context has been configured.

---

## Registration Function Structure

The registration process is implemented inside the `"handleRegister"` function.

The function should:

"const handleRegister = async () => {
  try {
    // Step 1: Implement the API call
    // Step 2: Access the response data and update authentication state
  } catch (e) {
    // Handle errors
  }
};"

The lab is completed in two stages:

1. Implement the API request.
2. Process the API response and update the application state.

The `"navbar.js"` file is updated in a separate step.

---

# Step 1: Implement the API Call

In this step, connect the `RegisterPage` component to the back-end registration API.

## Required Imports

Import the back-end URL configuration from:

`"giftlink-frontend/src/config.js"`

Import the authentication context from:

`"giftlink-frontend/context/AuthContext.js"`

Import `"useNavigate"` from `"react-router-dom"` to navigate after successful registration.

### Required Imports

The component should include the following imports:

"import { urlConfig } from '../../config';"

"import { useAppContext } from '../../context/AuthContext';"

"import { useNavigate } from 'react-router-dom';"

## Add an Error State

Inside the `RegisterPage` component, create state for displaying registration errors:

"const [showerr, setShowerr] = useState('');"

This state will be displayed below the email input when the back end returns an error.

## Create Navigation and Authentication Variables

Create a local navigation variable and access `"setIsLoggedIn"` from the authentication context:

"const navigate = useNavigate();"

"const { setIsLoggedIn } = useAppContext();"

## Configure the Fetch Request

Use the configured back-end URL to call the registration API:

"const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  })
});"

## API Requirements

The request must:

- Use the `"POST"` method.
- Include the `"content-type"` header.
- Send the registration details as JSON.
- Use the URL from `"urlConfig.backendUrl"`.
- Send the request to `"/api/auth/register"`.

### Request URL

The complete API URL should follow this structure:

"`${urlConfig.backendUrl}/api/auth/register`"

### Request Method

Use:

"method: 'POST'"

### Request Headers

Use:

"headers: {
  'content-type': 'application/json',
}"

### Request Body

Send the form values using `"JSON.stringify"`:

"body: JSON.stringify({
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password
})"

## Error Handling

Wrap the asynchronous API call in a `"try...catch"` statement:

"try {
  // API request
} catch (e) {
  console.log('Error fetching details: ' + e.message);
}"

---

# Step 2: Process the API Response

After sending the registration request, process the JSON response returned by the back end.

## Required Tasks

You must:

1. Access the response as JSON.
2. Check whether an authentication token was returned.
3. Store the authentication token in session storage.
4. Store the user’s name and email.
5. Set the global login state to `"true"`.
6. Navigate to `"/app"`.
7. Check for registration errors.
8. Display the error message below the email field.

## Access the JSON Response

Convert the response to JSON:

"const json = await response.json();"

You may log the response while testing:

"console.log('json data', json);"

## Store User Details

If the response contains an authentication token, save the user information in session storage:

"if (json.authtoken) {
  sessionStorage.setItem('auth-token', json.authtoken);
  sessionStorage.setItem('name', firstName);
  sessionStorage.setItem('email', json.email);
}"

The following session storage keys are used:

| Key | Value |
|---|---|
| `"auth-token"` | Authentication token returned by the back end |
| `"name"` | Registered user’s first name |
| `"email"` | Registered user’s email address |

## Update the Login State

After storing the authentication details, update the global authentication state:

"setIsLoggedIn(true);"

This allows other components, such as the navigation bar, to recognize that the user is logged in.

## Navigate to the Main Page

After successful registration, navigate to the main application page:

"navigate('/app');"

## Handle Registration Errors

Check whether the response contains an error:

"if (json.error) {
  setShowerr(json.error);
}"

This stores the error message in the `"showerr"` state.

## Display the Error Message

Display the error below the email input:

"<div className="text-danger">{showerr}</div>"

The error should be visible to the user when registration fails.

---

# Step 3: Update `navbar.js`

After registration succeeds, the user is automatically logged in.

The navigation bar should display different controls depending on the authentication state.

## Logged-Out Navigation

When the user is not logged in, display:

- Login button
- Register button

## Logged-In Navigation

When the user is logged in, display:

- Username
- Profile navigation
- Logout button

## Required Authentication Context Values

Use the authentication context values:

"const {
  isLoggedIn,
  setIsLoggedIn,
  userName,
  setUserName
} = useAppContext();"

## Check Session Storage

Use `"useEffect"` to check the session storage values:

"const authTokenFromSession = sessionStorage.getItem('auth-token');"

"const nameFromSession = sessionStorage.getItem('name');"

If a valid authentication token and username exist, update the username:

"setUserName(nameFromSession);"

If the required authentication information is missing, clear the stored data and set the user to logged out:

"sessionStorage.removeItem('auth-token');"

"sessionStorage.removeItem('name');"

"sessionStorage.removeItem('email');"

"setIsLoggedIn(false);"

## Logout Functionality

Create a logout function that:

1. Removes the authentication token.
2. Removes the stored username.
3. Removes the stored email.
4. Updates the global login state.
5. Navigates to `"/app"`.

Example structure:

"const handleLogout = () => {
  sessionStorage.removeItem('auth-token');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('email');
  setIsLoggedIn(false);
  navigate('/app');
};"

## Profile Navigation

Create a function that navigates to the profile page:

"const profileSection = () => {
  navigate('/app/profile');
};"

The username can be displayed as a clickable navigation element:

"Welcome, {userName}"

## Conditional Navigation Rendering

Use the authentication state to conditionally display the correct navigation items:

"{isLoggedIn ? (
  <>
    <span>Welcome, {userName}</span>
    <button onClick={handleLogout}>Logout</button>
  </>
) : (
  <>
    <Link to="/app/login">Login</Link>
    <Link to="/app/register">Register</Link>
  </>
)}"

## Navigation Links

The navigation bar should include links for:

- Home
- Gifts
- Search
- Profile
- Login
- Register
- Logout

The profile link should only be available when the user is logged in.

---

# Step 4: Test the Application

Before pushing the changes to GitHub, test the application thoroughly.

## Expected Application Features

You should be able to see:

1. The main page displaying gift items.
2. The search page allowing users to search for gifts.
3. The registration page.
4. Successful user registration.
5. Automatic login after registration.
6. Redirection to `"/app"` after registration.
7. The username displayed in the navigation bar.
8. A logout button for authenticated users.
9. Registration errors displayed below the email input.
10. The profile page accessible from the username.

## Registration Testing

Test the following scenarios:

- Register with valid user details.
- Register with an existing email address.
- Submit the form with missing information.
- Submit an invalid email address.
- Confirm that the password is not displayed in the response.
- Confirm that the authentication token is stored in session storage.
- Confirm that the user is redirected after successful registration.
- Confirm that logout removes the session data.
- Confirm that the navigation bar changes after login and logout.

---

# Step 5: Push Changes to GitHub

After testing the application, push the updated front-end code to GitHub.

## Stage Changes

Stage all changes:

"git add ."

## Commit Changes

Commit the changes:

"git commit -m "Implement registration component authentication""

## Push Changes

Push the commit to GitHub:

"git push"

Verify that the updated files are visible in the correct repository.

---

# Final Verification Checklist

Before completing the lab, confirm that:

- The registration form collects the first name.
- The registration form collects the last name.
- The registration form collects the email address.
- The registration form collects the password.
- The `"handleRegister"` function is asynchronous.
- `"urlConfig"` is imported correctly.
- `"useAppContext"` is imported correctly.
- `"useNavigate"` is imported correctly.
- The error state has been created.
- The back-end URL is loaded from `"urlConfig.backendUrl"`.
- The API request uses the `"POST"` method.
- The request includes the JSON content type.
- The request body contains the user details.
- The response is converted to JSON.
- The authentication token is stored in `"sessionStorage"`.
- The user’s first name is stored in `"sessionStorage"`.
- The user’s email is stored in `"sessionStorage"`.
- The global login state is set to `"true"`.
- The user is redirected to `"/app"`.
- Registration errors are displayed below the email field.
- The navigation bar displays the username when logged in.
- The navigation bar displays a logout button when logged in.
- Logout removes the authentication data.
- The application redirects to `"/app"` after logout.
- The profile navigation works.
- All changes have been committed.
- All changes have been pushed to GitHub.

---

# Lab Summary

In this lab, the registration form was connected to the back-end registration API.

The completed registration flow is:

1. The user enters their first name, last name, email, and password.
2. The user clicks the `"Register"` button.
3. The front end sends the details to `"/api/auth/register"`.
4. The back end processes the registration request.
5. The response is converted from JSON.
6. The authentication token is stored in `"sessionStorage"`.
7. The user’s name and email are stored in `"sessionStorage"`.
8. The global login state is updated.
9. The user is redirected to `"/app"`.
10. The navigation bar displays the username and logout button.
11. Any registration error is displayed below the email input.

© IBM Corporation. All rights reserved.