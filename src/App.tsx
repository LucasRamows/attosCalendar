import { Routes, Route } from "react-router-dom";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import LayoutForm from "./_auth/LayoutForm";
import AllUsers from "./pages/allUsers";
import AllTasks from "./pages/AllTasks";

const App = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-600 justify-center items-center">
      <Routes>
        <Route element={<LayoutForm />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/all-users" element={<AllUsers/>} />
          <Route path="/all-tasks" element={<AllTasks/>} />
          <Route path="/sign-up" element={<SignupForm />} /> 
        </Route>
      </Routes>
    </main>
  );
};

export default App;
