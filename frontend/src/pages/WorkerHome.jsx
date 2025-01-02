import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/prohands1.png';

const WorkerHome = () => {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch worker data');
        }

        const data = await response.json();
        setWorker(data);
      } catch (err) {
        console.error('Error fetching worker data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logo */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <img src={logo} alt="ProHands Logo" className="h-16" />
          
          {/* Add logout button in header */}
          <button
            onClick={async () => {
              try {
                const response = await fetch('http://localhost:5000/logout', {
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
            className="px-4 py-2 bg-red-500 text-white rounded-lg 
                     hover:bg-red-600 transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-red-500 
                     focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Worker Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Worker Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {worker?.name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {worker?.email}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {worker?.phone}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">Address</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    {worker?.address}
                  </div>
                </div>
              </div>

              {/* Additional Information or Stats */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Account Status</h3>
                  <p className="text-blue-600">Active</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Account Type</h3>
                  <p className="text-green-600">{worker?.user_type}</p>
                </div>

                {/* You can add more sections here like:
                - Jobs Completed
                - Rating
                - Availability Status
                - etc. */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
