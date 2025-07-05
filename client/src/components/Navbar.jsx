import { Link, useLocation } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext.jsx"; 

const NavBar = () => {
    const { user, logout } = useAuth(); 
    const location = useLocation(); 

    const handleLogout = async () => {
        await logout(); 
        window.location.href = "/login"; 
    }; 

    const isActive = (path) => location.pathname.startsWith(path); 

    return (
    <nav className="bg-gray-100 shadow mb-6">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">
          Smart Split
        </Link>
        {user && (
          <div className="flex space-x-6 items-center">
            <Link
              to="/groups"
              className={`hover:text-blue-600 ${isActive("/groups") ? "text-blue-600 font-medium" : "text-gray-700"}`}
            >
              My Groups
            </Link>
            <Link
              to="/create-group"
              className={`hover:text-blue-600 ${isActive("/create-group") ? "text-blue-600 font-medium" : "text-gray-700"}`}
            >
              Create Group
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );

}; 

export default NavBar; 