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
import EmployeesTable from "./Components/Employees/EmployeesTable";
import AddEmployees from "./Components/Employees/AddEmployees";

const isAuthenticated = localStorage.getItem("token");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route
        path="/"
        element={isAuthenticated ? <RootLayout /> : <Navigate to="/login" />}
      /> */}

      <Route path="/" element={<ProtectedRoute Component={RootLayout} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgetpassword"
        element={<ProtectedRoute Component={ForgetPassword} />}
      />
      <Route path="/qccheck" element={<ProtectedRoute Component={QcCheck} />} />
      <Route
        path="/blockuser"
        element={<ProtectedRoute Component={BlockedUser} />}
      />
      <Route
        path="/registeration"
        element={<ProtectedRoute Component={Registeration} />}
      />
      <Route
        path="/addclient"
        element={<ProtectedRoute Component={AddClient} />}
      />
      <Route
        path="/pendingregisteration"
        element={<ProtectedRoute Component={PendingRegisteration} />}
      />
      <Route
        path="/cancelregisteration"
        element={<ProtectedRoute Component={CancelRegisteration} />}
      />
      <Route path="/path" element={<ProtectedRoute Component={Package} />} />
      <Route
        path="/addpackage"
        element={<ProtectedRoute Component={AddPackage} />}
      />
      <Route
        path="/blockusersss"
        element={<ProtectedRoute Component={BlockedUserTable} />}
      />
      <Route
        path="/employees"
        element={<ProtectedRoute Component={EmployeesTable} />}
      />
      <Route
        path="/addemployees"
        element={<ProtectedRoute Component={AddEmployees} />}
      />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
