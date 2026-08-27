import { createBrowserRouter, Navigate } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Principal from "../pages/Principal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/principal",
    element: <Principal />
  }
]);

export default router;