import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { login } from "../store/authSlice";
import { toast } from 'react-hot-toast';

// Login component
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle input errors and return false if any with toast error message
  const handleInputErrors = () => {
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputErrors()) return;
    setLoading(true);
    try {
      // send login request to backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      dispatch(login({ name: response.data.name }));

      // navigate to dashboard page
      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-96 max-w-md p-8 rounded-lg shadow-md bg-white"
      >
        <div className="flex justify-center items-center mb-8">
          <FaLock className="w-8 h-8 mr-2 text-blue-600" />
          <span className="text-3xl font-semibold font-mono text-blue-600">
            AuthApp
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center text-black mt-8">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5 text-gray-400" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? <ClipLoader color="#ffffff" size={20} /> : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
