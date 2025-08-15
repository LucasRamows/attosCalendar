import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import TopBar from "@/components/shared/TopBar";

const LayoutHome = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/sign-in", { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div className="w-full flex flex-col p-4">
      <TopBar />
      <div className="w-full flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutHome;
