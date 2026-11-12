import React, { useState, useEffect } from 'react';
import './LoginPage.css';

// Task 1: Import urlConfig from `giftlink-frontend/src/config.js`
import { urlConfig } from '../../config';

// Task 2: Import useAppContext from `giftlink-frontend/context/AuthContext.js`
import { useAppContext } from '../../context/AuthContext';

// Task 3: Import useNavigate from `react-router-dom`
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    // Create useState hook variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4: Include a state for incorrect password
    const [incorrect, setIncorrect] = useState('');

    // Task 5: Create local variables for navigate, bearerToken, and setIsLoggedIn
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Task 6: If the user is already logged in, navigate to MainPage
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/app');
        }
    }, [navigate]);

    // Create the handleLogin function
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Inside handleLogin');

        // Step 1: Implement API call
        const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
            // Step 1 - Task 7: Set the request method
            method: 'POST',

            // Step 1 - Task 8: Set the request headers
            headers: {
                'content-type': 'application/json',
                'Authorization': bearerToken
                    ? `Bearer ${bearerToken}`
                    : '',
            },

            // Step 1 - Task 9: Send the email and password
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        // Step 2: Access data returned from the fetch API
        const json = await res.json();
        console.log('Json', json);

        if (json.authtoken) {
            // Task 1: Save the authentication token
            sessionStorage.setItem('auth-token', json.authtoken);

            // Task 2: Save the user's details
            sessionStorage.setItem('name', json.userName);
            sessionStorage.setItem('email', json.userEmail);

            // Task 3: Update the user's login state
            setIsLoggedIn(true);

            // Task 4: Navigate to the MainPage after logging in
            navigate('/app');
        } else {
            // Task 5: Clear the form and display an error message
            setEmail('');
            setPassword('');
            setIncorrect('Wrong password. Try again.');

            // Clear the error message after two seconds
            setTimeout(() => {
                setIncorrect('');
            }, 2000);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Login
                        </h2>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>

                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIncorrect('');
                                }}
                            />
                        </div>

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
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIncorrect('');
                                }}
                            />

                            {/* Step 2: Task 6 - Display an error message to the user */}
                            <span
                                style={{
                                    color: 'red',
                                    height: '.5cm',
                                    display: 'block',
                                    fontStyle: 'italic',
                                    fontSize: '12px',
                                }}
                            >
                                {incorrect}
                            </span>
                        </div>

                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleLogin}
                        >
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            New here?{' '}
                            <a
                                href="/app/register"
                                className="text-primary"
                            >
                                Register Here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
