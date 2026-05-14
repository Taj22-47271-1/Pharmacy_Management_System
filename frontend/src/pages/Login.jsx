import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.access_token);
      alert('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>
        

        <div className="auth-links">
          <Link to="/register">Create New Account</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;