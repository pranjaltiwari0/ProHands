import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Onbording from './pages/Onbording';
import Verification from './pages/Verification';
import Home from './pages/Home';
import Flashscreen from './components/Flashscreen';
import Customerlogin from './pages/Customerlogin';
import Workerlogin from './pages/Workerlogin';
import Loginprofile from './pages/Loginprofile';
import Navbar from './components/Navbar';
import { supabase } from './config/supabaseClient'
import WorkerHome from './pages/WorkerHome';


function Auth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <Flashscreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Onbording />} />
              <Route path="/customerlogin/:userType" element={<Customerlogin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

// Create a wrapper component to handle navbar visibility
const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/home';

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Onbording />} /> 
        <Route path='/customerlogin' element={<Customerlogin />} />   
        <Route path='/workerlogin' element={<Workerlogin />} />      
        <Route path="/verification" element={<Verification />} /> 
        <Route path='/loginprofile' element={<Loginprofile />} />
        <Route path='/home' element={<Home />} />
        <Route path='/worker/home' element={<WorkerHome />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [isFlashScreenVisible, setIsFlashScreenVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlashScreenVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isFlashScreenVisible) {
    return <Flashscreen />;
  }

  return <AppContent />;
}

export default App;



