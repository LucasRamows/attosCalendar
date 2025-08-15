import TopBar from "@/components/shared/TopBar";
import { Outlet } from "react-router-dom";

const LayoutHome = () => {
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
