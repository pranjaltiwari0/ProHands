import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/phprohands.png';
import 'react-phone-input-2/lib/style.css';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

function CustomerLogin({ userType }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!isLogin) {
        // Sign up
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
            cpassword: formData.confirmPassword
          })
        })

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await response.json()
        
        if (response.status === 422) {
          throw new Error(data.error)
        }
        if (!response.ok) {
          throw new Error(data.error || 'Sign up failed')
        }

        alert(data.message)
        navigate('/customerlogin')
      } else {
        // Login
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server returned non-JSON response");
        }

        const data = await response.json()

        if (response.status === 400) {
          throw new Error(data.error)
        }
        if (!response.ok) {
          throw new Error(data.error || 'Login failed')
        }

        alert(data.message)
        navigate('/home')
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const PostData = async () => {
    // Add your PostData logic here
    console.log('PostData called')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">

      <img src={logo} alt="ProHands Logo" className="w-48 mb-0" />
      
      
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {/* {isLogin ? 'Login as ' : 'Sign up as '}  */}
          <span className="text-[#009cff]">{userType}</span>
        </p>

        <form onSubmit={handleAuth} method="POST" className="space-y-4">
          {!isLogin && (
            <>
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
                  placeholder="Phone Number"
                  required
                />
              </div>

              {/* Address Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
                  placeholder="Address"
                  required
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password Field (Sign up only) */}
          {!isLogin && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#009cff] focus:border-[#009cff]"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#009cff] text-white rounded-lg hover:bg-[#0081d1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#009cff] focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  address: '',
                  password: '',
                  confirmPassword: ''
                })
              }}
              className="text-[#009cff] hover:underline font-medium"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default CustomerLogin;
