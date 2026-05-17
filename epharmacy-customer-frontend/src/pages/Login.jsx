import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.access_token);
            alert("Login successful");
            navigate("/medicines");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="page center">
            <form className="card" onSubmit={handleLogin}>
                <h2>Customer Login</h2>

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

                <button>Login</button>

                <p>
                    No account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;