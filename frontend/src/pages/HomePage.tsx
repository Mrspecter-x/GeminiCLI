const HomePage = () => {
  // The Globe is now rendered in App.tsx as a background.
  // This component can be used for UI elements that overlay the globe.
  return (
    <div style={{ textAlign: 'center', color: 'white', textShadow: '2px 2px 4px #000' }}>
      <h2>Explore the Globe</h2>
      <p>Click and drag to rotate. Use the scroll wheel to zoom.</p>
    </div>
  );
};

export default HomePage;