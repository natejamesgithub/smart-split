import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth(); 
    const [email, setEmail] = useState(""); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            await login(email, password); 
            navigate("/dashboard"); 
        } catch (err) {
            setError("Failed to sign in. Check your credentials.");
        }
    };

    return (
        <div className = "min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit = {handleSubmit} className = "bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className = "text-2xl font-bold mb-4 text-center">Login</h2>
                {error && <p className = "text-red-500 text-sm mb-3">{error}</p>}

                <label classname = "block mb-2 text-sm font-medium">Email</label>
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
                    className = "w-full px-3 py-2 border rounded mb-6"
                    required
                />
                <button
                    type = "submit"
                    className = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Log In
                </button>
                <p className = "text-sm mt-4 text-center">
                    Don't have an account? <a href = "/signup" className = "text-blue-600 hover:underline">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login; 