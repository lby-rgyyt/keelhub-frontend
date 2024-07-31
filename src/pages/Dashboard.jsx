import UserInfoModal from "../components/UserInfoModal";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      {currentUser.hasLoggedIn ? (
        <h2>Welcome</h2>
      ) : (
        <UserInfoModal
          userId={currentUser.id}
          isOpen={true}
          currentUser={currentUser}
        />
      )}
      {/* <UserInfoModal
        userId={currentUser.id}
        isOpen={true}
        currentUser={currentUser}
      /> */}
    </div>
  );
};

export default Dashboard;
