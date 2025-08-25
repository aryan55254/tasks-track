import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { LogOut } from "lucide-react";

function Profile() {
  const { logout, user } = useContext(AuthContext);
  const handlelogout = async () => {
    await logout();
  };
  if (!user) {
    return null;
  }
  return (
    <div className="absolute right-0 mt-4 w-60 bg-gray-700 border border-gray-600 rounded-xl shadow-2xl z-20 origin-top-right animate-fade-in-down">
      {" "}
      <div className="p-4">
        <div className="flex flex-col items-start mb-4">
          <p className="text-lg font-semibold text-gray-100 truncate w-full">
            {user.Username}
          </p>
          <p className="text-sm text-gray-400 truncate w-full">{user.Email}</p>
        </div>

        <hr className="border-t border-gray-600" />

        <button
          onClick={handlelogout}
          className="w-full cursor-pointer flex items-center justify-start mt-4 px-3 py-2 text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;
