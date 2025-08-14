import { Navigate, Outlet } from "react-router-dom";

const LayoutForm = () => {
  const isAuth = false;

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <div className="w-[100%] flex flex-col items-center justify-center">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default LayoutForm;
