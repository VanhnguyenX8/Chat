import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './Login.css';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigator = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password
            }, { withCredentials: true });

            if (response.data.Status === "Success") {
                // Handle successful login, e.g., redirect to dashboard or set user state
                console.log(response);
                navigator("/home");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.Error) {
                setError(err.response.data.Error);
            } else {
                setError('An error occurred during login.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;