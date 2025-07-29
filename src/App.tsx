import "./App.css";
import Home from "./pages/Home";
import APIPage from "./pages/APIPage";
import PostLoginRedirect from "./pages/PostLoginRedirect";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post-login-redirect" element={<PostLoginRedirect />} />
      <Route path="/api-page/:id" element={<APIPage />} />
    </Routes>
  );
}

export default App;
