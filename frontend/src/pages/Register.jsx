import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
<div className="min-h-screen flex justify-center items-center bg-gray-100">
<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded shadow-md w-[350px]"
>
<h2 className="text-3xl font-bold text-center mb-6">
Register
</h2>
<input
type="text"
name="fullName"
placeholder="Full Name"
className="w-full border p-2 mb-4 rounded"
onChange={handleChange}
required
/>
<input
type="email"
name="email"
placeholder="Email"
className="w-full border p-2 mb-4 rounded"
onChange={handleChange}
required
/>
<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-2 mb-4 rounded"
onChange={handleChange}
required
/>
<button className="w-full bg-green-600 text-white p-2 rounded hover:bggreen-700">
Register
</button>
 <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600">
            Back To Login
          </Link>
        </div>
      </form>
    </div>
  );
}
export default Register;