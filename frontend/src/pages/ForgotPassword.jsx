import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/forgot-password', {
        email,
      });

      alert('OTP Sent To Email');
    } catch (error) {alert(error.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Send OTP
        </button>

        <div className="mt-4 text-center">
          <Link to="/reset-password" className="text-blue-600">
            Verify OTP & Reset Password
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;