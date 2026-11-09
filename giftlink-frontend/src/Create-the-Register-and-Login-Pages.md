# Create the Register and Login Pages

## GiftLink Frontend Hands-On Lab

**Estimated duration:** 50 minutes

This lab adds registration and login pages to the `"giftlink-frontend"` React application.

You will create two React components:

- `"RegisterPage"`
- `"LoginPage"`

Both components will use the React `"useState"` hook to manage form input values. You will also add navigation routes using `"react-router-dom"`.

---

## Objectives

By completing this lab, you will:

- Create the `"RegisterPage"` component.
- Create the `"LoginPage"` component.
- Manage form inputs with `"useState"`.
- Create registration and login forms.
- Implement `"handleRegister()"`.
- Implement `"handleLogin()"`.
- Add styling using CSS.
- Add routes in `"App.js"`.
- Navigate between the login and registration pages.
- Push the completed work to GitHub.

---

## Prerequisites

Before starting:

- Complete the previous labs.
- Push your previous changes to GitHub.
- Ensure the `"giftlink-frontend"` project is available locally.
- Use the repository containing your previous lab work.
- Have Node.js and npm installed.

The working directory for this lab is:

"""
giftlink-frontend
"""

---

# Step 1: Develop the RegisterPage Component

Create the following folder:

"""
giftlink-frontend/src/components/RegisterPage
"""

Inside this folder, create:

"""
RegisterPage.js
RegisterPage.css
"""

---

## RegisterPage Requirements

The registration page must:

- Store the first name in state.
- Store the last name in state.
- Store the email in state.
- Store the password in state.
- Display labeled input fields.
- Update state when users type.
- Provide a `"Register"` button.
- Call `"handleRegister()"` when the button is clicked.
- Display a link to the login page.
- Apply CSS styling.

---

## RegisterPage State Variables

Import `"useState"` from React and create state variables:

"""
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
"""

These values should update as the user types into the form fields.

---

## RegisterPage Submission Function

Create a `"handleRegister()"` function.

For this lab, the function only needs to print a message to the browser console:

"""
const handleRegister = async () => {
    console.log("Register invoked");
};
"""

The registration API will be implemented in a later stage.

---

## RegisterPage Input Fields

Create labeled input fields for:

- First name
- Last name
- Email
- Password

Example first-name field:

"""
<div className="mb-4">
    <label htmlFor="firstName" className="form-label">
        First Name
    </label>

    <input
        id="firstName"
        type="text"
        className="form-control"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
    />
</div>
"""

Use the same controlled-input pattern for the remaining fields.

### Last Name Field

"""
<div className="mb-4">
    <label htmlFor="lastName" className="form-label">
        Last Name
    </label>

    <input
        id="lastName"
        type="text"
        className="form-control"
        placeholder="Enter your last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
    />
</div>
"""

### Email Field

"""
<div className="mb-4">
    <label htmlFor="email" className="form-label">
        Email
    </label>

    <input
        id="email"
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
</div>
"""

### Password Field

"""
<div className="mb-4">
    <label htmlFor="password" className="form-label">
        Password
    </label>

    <input
        id="password"
        type="password"
        className="form-control"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
</div>
"""

---

## Register Button

Create a button that calls `"handleRegister()"` when clicked:

"""
<button
    className="btn btn-primary w-100 mb-3"
    onClick={handleRegister}
>
    Register
</button>
"""

---

## Login Navigation Link

Add a link for users who already have an account:

"""
<p className="mt-4 text-center">
    Already a member?
    <a href="/app/login" className="text-primary">
        Login
    </a>
</p>
"""

---

## RegisterPage Layout

The page can use the following structure:

"""
<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
            <div className="register-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">
                    Register
                </h2>

                <!-- Registration fields go here -->

                <!-- Register button goes here -->

                <!-- Login link goes here -->
            </div>
        </div>
    </div>
</div>
"""

---

## RegisterPage CSS

Add the following styles to:

"""
giftlink-frontend/src/components/RegisterPage/RegisterPage.css
"""

"""
.register-card {
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.register-card .form-label {
    font-weight: 600;
}

.register-card input {
    border-radius: 0.25rem;
}

.register-card .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
}

.register-card .btn-primary {
    background-color: #0056b3;
    border: none;
}

.register-card .btn-secondary {
    background-color: #dc3545;
    border: none;
}

.register-card .text-primary {
    color: #0056b3;
}

.register-card .text-secondary {
    color: #6c757d;
}

a.text-primary:hover {
    text-decoration: underline;
}

a.text-secondary:hover {
    text-decoration: underline;
}
"""

---

## RegisterPage Import Requirements

The component should import React state and its CSS file:

"""
import React, { useState } from "react";
import "./RegisterPage.css";
"""

---

# Step 2: Develop the LoginPage Component

Create the following folder:

"""
giftlink-frontend/src/components/LoginPage
"""

Inside this folder, create:

"""
LoginPage.js
LoginPage.css
"""

---

## LoginPage Requirements

The login page must:

- Store the email in state.
- Store the password in state.
- Display labeled input fields.
- Update state when users type.
- Provide a `"Login"` button.
- Call `"handleLogin()"` when the button is clicked.
- Display a link to the registration page.
- Apply CSS styling.

---

## LoginPage State Variables

Create state variables for email and password:

"""
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
"""

---

## LoginPage Submission Function

Create a `"handleLogin()"` function:

"""
const handleLogin = async () => {
    console.log("Login invoked");
};
"""

For this lab, the function only prints a message to the console. Authentication will be implemented later.

---

## LoginPage Input Fields

### Email Field

"""
<div className="mb-4">
    <label htmlFor="email" className="form-label">
        Email
    </label>

    <input
        id="email"
        type="email"
        className="form-control"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
</div>
"""

### Password Field

"""
<div className="mb-4">
    <label htmlFor="password" className="form-label">
        Password
    </label>

    <input
        id="password"
        type="password"
        className="form-control"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
    />
</div>
"""

---

## Login Button

Create a button that calls `"handleLogin()"`:

"""
<button
    className="btn btn-primary w-100 mb-3"
    onClick={handleLogin}
>
    Login
</button>
"""

---

## Registration Navigation Link

Add a link for users who do not have an account:

"""
<p className="mt-4 text-center">
    New here?
    <a href="/app/register" className="text-primary">
        Register Here
    </a>
</p>
"""

---

## LoginPage Layout

Use the following layout:

"""
<div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
            <div className="login-card p-4 border rounded">
                <h2 className="text-center mb-4 font-weight-bold">
                    Login
                </h2>

                <!-- Login fields go here -->

                <!-- Login button goes here -->

                <!-- Registration link goes here -->
            </div>
        </div>
    </div>
</div>
"""

---

## LoginPage CSS

Add styling to:

"""
giftlink-frontend/src/components/LoginPage/LoginPage.css
"""

"""
.login-card {
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.login-card .form-label {
    font-weight: 600;
}

.login-card input {
    border-radius: 0.25rem;
}

.login-card .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
}

.login-card .btn-primary {
    background-color: #0056b3;
    border: none;
}

.login-card .text-primary {
    color: #0056b3;
}

.login-card .text-secondary {
    color: #6c757d;
}

.login-card a:hover {
    text-decoration: underline;
}
"""

---

## LoginPage Import Requirements

The component should import React state and its CSS file:

"""
import React, { useState } from "react";
import "./LoginPage.css";
"""

---

# Step 3: Create Routes in App.js

Open:

"""
giftlink-frontend/src/App.js
"""

Import both page components:

"""
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
"""

Add routes inside the `"Routes"` component:

"""
<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/app" element={<MainPage />} />
    <Route path="/app/login" element={<LoginPage />} />
    <Route path="/app/register" element={<RegisterPage />} />
</Routes>
"""

---

## Required Routes

| Route | Component | Purpose |
|---|---|---|
| `"/"` | `"MainPage"` | Displays the main page |
| `"/app"` | `"MainPage"` | Displays the gifts page |
| `"/app/login"` | `"LoginPage"` | Displays the login form |
| `"/app/register"` | `"RegisterPage"` | Displays the registration form |

---

## App.js Structure

The relevant structure should look like this:

"""
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/app" element={<MainPage />} />
                <Route path="/app/login" element={<LoginPage />} />
                <Route
                    path="/app/register"
                    element={<RegisterPage />}
                />
            </Routes>
        </>
    );
}

export default App;
"""

---

# Step 4: Test the Pages

Start the frontend application using the project's normal commands.

From the frontend directory:

"""
cd giftlink-frontend
npm install
npm start
"""

Open the application in the browser and test the following routes:

"""
http://localhost:3000/app/register
http://localhost:3000/app/login
"""

---

## Registration Page Testing

Confirm that:

- [x] The registration page loads.
- [x] The first-name field is visible.
- [x] The last-name field is visible.
- [x] The email field is visible.
- [x] The password field is visible.
- [x] Input values update as you type.
- [x] Clicking `"Register"` calls `"handleRegister()"`.
- [x] `"Register invoked"` appears in the browser console.
- [x] The `"Login"` link opens `"/app/login"`.
- [x] The styling is applied correctly.

---

## Login Page Testing

Confirm that:

- [x] The login page loads.
- [x] The email field is visible.
- [x] The password field is visible.
- [x] Input values update as you type.
- [x] Clicking `"Login"` calls `"handleLogin()"`.
- [x] `"Login invoked"` appears in the browser console.
- [x] The `"Register Here"` link opens `"/app/register"`.
- [x] The styling is applied correctly.

---

# Step 5: Push Changes to GitHub

After testing the application, push the changes to GitHub.

## Stage the Changes

From the project directory, run:

"""
git add .
"""

---

## Commit the Changes

Use a meaningful commit message:

"""
git commit -m "Add registration and login pages"
"""

---

## Push the Changes

Push the commit to GitHub:

"""
git push
"""

If GitHub requests authentication, use your personal access token as the password or authentication token.

---

# Assessment Submission

For the assessment, copy the public GitHub URLs for:

"""
RegisterPage.js
LoginPage.js
"""

Save the URLs in a text file before submitting.

Example URL format:

"""
https://github.com/your-username/your-repository/blob/main/giftlink-frontend/src/components/RegisterPage/RegisterPage.js
"""

"""
https://github.com/your-username/your-repository/blob/main/giftlink-frontend/src/components/LoginPage/LoginPage.js
"""

Make sure that the repository and files are publicly accessible if required by the assessment.

---

# Files Created

The following files should be created:

"""
giftlink-frontend/src/components/RegisterPage/RegisterPage.js
giftlink-frontend/src/components/RegisterPage/RegisterPage.css
giftlink-frontend/src/components/LoginPage/LoginPage.js
giftlink-frontend/src/components/LoginPage/LoginPage.css
"""

---

# Files Modified

The following file should be updated:

"""
giftlink-frontend/src/App.js
"""

---

# Lab Completion Checklist

- [x] Create the `"RegisterPage"` folder.
- [x] Create `"RegisterPage.js"`.
- [x] Create `"RegisterPage.css"`.
- [x] Add registration state variables.
- [x] Add first-name input.
- [x] Add last-name input.
- [x] Add email input.
- [x] Add password input.
- [x] Add `"handleRegister()"`.
- [x] Add the `"Register"` button.
- [x] Add the login navigation link.
- [x] Style the registration page.
- [x] Create the `"LoginPage"` folder.
- [x] Create `"LoginPage.js"`.
- [x] Create `"LoginPage.css"`.
- [x] Add login state variables.
- [x] Add email input.
- [x] Add password input.
- [x] Add `"handleLogin()"`.
- [x] Add the `"Login"` button.
- [x] Add the registration navigation link.
- [x] Style the login page.
- [x] Import both pages into `"App.js"`.
- [x] Add the login route.
- [x] Add the registration route.
- [x] Test both pages.
- [x] Commit the changes.
- [x] Push the changes to GitHub.
- [x] Copy the public GitHub URLs for assessment.

---

# Key Takeaways

This lab demonstrates how to:

- Create reusable React components.
- Use `"useState"` to manage form values.
- Build controlled form inputs.
- Handle button click events.
- Navigate between pages with `"react-router-dom"`.
- Add routes using `"Routes"` and `"Route"`.
- Organize component-specific CSS files.
- Test forms in a React application.
- Share project files through GitHub.
