import React from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/phprohands.png';

const Onboarding = () => {
  const navigate = useNavigate();

  // button clicks
  const handleWorkerClick = () => {
    // Navigate to  worker's page 
    navigate('/workerlogin');
  };

  const handleCustomerClick = () => {
    // Navigate to customer's page
    navigate('/customerlogin');
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-sky-50 p-4">
      <img src={logo} alt="ProHands Logo" className="w-48 mb-4" />
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-4xl md:text-5xl lg:text-6xl">
        Welcome to ProHands!
        </h1>
  
      <div className="flex flex-col w-full sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      <button
          onClick={handleCustomerClick}
          className="bg-sky-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition h-16 w-full sm:w-auto"
        >
          I am a Customer
        </button>
        <button
          onClick={handleWorkerClick}
          className="bg-sky-500 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition h-16 w-full sm:w-auto"
        >
          I am a Worker
        </button>


      </div>
    </div>
  );
};

export default Onboarding;
