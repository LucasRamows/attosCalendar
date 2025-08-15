import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import LayoutForm from "./_auth/LayoutForm";
import LayoutHome from "./pages/home/LauoytHome";
import HomePage from "./pages/home/HomePage";

const App = () => {
  return (
    <main className="flex flex-col h-full w-full bg-gray-600 justify-center items-center">
      <Routes>                                                  
        <Route element={<LayoutForm />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} /> 
        </Route>
          <Route element={<LayoutHome />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

      </Routes>
    </main>
  );
};

export default App;
