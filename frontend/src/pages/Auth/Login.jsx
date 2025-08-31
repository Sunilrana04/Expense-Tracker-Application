import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-2 py-6 overflow-y-auto">
        <div className="w-full max-w-xs bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg overflow-visible">
          <div className="px-4 py-6">
            {/* Logo */}
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-3 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome Back</h2>
            <p className="text-gray-500 text-sm mb-4">Sign in to continue</p>

            {/* Form */}
            <form className="space-y-3" onSubmit={handleLogin}>
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="you@example.com"
                type="text"
                className="rounded-md py-2 px-3 border border-gray-300 focus:ring-1 focus:ring-purple-500 text-sm w-full"
              />
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
                className="rounded-md py-2 px-3 border border-gray-300 focus:ring-1 focus:ring-purple-500 text-sm w-full"
              />

              {error && (
                <div className="bg-red-50 text-red-700 p-2 rounded-md flex items-start text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-medium rounded-md text-sm hover:shadow-md transition flex items-center justify-center ${isLoading ? 'opacity-80' : ''}`}
              >
                {isLoading ? 'Processing...' : 'LOGIN'}
              </button>
            </form>

            <p className="text-center text-gray-600 text-xs mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
