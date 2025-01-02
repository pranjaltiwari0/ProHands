import React, { useEffect, useState } from 'react'
import logo from '../assets/prohands1.png';


const Flashscreen = () => {
    const [showFlashScreen, setShowFlashScreen] = useState(true);

    useEffect(() => {
      // Simulate flash screen display time (e.g., 3 seconds)
      const timer = setTimeout(() => {
        setShowFlashScreen(false);
      }, 3000); // 3 seconds flash screen duration
  
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);
  
    if (!showFlashScreen) return null; // If flash screen has finished, return null to hide it
  
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white text-black">
        <img src={logo} alt="Prohands Logo" className="w-48 mb-4 animate-bounce" />
        <p className="text-xl">Connecting Workers and Customers</p>
      </div>
    )

  
}

export default Flashscreen
