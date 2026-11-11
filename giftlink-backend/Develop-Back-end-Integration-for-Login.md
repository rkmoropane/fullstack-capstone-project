# Develop Back-End Integration for Login

**Estimated duration:** 30 minutes

## Overview

This hands-on lab focuses on developing and testing the login API for the `giftlink-backend` project.

The login endpoint will authenticate an existing user by:

- Connecting to MongoDB.
- Searching for the user’s email address.
- Comparing the submitted password with the stored encrypted password.
- Generating a JWT authentication token.
- Returning the authenticated user’s details.
- Handling invalid credentials and missing users.

## Objectives

By completing this lab, you will:

- Create a `"/login"` endpoint in `"routes/authRoutes.js"`.
- Connect the login route to the MongoDB database.
- Access the `"users"` collection.
- Check user credentials.
- Compare passwords securely.
- Create JWT authentication.
- Return the user’s name and email.
- Handle login errors.
- Test the login API using cURL.
- Push the completed changes to GitHub.

## Prerequisites

Before starting, ensure that:

- You have completed the previous modules.
- You have pushed your previous changes to GitHub.
- The `"giftlink-backend"` directory is available locally.
- The repository has been cloned to the local environment.
- The previous registration API has been implemented.
- MongoDB configuration is available.
- The required environment variables are configured.

---

# Step 1: Implement the `"/login"` Endpoint

Implement the login endpoint in `"routes/authRoutes.js"`.

The endpoint should be available through:

"POST /api/auth/login"

## Login Requirements

The endpoint must:

1. Connect to the `"giftsdb"` MongoDB database using `"connectToDatabase"` from `"db.js"`.
2. Access the `"users"` collection.
3. Search for the user’s email address.
4. Check whether the user exists.
5. Compare the submitted password with the stored encrypted password.
6. Return an appropriate error if the password does not match.
7. Retrieve the user’s details from the database.
8. Create a JWT using the user’s `"_id"` as the payload.
9. Return the authentication token, username, and email address.
10. Return an appropriate error if the user does not exist.
11. Handle unexpected server errors.

## Login Route Structure

The route should follow this general structure:

"router.post('/login', async (req, res) => {
  try {
    // Connect to MongoDB
    // Access the users collection
    // Search for the user
    // Compare the passwords
    // Create the JWT
    // Return the user details
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
});"

---

## Task 1: Connect to MongoDB

Connect to the `"giftsdb"` database through `"connectToDatabase"` in `"db.js"`.

The connection should allow the route to access the user data stored in MongoDB.

## Task 2: Access the Users Collection

Access the MongoDB `"users"` collection.

The collection contains the registered users and their encrypted passwords.

## Task 3: Check the User Credentials

Read the email address and password submitted in the request body.

Search the `"users"` collection for the submitted email address.

The email should be used to identify the correct user record.

## Task 4: Compare the Passwords

Compare the submitted password with the encrypted password stored in the database.

Use the password comparison method provided by the project’s password encryption library.

The application must not compare or store plain-text passwords.

If the password does not match, return an appropriate error response.

## Task 5: Fetch User Details

After locating the user and confirming the password, retrieve the required user details.

The response should include:

- Authentication token
- Username
- Email address

The response structure should be similar to:

"res.json({
  authtoken,
  userName,
  userEmail
});"

Do not return the user’s password.

## Task 6: Create JWT Authentication

Create a JWT after the credentials have been verified successfully.

The token payload should identify the user using their MongoDB `"_id"`.

Example payload structure:

"let payload = {
  user: {
    id: theUser._id.toString()
  }
};"

Use the JWT secret configured in the environment:

"const JWT_SECRET = process.env.JWT_SECRET;"

Do not hard-code or expose the JWT secret.

## Task 7: Handle a User Who Does Not Exist

If no matching user is found, log the error and return a `404` response.

Example structure:

"if (theUser) {
  // Continue with password validation and JWT creation
} else {
  logger.error('User not found');
  return res.status(404).json({
    error: 'User not found'
  });
}"

## Password Mismatch Handling

If the user exists but the password is incorrect, return an appropriate error message.

The response should not reveal sensitive information such as:

- The correct password
- The stored password hash
- The JWT secret
- Internal database details

---

# Step 2: Test the Login API

Start the back-end server and test the login endpoint using cURL or Postman.

## Login Endpoint

The endpoint should be available at:

"`http://localhost:3060/api/auth/login`"

The port may be different depending on your project configuration.

## Example cURL Request

Use a request similar to the following:

"curl --location 'http://localhost:3060/api/auth/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "email": "user@example.com",
    "password": "your-password"
  }'"

Replace the email address and password with valid test credentials.

## Security Note

The original lab request may include a temporary browser or workspace cookie.

Do not copy, commit, or share temporary cookies in your project files or GitHub repository.

Only include the headers required to test the API, such as:

"Content-Type: application/json"

## Verify the Response

A successful response should include:

- `"authtoken"`
- `"userName"`
- `"userEmail"`

For an invalid email address, the API should return an appropriate user-not-found response.

For an incorrect password, the API should return an appropriate password-mismatch response.

---

# Step 3: Assessment Requirements

## Option 1: AI-Graded Submission

For AI-graded evaluation:

1. Run the login API using cURL.
2. Copy the cURL command and its output.
3. Save the information in a text file named `"login"`.
4. Include only the required response information.

> **Important:** Copy only `"userName"` and `"userEmail"` from the response. Do not include `"authtoken"` because it may cause issues during final submission.

## Option 2: Peer-Graded Submission

For peer-graded evaluation:

1. Successfully deploy the application.
2. Take a screenshot showing the successful deployment.
3. Submit the screenshot as required.

The deployment process is covered in:

"Module 5 Hands-on Lab: Containerize and Deploy the Application"

---

# Step 4: Push Changes to GitHub

After implementing and testing the login endpoint, push the changes to GitHub.

## Configure Git Identity

If Git is not already configured, set your username and email:

"git config --global user.name "Your Name""

"git config --global user.email "your-email@example.com""

## Stage Changes

Stage all modified and new files:

"git add ."

## Commit Changes

Commit the changes with a descriptive message:

"git commit -m "Implement login API endpoint""

## Push Changes

Push the changes to the remote repository:

"git push"

Verify that `"authRoutes.js"` and all related changes are visible in GitHub.

---

# Step 5: Final Solution and Repository Submission

The final solution should include:

- The existing `"/register"` API.
- The new `"/login"` API.
- MongoDB database integration.
- Password comparison logic.
- JWT authentication.
- Error handling.
- Successful API testing.

The completed file should be:

`"routes/authRoutes.js"`

For both assessment options:

1. Push `"authRoutes.js"` and all required project files to GitHub.
2. Confirm that the code is available in the repository.
3. Copy the public GitHub repository URL.
4. Submit the repository link for evaluation.

---

# Final Verification Checklist

Before completing the lab, confirm that:

- The `"/login"` endpoint exists.
- The route is defined in `"routes/authRoutes.js"`.
- The application connects to the `"giftsdb"` database.
- The `"users"` collection is accessed.
- The submitted email is checked against the database.
- The user-not-found case is handled.
- The submitted password is compared with the encrypted password.
- Password mismatch errors are handled.
- A JWT is created after successful authentication.
- The JWT uses the user’s `"_id"` as the payload.
- The JWT secret is loaded securely from the environment.
- The response includes `"authtoken"`.
- The response includes `"userName"`.
- The response includes `"userEmail"`.
- Passwords and password hashes are not returned.
- Unexpected errors return an internal server error.
- The endpoint has been tested using cURL or Postman.
- Temporary cookies and secrets have not been committed.
- The assessment file named `"login"` has been created if required.
- The changes have been committed.
- The changes have been pushed to GitHub.
- The GitHub repository URL has been saved for submission.

---

# Lab Summary

In this lab, you implement the back-end login integration for the GiftLink application.

The completed login flow is:

1. The user submits an email address and password.
2. The front end sends the credentials to `"/api/auth/login"`.
3. The back end connects to MongoDB.
4. The user is searched for in the `"users"` collection.
5. The submitted password is compared with the encrypted database password.
6. Invalid credentials return an appropriate error.
7. A valid user receives a JWT authentication token.
8. The API returns the username and email address.
9. The endpoint is tested using cURL or Postman.
10. The completed changes are pushed to GitHub.

© IBM Corporation. All rights reserved.
