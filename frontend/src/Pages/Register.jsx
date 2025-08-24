import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isSubmitting, setsubmitting] = useState(false);
  const [Username, setUsername] = useState("");

  const handlemailchange = (e) => {
    setEmail(e.target.value);
    if (error) seterror("");
  };
  const handleusernamechange = (e) => {
    setUsername(e.target.value);
    if (error) seterror("");
  };
  const handlepasswordchange = (e) => {
    setPassword(e.target.value);
    if (error) seterror("");
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    seterror("");
    try {
      const apiurl = import.meta.env.VITE_BACKEND_API;
      const registerendpoint = `${apiurl}/api/auth/register`;
      const response = await fetch(registerendpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: Username,
          Email: Email,
          Password: Password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to register. Please try again."
        );
      }
      navigate("/login");
    } catch (err) {
      seterror(err.message);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Welcome To TaskTrack
          </h1>
          <p className="text-gray-400 mt-2">Create your account to continue</p>
        </div>

        <form onSubmit={handlesubmit} noValidate>
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="Username"
                type="text"
                value={Username}
                onChange={handleusernamechange}
                placeholder="Enter Username"
                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="Email"
                value={Email}
                onChange={handlemailchange}
                placeholder="Enter Email"
                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                id="Password"
                value={Password}
                onChange={handlepasswordchange}
                placeholder="Enter Password"
                className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg my-6 text-center text-sm">
              {error}
            </div>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full mt-8 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          <div className="text-center mt-6 text-sm">
            <p className="text-gray-400">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-indigo-400 hover:underline ml-1"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
