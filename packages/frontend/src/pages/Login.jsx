import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert("Login successful!");

            navigate('/');
        } catch (err) {
            console.error(err.response?.data?.error || 'Login failed');
            // alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}
