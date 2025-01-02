import React, { useState, useEffect } from 'react'
import logo from '../assets/prohands1.png';
import { useNavigate } from 'react-router-dom';

const Loginprofile = ({ isOpen, onClose }) => {
    const [user, setUser] = useState(null);  // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // Add error state
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
        if (!isOpen) return;  // Don't fetch if modal is closed
        
        setLoading(true);
        setError(null);
        
        try {
          console.log('Fetching user data...');  // Debug log
          const response = await fetch('https://prohands.onrender.com', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            credentials: 'include'
          });

          console.log('Response status:', response.status);  // Debug log
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user data');
          }

          const data = await response.json();
          console.log('Received user data:', data);  // Debug log
          setUser(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
                      transition-opacity duration-300 ease-in-out"
           onClick={onClose}
      >
        <div 
          className="bg-sky-200 p-4 rounded-lg w-full max-w-lg relative 
                     transform transition-all duration-300 ease-in-out
                     scale-100 opacity-100 
                     animate-slideIn"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800
                       transition-colors duration-200 ease-in-out
                       hover:rotate-90 transform"
          >
            ✕
          </button>

          {loading && (
            <div className="text-center py-8 animate-pulse">
              <p>Loading profile data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600 animate-fadeIn">
              <p>Error: {error}</p>
            </div>
          )}

          {!loading && !error && user && (
            <form className="bg-white/100 p-6 rounded-lg shadow-lg
                           transform transition-all duration-300 ease-in-out
                           animate-fadeIn">
              <div className='flex flex-col items-center'>
                <img src={logo} alt="ProHands Logo" 
                     className="w-44 mb-2 animate-fadeIn" />
              </div>

              <h2 className="text-2xl font-bold text-center mb-4 animate-slideDown">
                Personal Info
              </h2>
              
              <div className="space-y-4">
                <div className="animate-slideIn" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={user.name || ''}
                    readOnly
                    className="w-full border rounded-xl px-4 py-2 bg-gray-50
                             transition-all duration-200 ease-in-out
                             hover:bg-gray-100"
                  />
                </div>

                <div className="animate-slideIn" style={{ animationDelay: '200ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="w-full border rounded-xl px-4 py-2 bg-gray-50
                             transition-all duration-200 ease-in-out
                             hover:bg-gray-100"
                  />
                </div>

                <div className="animate-slideIn" style={{ animationDelay: '300ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={user.phone || ''}
                    readOnly
                    className="w-full border rounded-xl px-4 py-2 bg-gray-50
                             transition-all duration-200 ease-in-out
                             hover:bg-gray-100"
                  />
                </div>

                <div className="animate-slideIn" style={{ animationDelay: '400ms' }}>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={user.address || ''}
                    readOnly
                    className="w-full border rounded-xl px-4 py-2 bg-gray-50
                             transition-all duration-200 ease-in-out
                             hover:bg-gray-100"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const response = await fetch('https://prohands.onrender.com', {
                        method: 'GET',
                        credentials: 'include'
                      });
                      if (response.ok) {
                        navigate('/');
                        window.location.reload();
                      }
                    } catch (error) {
                      console.error('Logout failed:', error);
                    }
                  }}
                  className="w-full py-3 bg-red-500 text-white rounded-lg 
                             hover:bg-red-600 transition-colors 
                             focus:outline-none focus:ring-2 focus:ring-red-500 
                             focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
};

export default Loginprofile;
