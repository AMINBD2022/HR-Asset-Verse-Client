import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useaxiosPublic from "../../../hooks/useAxiosPublic";
import EmployeeDashboardLayout from "../../../Layouts/EmployeeDashboardLayout";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiosPublic();
  const [dashboardData, setDashboardData] = useState({
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
    rejectedRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);

        // Fetch employee's requests
        const requestsResponse = await axiosPublic.get(
          `/asset-requests?requesterEmail=${user?.email}`
        );
        const requests = requestsResponse.data || [];

        // Calculate statistics
        const totalRequests = requests.length;
        const approvedRequests = requests.filter(
          (req) => req.status === "assigned"
        ).length;
        const pendingRequests = requests.filter(
          (req) => req.status === "pending"
        ).length;
        const rejectedRequests = requests.filter(
          (req) => req.status === "rejected"
        ).length;

        // Get recent requests (last 5)
        const recent = requests
          .sort(
            (a, b) =>
              new Date(b.assignmentDate || b.dateAdded) -
              new Date(a.assignmentDate || a.dateAdded)
          )
          .slice(0, 5);

        setDashboardData({
          totalRequests,
          approvedRequests,
          pendingRequests,
          rejectedRequests,
        });

        setRecentRequests(recent);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setDashboardData({
          totalRequests: 0,
          approvedRequests: 0,
          pendingRequests: 0,
          rejectedRequests: 0,
        });
        setRecentRequests([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchEmployeeData();
    }
  }, [user?.email, axiosPublic]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "assigned":
        return <span className="badge badge-success">Approved</span>;
      case "pending":
        return <span className="badge badge-warning">Pending</span>;
      case "rejected":
        return <span className="badge badge-error">Rejected</span>;
      default:
        return <span className="badge badge-ghost">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral">Welcome Back!</h1>
        <p className="text-secondary mt-2">
          Here's an overview of your asset requests and activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Total Requests
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.totalRequests}
              </p>
              <p className="text-xs text-info mt-1">All time</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.approvedRequests}
              </p>
              <p className="text-xs text-success mt-1">Assets assigned</p>
            </div>
            <div className="p-4 bg-success/10 rounded-xl">
              <svg
                className="w-8 h-8 text-success"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.pendingRequests}
              </p>
              <p className="text-xs text-warning mt-1">Awaiting approval</p>
            </div>
            <div className="p-4 bg-warning/10 rounded-xl">
              <svg
                className="w-8 h-8 text-warning"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {dashboardData.rejectedRequests}
              </p>
              <p className="text-xs text-error mt-1">Not approved</p>
            </div>
            <div className="p-4 bg-error/10 rounded-xl">
              <svg
                className="w-8 h-8 text-error"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Request Status Chart */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-xl font-semibold text-neutral mb-6">
          Request Status Overview
        </h3>
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-48 h-48">
            {/* Pie Chart using CSS */}
            <div className="w-full h-full rounded-full relative overflow-hidden">
              {dashboardData.totalRequests > 0 ? (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                        from 0deg,
                        hsl(var(--success)) 0deg ${
                          (dashboardData.approvedRequests /
                            dashboardData.totalRequests) *
                          360
                        }deg,
                        hsl(var(--warning)) ${
                          (dashboardData.approvedRequests /
                            dashboardData.totalRequests) *
                          360
                        }deg ${
                      ((dashboardData.approvedRequests +
                        dashboardData.pendingRequests) /
                        dashboardData.totalRequests) *
                      360
                    }deg,
                        hsl(var(--error)) ${
                          ((dashboardData.approvedRequests +
                            dashboardData.pendingRequests) /
                            dashboardData.totalRequests) *
                          360
                        }deg 360deg
                      )`,
                  }}
                ></div>
              ) : (
                <div className="absolute inset-0 rounded-full bg-base-200"></div>
              )}
              <div className="absolute inset-6 bg-base-100 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral">
                    {dashboardData.totalRequests}
                  </div>
                  <div className="text-sm text-secondary">Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-success rounded-full"></div>
              <span className="font-medium text-neutral">Approved</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-neutral">
                {dashboardData.approvedRequests}
              </div>
              <div className="text-sm text-secondary">
                {dashboardData.totalRequests > 0
                  ? Math.round(
                      (dashboardData.approvedRequests /
                        dashboardData.totalRequests) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-warning rounded-full"></div>
              <span className="font-medium text-neutral">Pending</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-neutral">
                {dashboardData.pendingRequests}
              </div>
              <div className="text-sm text-secondary">
                {dashboardData.totalRequests > 0
                  ? Math.round(
                      (dashboardData.pendingRequests /
                        dashboardData.totalRequests) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-error rounded-full"></div>
              <span className="font-medium text-neutral">Rejected</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-neutral">
                {dashboardData.rejectedRequests}
              </div>
              <div className="text-sm text-secondary">
                {dashboardData.totalRequests > 0
                  ? Math.round(
                      (dashboardData.rejectedRequests /
                        dashboardData.totalRequests) *
                        100
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral">
            Recent Requests
          </h3>
          <Link
            to="/employee-dashboard/requests"
            className="btn btn-primary btn-sm"
          >
            View All
          </Link>
        </div>
        {recentRequests.length > 0 ? (
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={request.assetImage || "https://via.placeholder.com/48"}
                    alt={request.assetName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral">
                      {request.assetName}
                    </h4>
                    <p className="text-sm text-secondary">
                      {new Date(
                        request.assignmentDate || request.dateAdded
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(request.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <p>No requests found</p>
            <Link to="/request-asset" className="btn btn-primary btn-sm mt-4">
              Make Your First Request
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-xl font-semibold text-neutral mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/request-asset"
            className="btn btn-primary btn-lg flex items-center gap-3 h-16"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Request New Asset
          </Link>
          <Link
            to="/employee-dashboard/approved-assets"
            className="btn btn-success btn-lg flex items-center gap-3 h-16"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Approved Assets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
