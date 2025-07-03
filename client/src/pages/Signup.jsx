import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 

const Signup = () => {
    const { signup } = useAuth(); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try {
            await signup(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Failed to create an account"); 
        }
    };

    return (
        <div className = "min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit = {handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className = "text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {error && <p className = "text-red-500 text-sm mb-3">{error}</p>}

                <label className = "block mb-2 text-sm font-medium">Email</label>
                <input
                    type = "email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    className = "w-full px-3 py-2 border rounded mb-4"
                    required
                />

                <label className = "block mb-2 text-sm font-medium">Password</label>
                <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    className = "w-full px-3 py-2 border rounded mb-4"
                    required
                />

                <label className = "block mb-2 text-sm font-medium">Confirm Password</label>
                <input
                    type = "password"
                    value = {confirmPassword}
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                    className = "w-full px-3 py-2 border rounded mb-4"
                    required
                />

                <button
                    type = "submit"
                    className = "w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default Signup; 