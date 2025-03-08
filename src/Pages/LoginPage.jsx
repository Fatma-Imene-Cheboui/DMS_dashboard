import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👀 Import eye icons

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 🔥 Toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = 'admin';
    const validPassword = 'password123';

    if (username === validUsername && password === validPassword) {
      dispatch(login());
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className='flex h-screen w-full'>
      <div className='w-1/2 bg-gradient-to-br text-gray-600 flex items-center justify-center'>
        <h1 className='text-white text-4xl font-bold'>Welcome Back!</h1>
      </div>

      <div className='w-1/2 flex items-center justify-center p-10'>
        <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md'>
          <h2 className='text-3xl font-bold text-center text-cyan-700 mb-6'>Login</h2>

          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='block text-gray-600 text-sm font-medium'>Username</label>
              <input
                type='text'
                className='text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className='mb-4 relative'>
              <label className='block text-gray-600 text-sm font-medium'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='text-black w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password - Right Aligned */}
            <div className='text-right mb-4'>
              <span className='text-cyan-600 text-xs font-normal underline'>Forgot Password?</span>
            </div>

            <button
              type='submit'
              className='w-full bg-cyan-700 hover:bg-cyan-600 text-white p-3 rounded-lg transition duration-200'
            >
              Login
            </button>
          </form>

          {/* Create Account - Highlighted Text */}
          <div className='mt-4 text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <span className='text-cyan-600 font-medium'>Create one</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
