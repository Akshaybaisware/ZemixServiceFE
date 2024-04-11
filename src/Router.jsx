// Router.jsx
import React from "react";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./Components/Layout/RootLayout";
import Login from "./Components/Login/Login";
import ForgetPassword from "./Components/Login/ForgetPassword";
import QcCheck from "./Components/QcCheck/QcCheck";
import BlockedUser from "./Components/BlockedUser/BlockedUser";
import ProtectedRoute from "./Components/ProtectedRoute/Protectedroute";
import Registeration from "./Components/Registeration/Registeraion";
import AddClient from "./Components/Registeration/AddClient";
import PendingRegisteration from "./Components/Registeration/PendingRegisteration";
import CancelRegisteration from "./Components/Registeration/CancelRegisteration";
import Package from "./Components/Registeration/Package";
import AddPackage from "./Components/Registeration/AddPackage";
import BlockedUserTable from "./Components/User/BlockedUserTable";
import EmployeesTable from "./Components/Employees/EmployeesTable";
import AddEmployees from "./Components/Employees/AddEmployees";
import UserNavbar from "./Components/UserPage/UserNavbar";
import UserDashboard from "./Components/UserPage/UserDashboard";
import EditClientComponent from "./Components/ClientActivity/EditClient";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserLogin from "./Components/Login/UserLogin";
import StampPapaer from "./Components/StampPaper/StampPapaer";
import PdfPhotoAdding from "./Components/PDfPhoto/PdfPhotoAdding";
import DownloadStampPaper from "./Components/StampPaper/DowanloadStampPaper";
import ContentValidationfrom from "./Components/ContentValid/ContentValidationfrom";
import GetReportofUser from "./Components/Report/GetReportofUser";
import QcReport from "./Components/QcCheck/QcReport";

const isAuthenticated = localStorage.getItem("token");
const role = localStorage.getItem("role");

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/userlogin" element={<UserLogin />} />

        <Route path="/pdflogin" element={<PdfPhotoAdding />} />
        <Route
          path="/stamppaper"
          element={<ProtectedRoute Component={StampPapaer} />}
        />
        <Route path="/stamppaperdonwload" element={<DownloadStampPaper />} />

        <Route path="/usrnavbar" element={<UserNavbar />} />

        <Route
          path="/userdashboard"
          element={<ProtectedRoute Component={UserDashboard} />}
        />

        <Route path="/" element={<ProtectedRoute Component={RootLayout} />}>
          {role === "admin" ? (
            <>
              <Route index element={<ProtectedRoute Component={Dashboard} />} />
              <Route
                path="/forgetpassword"
                element={<ProtectedRoute Component={ForgetPassword} />}
              />
              <Route
                path="/usernavbar"
                element={<ProtectedRoute Component={UserNavbar} />}
              />
              <Route
                path="/userdashboard"
                element={<ProtectedRoute Component={UserDashboard} />}
              />
              <Route
                path="/qccheck"
                element={<ProtectedRoute Component={QcCheck} />}
              />
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
              <Route
                path="/path"
                element={<ProtectedRoute Component={Package} />}
              />
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
              <Route
                path="/editclient"
                element={<ProtectedRoute Component={EditClientComponent} />}
              />
              <Route path="/writecontent" Component={ContentValidationfrom} />
              <Route path="/userreport" Component={GetReportofUser} />
              <Route path="/downloadreport" Component={DownloadStampPaper} />
              <Route
                path="/qcreport"
                element={<ProtectedRoute Component={QcReport} />}
              />
            </>
          ) : (
            <Route
              index
              element={<ProtectedRoute Component={UserDashboard} />}
            />
          )}
        </Route>
      </Route>
    </>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
