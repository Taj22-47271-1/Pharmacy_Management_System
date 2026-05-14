import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
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
      await API.post('/auth/register', form);
      alert('Registration Successful');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Admin Registration</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit" className="auth-btn register-btn">
          Register
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="back-btn"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default Register;