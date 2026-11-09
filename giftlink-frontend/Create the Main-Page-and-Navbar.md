# Create the Main Page and Navbar

## GiftLink Frontend Hands-On Lab

**Estimated duration:** 60 minutes

This lab enhances the `"giftlink-frontend"` application by displaying available gifts on the main page and simplifying the navigation bar.

---

## Objectives

By completing this lab, you will:

- Fetch gifts from the backend API.
- Display gifts using the `"MainPage.js"` React component.
- Format gift dates.
- Display gift images or placeholders.
- Navigate users to gift details.
- Add `"Home"` and `"Gifts"` links to the navigation bar.
- Test the frontend and backend applications.
- Push your changes to GitHub.

---

## Prerequisites

Before starting:

- Complete the previous course modules.
- Push your previous changes to GitHub.
- Ensure the `"giftlink-frontend"` directory is available locally.
- Ensure the `"giftlink-backend"` directory is available locally.
- Have MongoDB installed and running.
- Configure Git with your username and email.

The `"giftlink-frontend"` directory is the working directory for this lab.

---

# Step 1: Implement the MainPage Component

Open the following file in your IDE:

"""
giftlink-frontend/src/components/MainPage/MainPage.js
"""

Update the component so that it fetches and displays all available gifts.

## MainPage Requirements

The `"MainPage.js"` component must:

- Fetch gifts from the backend API.
- Store the returned gifts in React state.
- Display each gift in a card.
- Display the gift image when one exists.
- Display a placeholder when no image is available.
- Display the gift name.
- Display the gift condition.
- Display the formatted date.
- Navigate to the gift details page.
- Apply a different style based on the gift condition.

---

## Task 1: Fetch Gifts

Use `"fetch()"` to send a `"GET"` request to the gifts API.

The API endpoint should use the configured backend URL:

"""
const url = `${urlConfig.backendUrl}/api/gifts`;
"""

The implementation should:

1. Send a request to the API.
2. Check whether the response is successful.
3. Convert the response to JSON.
4. Store the returned data in the `"gifts"` state.
5. Display an error message if the request fails.

Example implementation:

"""
const fetchGifts = async () => {
    try {
        const url = `${urlConfig.backendUrl}/api/gifts`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setGifts(data);
    } catch (error) {
        console.log("Fetch error: " + error.message);
    }
};

fetchGifts();
"""

The fetch operation should be called inside a `"useEffect()"` hook so that it runs when the component loads.

---

## Task 2: Navigate to the Details Page

Use the `"useNavigate()"` hook from `"react-router-dom"`.

When a user selects a gift, navigate to the gift details route:

"""
navigate(`/app/product/${productId}`);
"""

The product ID should come from the selected gift object.

---

## Task 3: Format the Gift Date

Gift timestamps are provided in seconds. JavaScript dates require milliseconds, so multiply the timestamp by `"1000"`.

Example:

"""
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);

    return date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
};
"""

The formatted date should be displayed on each gift card.

---

## Task 4: Display the Gift Image or Placeholder

Use conditional rendering to check whether the gift contains an image.

If an image exists, display it. Otherwise, display a placeholder message.

"""
<div className="image-placeholder">
    {gift.image ? (
        <img
            src={gift.image}
            alt={gift.name}
            className="card-img-top"
        />
    ) : (
        <div className="no-image-available">
            No Image Available
        </div>
    )}
</div>
"""

---

## Task 5: Display the Gift Name

Display the gift name using the `"gift.name"` property.

"""
<h5 className="card-title">
    {gift.name}
</h5>
"""

---

## Task 6: Display the Gift Date

Call the `"formatDate()"` function using `"gift.date_added"`.

"""
<p className="card-text date-added">
    {formatDate(gift.date_added)}
</p>
"""

---

## Task 7: Display the Gift Condition

The gift condition should be displayed on the card.

New gifts should use a success style, while other conditions should use a warning style.

"""
const getConditionClass = (condition) => {
    return condition === "New"
        ? "list-group-item-success"
        : "list-group-item-warning";
};
"""

Example usage:

"""
<p className={`card-text ${getConditionClass(gift.condition)}`}>
    {gift.condition}
</p>
"""

---

## MainPage Component Structure

The component should include:

- React state for the gifts.
- The `"useNavigate()"` hook.
- A `"useEffect()"` hook.
- A function for fetching gifts.
- A function for navigating to details.
- A function for formatting dates.
- A function for applying condition styles.
- A mapped list of gift cards.

The gifts should be rendered using:

"""
{gifts.map((gift) => (
    <div key={gift.id}>
        ...
    </div>
))}
"""

Each gift should have a unique `"key"` value.

---

# Step 2: Modify the Navbar Component

Open the following file:

"""
giftlink-frontend/src/components/Navbar/Navbar.js
"""

Update the component to provide direct navigation to the home page and the gifts page.

## Navigation Requirements

The navigation bar must include:

- A `"GiftLink"` brand link.
- A `"Home"` link pointing to `"home.html"`.
- A `"Gifts"` link pointing to the React application route.

Example:

"""
<li className="nav-item">
    <a className="nav-link" href="/home.html">
        Home
    </a>
</li>

<li className="nav-item">
    <a className="nav-link" href="/app">
        Gifts
    </a>
</li>
"""

The simplified navigation bar does not include authentication-related links in this lab.

---

## Expected Navbar Structure

The component should contain:

"""
<nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">
        GiftLink
    </a>

    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            ...
        </ul>
    </div>
</nav>
"""

---

# Step 3: Test the Application

## Start the Backend

1. Confirm that MongoDB is running.
2. Copy the MongoDB password.
3. Open the backend environment file:

"""
giftlink-backend/.env
"""

4. Add the required MongoDB password.
5. Open a new terminal.
6. Navigate to the backend directory:

"""
cd giftlink-backend
"""

7. Install the backend dependencies:

"""
npm install
"""

8. Start the backend server using the project's configured command.
9. Confirm that the backend API is running.
10. Confirm that the backend can serve the gift endpoints.

---

## Configure the Frontend

1. Launch the backend application on port `"3060"`.
2. Copy the backend URL.
3. Open the frontend directory.
4. Rename the environment file:

"""
giftlink-frontend/.env.sample
"""

to:

"""
giftlink-frontend/.env
"""

5. Add the backend URL to the frontend environment file.
6. Do not include a trailing slash in the backend URL.

Example:

"""
REACT_APP_BACKEND_URL=http://localhost:3060
"""

Use the environment variable name already defined in the project if it differs from this example.

---

## Start the Frontend

1. Open a new terminal.
2. Navigate to the frontend directory:

"""
cd giftlink-frontend
"""

3. Install the frontend dependencies:

"""
npm install
"""

4. Build the frontend application:

"""
npm run build
"""

5. Start the frontend:

"""
npm start
"""

6. Open the application on port `"3000"`.

---

## Browser Testing Checklist

Confirm that:

- [ ] The main page loads successfully.
- [ ] Gifts are fetched from the backend.
- [ ] Gift names are displayed.
- [ ] Gift conditions are displayed.
- [ ] Gift dates are formatted correctly.
- [ ] Gift images are displayed when available.
- [ ] `"No Image Available"` appears when a gift has no image.
- [ ] The `"Home"` link opens `"home.html"`.
- [ ] The `"Gifts"` link opens the main gifts page.
- [ ] The `"View Details"` button opens the correct details page.
- [ ] Clicking `"Get Started"` on the home page returns to the main page.
- [ ] No errors appear in the browser console.

---

# Step 4: Push Changes to GitHub

Before pushing your work, configure Git if necessary.

## Configure Git

"""
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
"""

Use your own name and email address.

---

## Stage the Changes

From the project directory, run:

"""
git add .
"""

This stages all modified files.

---

## Commit the Changes

Use a meaningful commit message:

"""
git commit -m "Update MainPage and Navbar components"
"""

---

## Push the Changes

Push the commit to GitHub:

"""
git push
"""

Confirm that the changes appear in the correct GitHub repository.

---

# Final Implementation Summary

## MainPage Component

The completed `"MainPage.js"` component should:

- Import React state and effect hooks.
- Import `"useNavigate"` from `"react-router-dom"`.
- Import the backend URL configuration.
- Fetch gifts from `"/api/gifts"`.
- Store gifts in state.
- Render gift cards.
- Display gift images or placeholders.
- Display gift names.
- Display gift conditions.
- Format and display gift dates.
- Navigate to `"/app/product/:productId"`.

## Navbar Component

The completed `"Navbar.js"` component should:

- Display the `"GiftLink"` brand.
- Link to `"/home.html"` for the home page.
- Link to `"/app"` for the gifts page.
- Provide a simplified navigation experience.

---

# Files Modified

The following files should be updated:

"""
giftlink-frontend/src/components/MainPage/MainPage.js
giftlink-frontend/src/components/Navbar/Navbar.js
"""

The following environment file may also be created or updated locally:

"""
giftlink-frontend/.env
"""

Do not commit sensitive passwords or private environment variables to GitHub.

---

# Lab Completion Checklist

- [ ] Fetch gifts from the backend API.
- [ ] Store gifts in React state.
- [ ] Display all available gifts.
- [ ] Display gift images.
- [ ] Display placeholders for missing images.
- [ ] Display gift names.
- [ ] Display gift conditions.
- [ ] Format gift timestamps.
- [ ] Add navigation to the details page.
- [ ] Add the `"Home"` navbar link.
- [ ] Add the `"Gifts"` navbar link.
- [ ] Configure the backend environment.
- [ ] Configure the frontend environment.
- [ ] Install backend dependencies.
- [ ] Install frontend dependencies.
- [ ] Build the frontend application.
- [ ] Start both applications.
- [ ] Test the application in a browser.
- [ ] Configure Git.
- [ ] Stage the changes.
- [ ] Commit the changes.
- [ ] Push the changes to GitHub.

---

# Key Takeaways

This lab demonstrates how to:

- Fetch API data in a React component.
- Manage asynchronous operations.
- Store API results using React state.
- Render lists of objects using `"map()"`.
- Conditionally render images and placeholders.
- Format Unix timestamps as readable dates.
- Navigate between React routes.
- Build reusable navigation components.
- Connect a React frontend to a backend API.
- Test a full-stack application locally.
- Commit and push project changes using Git.
