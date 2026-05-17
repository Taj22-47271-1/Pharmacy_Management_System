import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", form);
            alert("Registration successful");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="page center">
            <form className="card" onSubmit={handleRegister}>
                <h2>Customer Register</h2>

                <input
                    placeholder="Full Name"
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <input
                    placeholder="Phone"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                    placeholder="Address"
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                />

                <button>Register</button>

                <p>
                    Already have account? <Link to="/">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Register;