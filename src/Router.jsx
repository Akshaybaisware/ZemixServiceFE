import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React from "react";

import Home from "./Components/Home";
import RootLayout from "./Components/Layout/RootLayout";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/Login/ForgetPassword";
import QcCheck from "./Components/QcCheck/QcCheck";
import BlockedUser from "./Components/BlockedUser/BlockedUser";

import ProtectedRoute from "./Components/ProtectedRoute/Protectedroute";
import Registeraion from "./Components/Registeration/Registeraion";
import AddClient from "./Components/Registeration/AddClient";
import PendingRegisteration from "./Components/Registeration/PendingRegisteration";
import CancelRegisteration from "./Components/Registeration/CancelRegisteration";
import Package from "./Components/Registeration/Package";
import AddPackage from "./Components/Registeration/AddPackage";
import BlockedUserTable from "./Components/User/BlockedUserTable";

const isAuthenticated = localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={isAuthenticated ? <RootLayout /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgetpassword"
        element={<ProtectedRoute component={<ForgetPassword />} />}
      />

      <Route path="/qccheck" element={<QcCheck />} />
      <Route path="/blockuser" element={<BlockedUser />} />
      <Route path="/registeration" element={<Registeraion />} />
      <Route path="/addclient" element={<AddClient />} />
      <Route path="/pendingregisteration" element={<PendingRegisteration />} />
      <Route path="/cancelregisteration" element={<CancelRegisteration />} />
      <Route path="/path" element={<Package />} />
      <Route path="/addpackage" element={<AddPackage />} />
      <Route path="/blockusersss" element={<BlockedUserTable />} />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
