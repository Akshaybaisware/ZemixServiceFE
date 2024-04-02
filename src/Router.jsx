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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />} />
    </Route>
  )
);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
