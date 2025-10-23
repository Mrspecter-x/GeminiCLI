import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Globe from './components/Globe';
import './App.css';

// This component renders the globe as a background only on the home page
const AppBackground = () => {
  const location = useLocation();
  return location.pathname === '/' ? <div className="globe-background"><Globe /></div> : null;
}

function App() {
  return (
    <Router>
      <AppBackground />
      <div className="App-foreground">
        <header className="App-header">
          <h1>Global Connect</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/register">Register</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;