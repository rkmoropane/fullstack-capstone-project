# Implement the Details Page

## GiftLink Frontend Hands-On Lab

**Estimated duration:** 60 minutes

This lab adds a protected details page to the `"giftlink-frontend"` React application. Users will be able to view detailed information about an individual gift, see comments, and navigate back to the previous page.

---

## Objectives

By completing this lab, you will:

- Create the `"DetailsPage"` component.
- Check whether a user is authenticated.
- Redirect unauthenticated users to the login page.
- Fetch gift details using the gift ID from the URL.
- Display the gift image or a placeholder.
- Display gift information.
- Render comments dynamically.
- Add a back-navigation button.
- Scroll to the top when the page loads.
- Handle loading and error states.
- Style the details page with CSS.
- Add the details route to `"App.js"`.
- Push the changes to GitHub.

---

## Prerequisites

Before starting:

- Complete the previous modules.
- Push all previous changes to GitHub.
- Ensure the `"giftlink-frontend"` project is available locally.
- Confirm that the backend API is running.
- Confirm that gift details can be accessed through the backend API.

The working directory is:

"""
giftlink-frontend
"""

---

# Step 1: Create the DetailsPage Component

Create the following folder:

"""
giftlink-frontend/src/components/DetailsPage
"""

Inside the folder, create:

"""
DetailsPage.js
DetailsPage.css
"""

---

## DetailsPage Requirements

The component must:

- Read the gift ID from the URL.
- Check for an authentication token.
- Redirect unauthenticated users to `"/app/login"`.
- Fetch gift details from the backend API.
- Display a loading message while fetching.
- Display an error message if the request fails.
- Display a message if the gift cannot be found.
- Scroll to the top when the component mounts.
- Allow users to navigate back.
- Display the gift image or a placeholder.
- Display the gift name.
- Display the category.
- Display the condition.
- Display the date added.
- Display the age.
- Display the description.
- Render comments using `"map()"`.

---

## Required Imports

The component should import React hooks, routing hooks, CSS, and the backend configuration:

"""
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DetailsPage.css";
import { urlConfig } from "../../config";
"""

---

## Task 1: Check Authentication

Retrieve the authentication token from `"sessionStorage"`:

"""
const authenticationToken = sessionStorage.getItem("auth-token");
"""

If no token exists, redirect the user to the login page:

"""
if (!authenticationToken) {
    navigate("/app/login");
    return;
}
"""

The `"return"` is important because it prevents the component from continuing to fetch protected gift data after redirecting the user.

---

## Task 2: Read the Gift ID from the URL

Use `"useParams()"` to retrieve the `"productId"` route parameter:

"""
const { productId } = useParams();
"""

The value will come from this route:

"""
/app/product/:productId
"""

---

## Task 3: Fetch Gift Details

Fetch the selected gift using the backend API:

"""
const url = `${urlConfig.backendUrl}/api/gifts/${productId}`;
const response = await fetch(url);
"""

The fetch process should:

1. Build the API URL.
2. Send a `"GET"` request.
3. Check whether the response is successful.
4. Convert the response to JSON.
5. Store the gift in state.
6. Handle any errors.
7. Stop the loading state.

Example:

"""
const fetchGift = async () => {
    try {
        const url =
            `${urlConfig.backendUrl}/api/gifts/${productId}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setGift(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};
"""

---

## Task 4: Scroll to the Top

Use `"window.scrollTo(0, 0)"` when the component loads:

"""
window.scrollTo(0, 0);
"""

This ensures that users see the beginning of the details page instead of remaining at the previous scroll position.

---

## Task 5: Navigate Back

Create a function that returns the user to the previous page:

"""
const handleBackClick = () => {
    navigate(-1);
};
"""

Add a back button to the page:

"""
<button
    className="btn btn-secondary mb-3"
    onClick={handleBackClick}
>
    Back
</button>
"""

---

## Task 6: Display the Gift Image

Check whether the gift has an image.

If an image exists, display it:

"""
<img
    src={gift.image}
    alt={gift.name}
    className="product-image-large"
/>
"""

If no image exists, display a placeholder:

"""
<div className="no-image-available-large">
    No Image Available
</div>
"""

Use conditional rendering:

"""
<div className="image-placeholder-large">
    {gift.image ? (
        <img
            src={gift.image}
            alt={gift.name}
            className="product-image-large"
        />
    ) : (
        <div className="no-image-available-large">
            No Image Available
        </div>
    )}
</div>
"""

---

## Task 7: Display Gift Details

Display the following properties from the gift object:

- `"gift.name"`
- `"gift.category"`
- `"gift.condition"`
- `"gift.date_added"`
- `"gift.age"`
- `"gift.description"`

Example:

"""
<p>
    <strong>Category:</strong>
    {gift.category}
</p>

<p>
    <strong>Condition:</strong>
    {gift.condition}
</p>

<p>
    <strong>Date Added:</strong>
    {gift.date_added}
</p>

<p>
    <strong>Age:</strong>
    {gift.age}
</p>

<p>
    <strong>Description:</strong>
    {gift.description}
</p>
"""

### Important Property Name

Use the property name returned by your backend.

If the API returns `"date_added"`, use:

"""
gift.date_added
"""

If the API returns `"dateAdded"`, use:

"""
gift.dateAdded
"""

The frontend property must match the backend response exactly.

---

## Task 8: Render the Comments Section

Create a comments array:

"""
const comments = [
    {
        author: "John Doe",
        comment: "I would like this!"
    },
    {
        author: "Jane Smith",
        comment: "Just DMed you."
    },
    {
        author: "Alice Johnson",
        comment: "I will take it if it is still available."
    }
];
"""

Render each comment with `"map()"`:

"""
{comments.map((comment, index) => (
    <div key={index} className="card mb-3">
        <div className="card-body">
            <p className="comment-author">
                <strong>{comment.author}:</strong>
            </p>

            <p className="comment-text">
                {comment.comment}
            </p>
        </div>
    </div>
))}
"""

Each rendered comment should have a unique `"key"`.

---

## Loading, Error, and Empty States

Display a loading message while the API request is running:

"""
if (loading) {
    return <div>Loading...</div>;
}
"""

Display an error message when the request fails:

"""
if (error) {
    return <div>Error: {error}</div>;
}
"""

Display a message if no gift is returned:

"""
if (!gift) {
    return <div>Gift not found</div>;
}
"""

---

## DetailsPage Component Structure

The component should follow this general structure:

"""
function DetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const authenticationToken =
            sessionStorage.getItem("auth-token");

        if (!authenticationToken) {
            navigate("/app/login");
            return;
        }

        const fetchGift = async () => {
            try {
                const url =
                    `${urlConfig.backendUrl}/api/gifts/${productId}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok"
                    );
                }

                const data = await response.json();
                setGift(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGift();
        window.scrollTo(0, 0);
    }, [productId, navigate]);

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!gift) {
        return <div>Gift not found</div>;
    }

    return (
        <div>
            <!-- Details page content -->
        </div>
    );
}
"""

---

# Step 2: Add the Details Route

Open:

"""
giftlink-frontend/src/App.js
"""

Import the component:

"""
import DetailsPage from "./components/DetailsPage/DetailsPage";
"""

Add the route inside `"Routes"`:

"""
<Route
    path="/app/product/:productId"
    element={<DetailsPage />}
/>
"""

---

## App.js Route Structure

Your routes should include:

"""
<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/app" element={<MainPage />} />
    <Route path="/app/login" element={<LoginPage />} />
    <Route path="/app/register" element={<RegisterPage />} />
    <Route
        path="/app/product/:productId"
        element={<DetailsPage />}
    />
</Routes>
"""

The route parameter `"productId"` must match the value retrieved with `"useParams()"`.

---

# Step 3: Style the Details Page

Open:

"""
giftlink-frontend/src/components/DetailsPage/DetailsPage.css
"""

---

## Image Placeholder Styling

The image container should use the full available width and have a large fixed height:

"""
.image-placeholder-large {
    width: 100%;
    height: 400px;
    position: relative;
    background-color: #f0f0f0;
    overflow: hidden;
}
"""

---

## Product Image Styling

Make the product image fill the container:

"""
.product-image-large {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
"""

---

## Missing Image Placeholder Styling

Center the placeholder text using Flexbox:

"""
.no-image-available-large {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    color: #333;
    font-size: 18px;
}
"""

---

## Card Header Styling

Style the card header to match the application theme:

"""
.card-header {
    background-color: #007bff;
    color: #fff;
    text-align: center;
    padding: 15px;
}
"""

---

## Details Title Styling

The title should be clearly visible against the card header:

"""
.details-title {
    margin: 0;
    font-size: 28px;
    color: #fff;
    font-weight: bold;
}
"""

The title color should be white because the card header has a blue background.

---

## Comments Section Styling

Add spacing and improve readability:

"""
.comments-section {
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.comments-section .card {
    margin-bottom: 15px;
}

.comments-section .comment-author {
    font-weight: bold;
    margin-bottom: 8px;
}

.comments-section .comment-text {
    color: #555;
    margin-bottom: 0;
}
"""

---

## Complete DetailsPage.css Example

"""
.image-placeholder-large {
    width: 100%;
    height: 400px;
    position: relative;
    background-color: #f0f0f0;
    overflow: hidden;
}

.product-image-large {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.no-image-available-large {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #ccc;
    color: #333;
    font-size: 18px;
}

.card-header {
    background-color: #007bff;
    color: #fff;
    text-align: center;
    padding: 15px;
}

.details-title {
    margin: 0;
    font-size: 28px;
    color: #fff;
    font-weight: bold;
}

.comments-section {
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.comments-section .card {
    margin-bottom: 15px;
}

.comments-section .comment-author {
    font-weight: bold;
    margin-bottom: 8px;
}

.comments-section .comment-text {
    color: #555;
    margin-bottom: 0;
}
"""

---

# Step 4: Test the Details Page

Start the backend and frontend applications according to the project's existing setup.

Open the application and navigate to a gift details route:

"""
http://localhost:3000/app/product/PRODUCT_ID
"""

Replace `"PRODUCT_ID"` with a valid gift ID from the database.

---

## Authentication Testing

Confirm that:

- [ ] A logged-in user can access the details page.
- [ ] A user without `"auth-token"` is redirected to `"/app/login"`.
- [ ] The gift API is not fetched after an unauthenticated redirect.
- [ ] The login page opens correctly.

To test an authenticated user, ensure that the expected token exists in `"sessionStorage"`:

"""
sessionStorage.setItem("auth-token", "your-token");
"""

Use a valid token according to the project's authentication system.

---

## Details Page Testing

Confirm that:

- [ ] The details page loads.
- [ ] A loading message appears while data is being fetched.
- [ ] The gift name is displayed.
- [ ] The gift image is displayed when available.
- [ ] `"No Image Available"` appears when there is no image.
- [ ] The gift category is displayed.
- [ ] The gift condition is displayed.
- [ ] The date added is displayed.
- [ ] The gift age is displayed.
- [ ] The gift description is displayed.
- [ ] Comments are rendered correctly.
- [ ] The back button returns to the previous page.
- [ ] The page scrolls to the top when loaded.
- [ ] API errors display an appropriate message.
- [ ] Missing gifts display `"Gift not found"`.
- [ ] The page styling is applied correctly.
- [ ] No errors appear in the browser console.

---

# Step 5: Push Changes to GitHub

After implementing and testing the details page, push the changes to GitHub.

## Stage the Changes

"""
git add .
"""

---

## Commit the Changes

Use a descriptive commit message:

"""
git commit -m "Implement gift details page"
"""

---

## Push the Changes

"""
git push
"""

Confirm that the updated files appear in your GitHub repository.

---

# Files Created

Create the following files:

"""
giftlink-frontend/src/components/DetailsPage/DetailsPage.js
giftlink-frontend/src/components/DetailsPage/DetailsPage.css
"""

---

# Files Modified

Update the following file:

"""
giftlink-frontend/src/App.js
"""

---

# Common Issues

## The User Is Redirected Immediately

Check whether the authentication token exists:

"""
sessionStorage.getItem("auth-token");
"""

Also ensure that the code returns after navigating:

"""
if (!authenticationToken) {
    navigate("/app/login");
    return;
}
"""

---

## The Gift Is Not Found

Check the following:

- The product ID in the URL is valid.
- The route uses `":productId"`.
- `"useParams()"` retrieves `"productId"`.
- The backend endpoint exists.
- The backend URL is configured correctly.
- The API response property names match the frontend code.

---

## The Date Is Not Displayed

Check whether the backend returns:

"""
gift.date_added
"""

or:

"""
gift.dateAdded
"""

Use the exact property name returned by the API.

---

## The Title Is Difficult to Read

If the card header has a blue background, set the title color to white:

"""
.details-title {
    color: #fff;
}
"""

---

## The Image Is Distorted

Use:

"""
object-fit: cover;
"""

inside the product image CSS rule.

---

# Lab Completion Checklist

- [X] Create the `"DetailsPage"` folder.
- [x] Create `"DetailsPage.js"`.
- [x] Create `"DetailsPage.css"`.
- [x] Import React hooks.
- [x] Import `"useParams()"`.
- [x] Import `"useNavigate()"`.
- [x] Check the authentication token.
- [x] Redirect unauthenticated users.
- [x] Read the product ID from the URL.
- [x] Fetch gift details from the API.
- [x] Add loading state handling.
- [x] Add error state handling.
- [x] Add a gift-not-found message.
- [x] Scroll to the top on page load.
- [x] Add the back button.
- [x] Display the gift image.
- [x] Display an image placeholder when necessary.
- [x] Display the gift name.
- [x] Display the category.
- [x] Display the condition.
- [x] Display the date added.
- [x] Display the gift age.
- [x] Display the description.
- [x] Render the comments section.
- [x] Create the details route in `"App.js"`.
- [x] Style the image container.
- [x] Style the product image.
- [x] Style the missing-image placeholder.
- [x] Style the card header.
- [x] Style the details title.
- [x] Style the comments section.
- [x] Test authenticated access.
- [x] Test unauthenticated access.
- [x] Test the back button.
- [x] Test API error handling.
- [x] Commit the changes.
- [x] Push the changes to GitHub.

---

# Key Takeaways

This lab demonstrates how to:

- Create a dynamic React details page.
- Read route parameters with `"useParams()"`.
- Navigate programmatically with `"useNavigate()"`.
- Protect pages using authentication checks.
- Fetch individual records from an API.
- Handle loading and error states.
- Render conditional content.
- Render arrays with `"map()"`.
- Create reusable CSS styles.
- Connect frontend routes to backend resources.
