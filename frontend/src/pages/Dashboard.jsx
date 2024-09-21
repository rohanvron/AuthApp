import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../store/authSlice';

// Dashboard component
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get user data from the store
  const user = useSelector((state) => state.auth.user);

  // handle logout and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome, {user?.name}!</h2>
          <p className="mt-2 text-sm text-gray-600">You're now signed in to your account.</p>
        </div>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FaSignOutAlt className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;