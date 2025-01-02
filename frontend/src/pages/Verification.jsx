import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/phprohands.png';
import { account } from '../lib/appwrite';

const Verification = () => {
  const { state } = useLocation();
  const { phone } = useState;
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const {loading} = useState;

  const handleVerifyClick = async () => {
    // navigate('/loginprofile')
    try {
      // Verify  OTP 
      await account.updatePhoneSession("67133c650027a5011d1a", otp);
      navigate('/loginprofile');
    } catch (error) {
      console.error('Failed to verify OTP', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
      <img src={logo} alt="ProHands Logo" className="w-28 lg:w-48 mb-0 " />
      <h3 className="text-lg font-medium mb-1 text-center sm:text-lg md:text-lg lg:text-2xl">
        Enter 6-Digit OTP
      </h3>
      {phone && (
        <p className="text-lg font-medium mb-3 text-center sm:text-lg md:text-lg lg:text-xl">
          Sent to: <strong>{phone}</strong>
        </p>
      )}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP"
          className="border border-gray-300 rounded-lg px-4 py-2 w-36 h-16 text-center"
        />
    
      </div>
      <button
        onClick={handleVerifyClick}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  );
};

export default Verification;
