import Globe from '../components/Globe';

const HomePage = () => {
  return (
    <>
      <Globe isInteractive={false} />
      <div className="home-content">
        <h1>Welcome to Global Connect</h1>
        <p>Your new platform to connect with people across the globe.</p>
        <p>Register or Login to start exploring.</p>
      </div>
    </>
  );
};

export default HomePage;
