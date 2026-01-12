import { useState } from "react";
import { Link, useLocation, Navigate, Outlet } from "react-router";
import {
  IoMdHome,
  IoMdDocument,
  IoMdMenu,
  IoMdClose,
  IoMdArrowBack,
  IoMdPerson,
  IoMdCheckboxOutline,
} from "react-icons/io";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";
import RouteLoader from "../Components/RouteLoader";

const EmployeeDashboardLayout = () => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Employee dashboard navigation items
  const dashboardNavItems = [
    {
      name: "Overview",
      href: "/employee-dashboard",
      icon: IoMdHome,
      description: "Dashboard overview and statistics",
    },
    {
      name: "My Requests",
      href: "/employee-dashboard/requests",
      icon: IoMdDocument,
      description: "View your asset requests status",
    },
    {
      name: "Approved Assets",
      href: "/employee-dashboard/approved-assets",
      icon: IoMdCheckboxOutline,
      description: "View your approved assets",
    },
    {
      name: "Profile",
      href: "/employee-dashboard/profile",
      icon: IoMdPerson,
      description: "Manage your profile settings",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Show loading state
  if (loading || roleLoading) {
    return <Loading />;
  }

  // Redirect non-employee users
  if (!user || role !== "employee") {
    return <Navigate to="/" replace />;
  }

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen bg-base-200">
      <RouteLoader />
      {/* Mobile Header */}
      <div className="lg:hidden bg-base-300 border-b border-base-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-square text-base-content"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <IoMdClose className="h-6 w-6" />
            ) : (
              <IoMdMenu className="h-6 w-6" />
            )}
          </button>
          <h1 className="text-xl font-bold text-neutral">Dashboard</h1>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-base-300 border-r border-base-200 transform transition-transform duration-200 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          {/* Desktop Header */}
          <div className="hidden lg:block p-6 border-b border-base-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-neutral">Dashboard</h1>
              <Link
                to="/"
                className="btn btn-ghost btn-sm"
                aria-label="Back to main site"
              >
                <IoMdArrowBack className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-secondary mt-2">
              Welcome, {user?.displayName || user?.email}
            </p>
          </div>

          {/* Navigation */}
          <nav className="p-4 lg:p-6">
            <ul className="menu menu-vertical gap-2">
              {dashboardNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={closeSidebar}
                      className={`
                        flex items-center gap-3 p-3 rounded-lg transition-colors
                        ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-200 text-base-content"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{item.name}</div>
                        <div
                          className={`text-xs mt-1 ${
                            isActive
                              ? "text-primary-content/80"
                              : "text-secondary"
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 border-t border-base-200">
            <div className="text-center">
              <p className="text-xs text-secondary">
                AssetVerse Employee Portal
              </p>
              <p className="text-xs text-secondary mt-1">v1.0</p>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 overflow-y-auto">
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboardLayout;
