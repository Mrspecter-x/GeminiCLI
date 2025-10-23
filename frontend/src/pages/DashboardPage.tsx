import Globe from '../components/Globe';

const DashboardPage = () => {
  return (
    <>
      <Globe isInteractive={true} />
      <div className="dashboard-ui">
        {/* UI elements for the dashboard will go here */}
      </div>
    </>
  );
};

export default DashboardPage;