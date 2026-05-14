import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: '',
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
      await API.patch('/auth/change-password', form);

      alert('Password Changed Successfully');

      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Change password failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Change Password
        </h2>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
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

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Change Password
        </button>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="w-full bg-gray-700 text-white p-2 rounded mt-3"
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;