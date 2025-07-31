import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PostLoginRedirect from "./pages/PostLoginRedirect";
import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-login-redirect" element={<PostLoginRedirect />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
