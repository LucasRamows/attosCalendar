import { Navigate, Outlet } from "react-router-dom";

const LayoutForm = () => {
  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div className="w-[100%] flex flex-col items-center justify-center">
          <img className="max-w-1/6 mb-4" src="././public/assets/logo.svg" alt="logo" />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default LayoutForm;
