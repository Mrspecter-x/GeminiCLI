import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Globe from './components/Globe';
import './App.css';

// This component renders the globe as a background on relevant pages
const AppBackground = () => {
  const location = useLocation();
  const showGlobe = location.pathname === '/' || location.pathname === '/dashboard';
  
  // The interactive globe is only on the dashboard
  return showGlobe ? <div className="globe-background"><Globe isInteractive={location.pathname === '/dashboard'} /></div> : null;
}

// A wrapper for routes that require authentication
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // We don't need to navigate here, the component will re-render
  };

  return (
    <Router>
      <AppBackground />
      <div className="App-foreground">
        <header className="App-header">
          <h1>Global Connect</h1>
          <nav>
            {token ? (
              <>
                <Link to="/dashboard">Dashboard</Link> | <Link to="/" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
