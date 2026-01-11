import { createBrowserRouter } from "react-router";
import Home from "../Pages/HomePage/Home";
import AllRequests from "../Pages/AllRequests/AllRequests";
import RequestAsset from "../Pages/RequestAsset/RequestAsset";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddAsset from "../Pages/AddAsset/AddAsset";
import AllAsset from "../Pages/AssetListPage/AllAsset";
import MyTeam from "../Pages/MyTeam/MyTeam";
import EmployeeRoute from "./EmployeeRoute";
import UnifiedRegister from "../Pages/UnifiedRegister";
import MyAssets from "../Pages/MyAssets/MyAssets";
import PaymentSuccess from "../Pages/paymentSuccess/payment-success";
import Login from "../Pages/Login/Login";
import RootLayout from "../Layouts/RootLayout";
import AdminRoute from "./AdminRoute";
import UpgradePackage from "../Pages/UpgradePackage/UpgradePackage";
import Testimonial from "../Pages/Testimonial/Testimonial";
import Employees from "../Pages/Employees/Employees";
import DashboardLayout from "../Layouts/DashboardLayout";
import Blog from "../Pages/Blog";
import BlogPost from "../Pages/BlogPost";
import EmployeeDashboardLayout from "../Layouts/EmployeeDashboardLayout";
import EmployeeDashboard from "../Pages/Dashboard/Employee/EmployeeDashboard";
import EmployeeDashboardRequests from "../Pages/Dashboard/Employee/EmployeeDashboardRequests";
import EmployeeDashboardProfile from "../Pages/Dashboard/Employee/EmployeeDashboardProfile";
import EmployeeApprovedAssets from "../Pages/Dashboard/Employee/EmployeeApprovedAssets";
import Dashboard from "../Pages/Dashboard/Admin/Dashboard";
import DashboardAssetRequests from "../Pages/Dashboard/Admin/DashboardAssetRequests";
import DashboardApprovals from "../Pages/Dashboard/Admin/DashboardApprovals";
import DashboardProfile from "../Pages/Dashboard/Admin/DashboardProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/add-Asset",
        element: (
          <AdminRoute>
            <AddAsset />
          </AdminRoute>
        ),
      },
      {
        path: "/asset-list",
        element: (
          <AdminRoute>
            <AllAsset />
          </AdminRoute>
        ),
      },
      {
        path: "/all-Requests",
        element: (
          <AdminRoute>
            <AllRequests />
          </AdminRoute>
        ),
      },
      {
        path: "/employee-list",
        element: (
          <AdminRoute>
            <Employees />
          </AdminRoute>
        ),
      },
      {
        path: "/packages",
        element: (
          <AdminRoute>
            <UpgradePackage />
          </AdminRoute>
        ),
      },

      //--------------- Employee Link ------------------------
      {
        path: "/my-assets",
        element: (
          <EmployeeRoute>
            <MyAssets />
          </EmployeeRoute>
        ),
      },
      {
        path: "/request-Asset",
        element: (
          <EmployeeRoute>
            <RequestAsset />
          </EmployeeRoute>
        ),
      },
      {
        path: "/my-Team",
        element: (
          <EmployeeRoute>
            <MyTeam />
          </EmployeeRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <UnifiedRegister />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  // Dashboard Routes - Separate layout
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "asset-requests",
        element: <DashboardAssetRequests />,
      },
      {
        path: "approvals",
        element: <DashboardApprovals />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
    ],
  },
  // Employee Dashboard Routes - Separate layout
  {
    path: "/employee-dashboard",
    element: (
      <EmployeeRoute>
        <EmployeeDashboardLayout />
      </EmployeeRoute>
    ),
    children: [
      { index: true, element: <EmployeeDashboard /> },
      {
        path: "/employee-dashboard/requests",
        element: (
          <EmployeeRoute>
            <EmployeeDashboardRequests />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee-dashboard/profile",
        element: (
          <EmployeeRoute>
            <EmployeeDashboardProfile />
          </EmployeeRoute>
        ),
      },
      {
        path: "/employee-dashboard/approved-assets",
        element: (
          <EmployeeRoute>
            <EmployeeApprovedAssets />
          </EmployeeRoute>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
