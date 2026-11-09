# Implement the Search Page

## GiftLink Frontend Hands-On Lab

**Estimated duration:** 60 minutes

This lab adds search functionality to the `"giftlink-frontend"` React application. Users will be able to search for gifts using a name, category, condition, and age range.

---

## Objectives

By completing this lab, you will:

- Create the `"SearchPage"` component.
- Search for gifts using API query parameters.
- Add a text search field.
- Add category and condition filters.
- Add an age range slider.
- Display search results dynamically.
- Display a message when no products are found.
- Navigate to a gift details page.
- Style the search page responsively.
- Add the `"/app/search"` route.
- Add a `"Search"` navigation link.
- Push the changes to GitHub.

---

## Prerequisites

Before starting:

- Ensure the `"giftlink-frontend"` project is available locally.
- Ensure the backend API is running.
- Confirm that the backend search endpoint is available.
- Complete the previous GiftLink labs.

The working directory is:

"""
giftlink-frontend
"""

---

# Step 1: Create the SearchPage Component

Create the following folder:

"""
giftlink-frontend/src/components/SearchPage
"""

Inside the folder, create:

"""
SearchPage.js
SearchPage.css
"""

---

## SearchPage Requirements

The component must:

- Store the search query in state.
- Store the selected age range in state.
- Store the selected category in state.
- Store the selected condition in state.
- Store search results in state.
- Fetch results from the search API.
- Build query parameters safely.
- Display category options dynamically.
- Display condition options dynamically.
- Display an age range slider.
- Display matching gifts.
- Display a `"No products found"` message when appropriate.
- Navigate to the details page when a gift is selected.

---

## Required Imports

The component should import React hooks, navigation, configuration, and CSS:

"""
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
import "./SearchPage.css";
"""

---

## State Variables

Create state variables for the search criteria and results:

"""
const [searchQuery, setSearchQuery] = useState("");
const [ageRange, setAgeRange] = useState(6);
const [category, setCategory] = useState("");
const [condition, setCondition] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
"""

The age range starts at `"6"` and can be adjusted between `"1"` and `"10"` years.

---

## Category and Condition Options

Define the available category and condition options:

"""
const categories = [
    "Furniture",
    "Electronics",
    "Clothing",
    "Toys",
    "Books",
    "Other"
];

const conditions = [
    "New",
    "Like New",
    "Good",
    "Fair"
];
"""

The options should be rendered dynamically with `"map()"`.

---

## Search Function

Create a `"handleSearch()"` function to fetch matching gifts:

"""
const handleSearch = async () => {
    setLoading(true);
    setError("");

    const queryParams = new URLSearchParams({
        name: searchQuery,
        age_years: ageRange,
        category,
        condition
    }).toString();

    const url =
        `${urlConfig.backendUrl}/api/search?${queryParams}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const data = await response.json();
        setSearchResults(data);
    } catch (error) {
        console.error(
            "Failed to fetch search results:",
            error
        );

        setError("Unable to complete the search.");
        setSearchResults([]);
    } finally {
        setLoading(false);
    }
};
"""

Using React state for the dropdown values is preferred over using `"document.getElementById()"`.

---

## Search Query Parameters

The search request should include:

| Parameter | Value |
|---|---|
| `"name"` | The text entered by the user |
| `"age_years"` | The selected age range |
| `"category"` | The selected category |
| `"condition"` | The selected condition |

The resulting URL will follow this pattern:

"""
/api/search?name=chair&age_years=6&category=Furniture&condition=Good
"""

---

## Age Range Slider

Add a slider that allows users to select an age range:

"""
<label htmlFor="ageRange">
    Less than {ageRange} years
</label>

<input
    type="range"
    className="form-range"
    id="ageRange"
    min="1"
    max="10"
    value={ageRange}
    onChange={(e) =>
        setAgeRange(e.target.value)
    }
/>
"""

---

## Search Text Input

Add a text input for searching by gift name:

"""
<label htmlFor="searchQuery" className="form-label">
    Search Gifts
</label>

<input
    id="searchQuery"
    type="text"
    className="form-control"
    placeholder="Search by gift name"
    value={searchQuery}
    onChange={(e) =>
        setSearchQuery(e.target.value)
    }
/>
"""

---

## Category Dropdown

Render the category options dynamically:

"""
<label htmlFor="category" className="form-label">
    Category
</label>

<select
    id="category"
    className="form-select"
    value={category}
    onChange={(e) =>
        setCategory(e.target.value)
    }
>
    <option value="">
        All Categories
    </option>

    {categories.map((item) => (
        <option key={item} value={item}>
            {item}
        </option>
    ))}
</select>
"""

---

## Condition Dropdown

Render the condition options dynamically:

"""
<label htmlFor="condition" className="form-label">
    Condition
</label>

<select
    id="condition"
    className="form-select"
    value={condition}
    onChange={(e) =>
        setCondition(e.target.value)
    }
>
    <option value="">
        All Conditions
    </option>

    {conditions.map((item) => (
        <option key={item} value={item}>
            {item}
        </option>
    ))}
</select>
"""

---

## Search Button

Add a button that starts the search:

"""
<button
    type="button"
    className="btn btn-primary w-100"
    onClick={handleSearch}
>
    Search
</button>
"""

---

## Navigate to the Details Page

Use `"useNavigate()"` to open the selected gift:

"""
const navigate = useNavigate();

const handleGiftClick = (giftId) => {
    navigate(`/app/product/${giftId}`);
};
"""

Add the click handler to each result card:

"""
<div
    className="search-result-card"
    onClick={() => handleGiftClick(gift.id)}
>
    ...
</div>
"""

---

## Display Search Results

Use `"map()"` to display the returned gifts:

"""
{searchResults.map((gift) => (
    <div
        key={gift.id}
        className="col-md-4 mb-4"
    >
        <div
            className="search-result-card card h-100"
            onClick={() =>
                handleGiftClick(gift.id)
            }
        >
            {gift.image ? (
                <img
                    src={gift.image}
                    alt={gift.name}
                    className="search-result-image"
                />
            ) : (
                <div className="search-image-placeholder">
                    No Image Available
                </div>
            )}

            <div className="card-body">
                <h5 className="card-title">
                    {gift.name}
                </h5>

                <p className="card-text">
                    Category: {gift.category}
                </p>

                <p className="card-text">
                    Condition: {gift.condition}
                </p>

                <p className="card-text">
                    Age: {gift.age} years
                </p>
            </div>
        </div>
    </div>
))}
"""

---

## Empty Results Message

Display a message when no gifts match the search:

"""
{!loading &&
    searchResults.length === 0 &&
    !error && (
        <div className="alert alert-info">
            No products found.
        </div>
    )}
"""

---

## Loading and Error Messages

Display a loading message:

"""
{loading && (
    <div className="alert alert-secondary">
        Searching for gifts...
    </div>
)}
"""

Display an error message:

"""
{error && (
    <div className="alert alert-danger">
        {error}
    </div>
)}
"""

---

## Complete SearchPage.js Example

"""
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";
import "./SearchPage.css";

function SearchPage() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] =
        useState("");

    const [ageRange, setAgeRange] =
        useState(6);

    const [category, setCategory] =
        useState("");

    const [condition, setCondition] =
        useState("");

    const [searchResults, setSearchResults] =
        useState([]);

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const categories = [
        "Furniture",
        "Electronics",
        "Clothing",
        "Toys",
        "Books",
        "Other"
    ];

    const conditions = [
        "New",
        "Like New",
        "Good",
        "Fair"
    ];

    const handleSearch = async () => {
        setLoading(true);
        setError("");

        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category,
            condition
        }).toString();

        const url =
            `${urlConfig.backendUrl}/api/search?${queryParams}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Search failed");
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error(
                "Failed to fetch search results:",
                error
            );

            setError("Unable to complete the search.");
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleGiftClick = (giftId) => {
        navigate(`/app/product/${giftId}`);
    };

    return (
        <div className="search-page container mt-5">
            <h1 className="text-center mb-4">
                Search Gifts
            </h1>

            <div className="search-panel card p-4 mb-4">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label
                            htmlFor="searchQuery"
                            className="form-label"
                        >
                            Search Gifts
                        </label>

                        <input
                            id="searchQuery"
                            type="text"
                            className="form-control"
                            placeholder="Search by gift name"
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="col-md-3">
                        <label
                            htmlFor="category"
                            className="form-label"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            className="form-select"
                            value={category}
                            onChange={(e) =>
                                setCategory(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label
                            htmlFor="condition"
                            className="form-label"
                        >
                            Condition
                        </label>

                        <select
                            id="condition"
                            className="form-select"
                            value={condition}
                            onChange={(e) =>
                                setCondition(
                                    e.target.value
                                )
                            }
                        >
                            <option value="">
                                All Conditions
                            </option>

                            {conditions.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-9">
                        <label
                            htmlFor="ageRange"
                            className="form-label"
                        >
                            Less than {ageRange} years
                        </label>

                        <input
                            type="range"
                            className="form-range"
                            id="ageRange"
                            min="1"
                            max="10"
                            value={ageRange}
                            onChange={(e) =>
                                setAgeRange(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <button
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="alert alert-secondary">
                    Searching for gifts...
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!loading &&
                searchResults.length === 0 &&
                !error && (
                    <div className="alert alert-info">
                        No products found.
                    </div>
                )}

            <div className="row">
                {searchResults.map((gift) => (
                    <div
                        key={gift.id}
                        className="col-sm-12 col-md-6 col-lg-4 mb-4"
                    >
                        <div
                            className="search-result-card card h-100"
                            onClick={() =>
                                handleGiftClick(gift.id)
                            }
                        >
                            {gift.image ? (
                                <img
                                    src={gift.image}
                                    alt={gift.name}
                                    className="search-result-image"
                                />
                            ) : (
                                <div className="search-image-placeholder">
                                    No Image Available
                                </div>
                            )}

                            <div className="card-body">
                                <h5 className="card-title">
                                    {gift.name}
                                </h5>

                                <p className="card-text">
                                    Category:{" "}
                                    {gift.category}
                                </p>

                                <p className="card-text">
                                    Condition:{" "}
                                    {gift.condition}
                                </p>

                                <p className="card-text">
                                    Age: {gift.age} years
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
"""

---

# Step 2: Style the Search Page

Open:

"""
giftlink-frontend/src/components/SearchPage/SearchPage.css
"""

---

## Search Page Styling

"""
.search-page {
    min-height: 100vh;
    padding-bottom: 40px;
}

.search-page h1 {
    color: #0056b3;
    font-weight: 700;
}

.search-panel {
    background-color: #f8f9fa;
    border: none;
    box-shadow: 0 4px 10px
        rgba(0, 0, 0, 0.08);
}

.search-panel .form-label {
    font-weight: 600;
    color: #333;
}

.search-panel .form-control,
.search-panel .form-select {
    border-radius: 0.35rem;
    padding: 0.7rem;
}

.search-panel .btn-primary {
    background-color: #0056b3;
    border: none;
    padding: 0.7rem 1rem;
}

.search-panel .btn-primary:hover {
    background-color: #003f80;
}

.search-panel .form-range {
    accent-color: #0056b3;
}

.search-result-card {
    cursor: pointer;
    border: none;
    overflow: hidden;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.search-result-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px
        rgba(0, 0, 0, 0.15);
}

.search-result-image,
.search-image-placeholder {
    width: 100%;
    height: 220px;
}

.search-result-image {
    object-fit: cover;
}

.search-image-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e9ecef;
    color: #6c757d;
    font-size: 1rem;
}

.search-result-card .card-body {
    padding: 1.25rem;
}

.search-result-card .card-title {
    color: #0056b3;
    font-weight: 700;
}

.search-result-card .card-text {
    color: #555;
    margin-bottom: 0.5rem;
}

.alert-info {
    text-align: center;
    margin: 2rem 0;
}
"""

---

## Responsive Layout

The search results use Bootstrap grid classes:

"""
col-sm-12 col-md-6 col-lg-4
"""

This creates:

- One card per row on small screens.
- Two cards per row on medium screens.
- Three cards per row on large screens.

---

# Step 3: Add the Search Route

Open:

"""
giftlink-frontend/src/App.js
"""

Import the component:

"""
import SearchPage from "./components/SearchPage/SearchPage";
"""

Add the search route inside `"Routes"`:

"""
<Route
    path="/app/search"
    element={<SearchPage />}
/>
"""

---

## App.js Route Example

"""
<Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/app" element={<MainPage />} />
    <Route path="/app/login" element={<LoginPage />} />
    <Route
        path="/app/register"
        element={<RegisterPage />}
    />
    <Route
        path="/app/product/:productId"
        element={<DetailsPage />}
    />
    <Route
        path="/app/search"
        element={<SearchPage />}
    />
</Routes>
"""

---

# Step 4: Add the Search Navigation Link

Open:

"""
giftlink-frontend/src/components/Navbar/Navbar.js
"""

If the application uses React Router, import `"Link"`:

"""
import { Link } from "react-router-dom";
"""

Add the search link after the gifts link:

"""
<li className="nav-item">
    <Link
        className="nav-link"
        to="/app/search"
    >
        Search
    </Link>
</li>
"""

The navigation bar should now provide access to:

- Home
- Gifts
- Search

---

# Step 5: Test the Search Page

Start the backend and frontend applications according to the project's existing setup.

Open the search page:

"""
http://localhost:3000/app/search
"""

---

## Search Testing Checklist

Confirm that:

- [ ] The search page loads correctly.
- [ ] The text search input is visible.
- [ ] The category dropdown is visible.
- [ ] The condition dropdown is visible.
- [ ] The age slider is visible.
- [ ] The selected age value updates correctly.
- [ ] The search button triggers the API request.
- [ ] Search results are displayed.
- [ ] Gift images are displayed when available.
- [ ] `"No Image Available"` appears when necessary.
- [ ] The `"No products found"` message appears when no results match.
- [ ] API errors display an appropriate message.
- [ ] Clicking a result opens the gift details page.
- [ ] The `"Search"` navigation link opens `"/app/search"`.
- [ ] The layout works on different screen sizes.
- [ ] No errors appear in the browser console.

---

# Step 6: Push Changes to GitHub

## Stage the Changes

"""
git add .
"""

---

## Commit the Changes

Use a descriptive commit message:

"""
git commit -m "Implement search functionality and style SearchPage"
"""

---

## Push the Changes

"""
git push
"""

Confirm that the updated files are available in your GitHub repository.

---

# Files Created

Create the following files:

"""
giftlink-frontend/src/components/SearchPage/SearchPage.js
giftlink-frontend/src/components/SearchPage/SearchPage.css
"""

---

# Files Modified

Update the following files:

"""
giftlink-frontend/src/App.js
giftlink-frontend/src/components/Navbar/Navbar.js
"""

---

# Common Issues

## Search Results Are Empty

Check the following:

- The backend server is running.
- The backend URL is configured correctly.
- The API endpoint is `"/api/search"`.
- The query parameter names match the backend.
- The selected category and condition values match the database.
- The response is an array.

---

## The Search Button Does Not Work

Confirm that the button includes:

"""
onClick={handleSearch}
"""

Also confirm that the function is defined inside the component.

---

## The Route Does Not Load

Confirm that:

- `"SearchPage"` is imported in `"App.js"`.
- The route path is exactly `"/app/search"`.
- The navigation link points to `"/app/search"`.
- The component is rendered inside `"Routes"`.

---

## The Details Page Does Not Open

Confirm that the result card passes the gift ID:

"""
onClick={() => handleGiftClick(gift.id)}
"""

Also confirm that the navigation path matches the details route:

"""
navigate(`/app/product/${giftId}`);
"""

---

## Category or Condition Filters Do Not Work

Check that:

- The selected value is stored in state.
- The state value is included in `"URLSearchParams"`.
- The query parameter names match the backend API.
- Empty filter values are handled by the backend.

---

# Lab Completion Checklist

- [ ] Create the `"SearchPage"` folder.
- [ ] Create `"SearchPage.js"`.
- [ ] Create `"SearchPage.css"`.
- [ ] Add search query state.
- [ ] Add age range state.
- [ ] Add category state.
- [ ] Add condition state.
- [ ] Add search results state.
- [ ] Add loading state.
- [ ] Add error state.
- [ ] Create the search API request.
- [ ] Use `"URLSearchParams"`.
- [ ] Add the text search input.
- [ ] Add the category dropdown.
- [ ] Add the condition dropdown.
- [ ] Add the age range slider.
- [ ] Add the search button.
- [ ] Render search results.
- [ ] Add the empty-results message.
- [ ] Add image placeholders.
- [ ] Add navigation to the details page.
- [ ] Style the search page.
- [ ] Add responsive result cards.
- [ ] Add the search route to `"App.js"`.
- [ ] Add the search link to `"Navbar.js"`.
- [ ] Test the search functionality.
- [ ] Test the navigation.
- [ ] Commit the changes.
- [ ] Push the changes to GitHub.

---

# Key Takeaways

This lab demonstrates how to:

- Build a search interface with React.
- Manage multiple form values with `"useState"`.
- Create controlled inputs.
- Build API query strings with `"URLSearchParams"`.
- Fetch filtered data from a backend API.
- Render dynamic dropdown options.
- Render search results with `"map()"`.
- Handle empty results and API errors.
- Navigate to another page using `"useNavigate()"`.
- Create responsive layouts with Bootstrap.
- Improve user experience with CSS hover effects.
