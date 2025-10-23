import { Link } from 'react-router-dom';

const HomePage = () => {
  // The Globe is rendered as a background in App.tsx for this route
  return (
    <div className="home-layout">
      {/* The left part is intentionally empty, the globe will be positioned here via CSS */}
      <div className="home-left"></div>
      
      <div className="home-right">
        <div className="welcome-content">
          <h1>Global Connect</h1>
          <p>
            Discover a new way to see the world. Our platform connects you with a global community,
            visualized on an interactive globe. See where others are, share your world, and meet
            new people.
          </p>
          <div className="home-buttons">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down to Learn More</span>
          <div className="arrow"></div>
        </div>
      </div>

      {/* This section is for future promotional content */}
      <div className="promo-section">
        <h2>How It Works</h2>
        <p>This is the scrollable area for future promotional content. We can add details about features, testimonials, and more here.</p>
        <div style={{height: '100vh'}}></div>
        <p>More content to demonstrate scrolling...</p>
      </div>
    </div>
  );
};

export default HomePage;