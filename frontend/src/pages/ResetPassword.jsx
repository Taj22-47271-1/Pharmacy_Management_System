import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function ResetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
   const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await API.post('/auth/reset-password', {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      alert('Password Reset Successful');

      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Reset Failed');
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />
 <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;