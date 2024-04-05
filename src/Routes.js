import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NoticeDashboard from "./pages/Dashboard/Dashboard";
import NoticeDetails from "./pages/NoticeDetails/NoticeDetails"; // Create this component

const router = createBrowserRouter([
  {
    path: "/",
    element: <NoticeDashboard />,
  },
  {
    path: "/notices/:id",
    element: <NoticeDetails />,
  },
]);
export default router;
