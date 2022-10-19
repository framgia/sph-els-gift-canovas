import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Login from "./components/login";
import SignUp from "./components/signup";
import Answer from "./components/answer";
import Results from "./components/results";
import NotAdminUsers from "./components/notAdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/results" element={<Results />} />
        <Route path="/users" element={<NotAdminUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
