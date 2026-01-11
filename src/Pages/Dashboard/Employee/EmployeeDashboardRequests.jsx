import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useaxiosPublic from "../../../hooks/useAxiosPublic";
import EmployeeDashboardLayout from "../../../Layouts/EmployeeDashboardLayout";

const EmployeeDashboardRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiosPublic();
  const [requests, setRequests] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [statusStats, setStatusStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        setLoading(true);

        // Fetch employee's requests
        const requestsResponse = await axiosPublic.get(
          `/asset-requests?requesterEmail=${user?.email}`
        );
        const requestsData = requestsResponse.data || [];

        // Calculate monthly data for the last 6 months
        const monthlyStats = calculateMonthlyStats(requestsData);

        // Calculate status statistics
        const approved = requestsData.filter(
          (req) => req.status === "assigned"
        ).length;
        const pending = requestsData.filter(
          (req) => req.status === "pending"
        ).length;
        const rejected = requestsData.filter(
          (req) => req.status === "rejected"
        ).length;

        setRequests(requestsData);
        setMonthlyData(monthlyStats);
        setStatusStats({ approved, pending, rejected });
      } catch (error) {
        console.error("Error fetching requests data:", error);
        setRequests([]);
        setMonthlyData([]);
        setStatusStats({ approved: 0, pending: 0, rejected: 0 });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRequestsData();
    }
  }, [user?.email, axiosPublic]);

  const calculateMonthlyStats = (requests) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDate = new Date();
    const monthlyStats = [];

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
      const month = date.getMonth();

      const monthRequests = requests.filter((req) => {
        const reqDate = new Date(req.assignmentDate || req.dateAdded);
        return reqDate.getFullYear() === year && reqDate.getMonth() === month;
      });

      const totalRequests = monthRequests.length;
      const approvedRequests = monthRequests.filter(
        (req) => req.status === "assigned"
      ).length;
      const pendingRequests = monthRequests.filter(
        (req) => req.status === "pending"
      ).length;
      const rejectedRequests = monthRequests.filter(
        (req) => req.status === "rejected"
      ).length;

      monthlyStats.push({
        month: monthName,
        total: totalRequests,
        approved: approvedRequests,
        pending: pendingRequests,
        rejected: rejectedRequests,
      });
    }

    return monthlyStats;
  };

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

  const filteredRequests = requests.filter((request) => {
    if (filter === "all") return true;
    if (filter === "approved") return request.status === "assigned";
    if (filter === "pending") return request.status === "pending";
    if (filter === "rejected") return request.status === "rejected";
    return true;
  });

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
        <h1 className="text-3xl font-bold text-neutral">My Asset Requests</h1>
        <p className="text-secondary mt-2">
          Track and analyze your asset request history
        </p>
      </div>

      {/* Monthly Requests Chart */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-xl font-semibold text-neutral mb-6">
          Monthly Request Activity (Last 6 Months)
        </h3>
        {monthlyData.length > 0 ? (
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-secondary">
                  {data.month}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral">
                      {data.total} total requests
                    </span>
                    <div className="flex gap-4 text-xs">
                      <span className="text-success">
                        {data.approved} approved
                      </span>
                      <span className="text-warning">
                        {data.pending} pending
                      </span>
                      <span className="text-error">
                        {data.rejected} rejected
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-base-200 rounded-full h-4 relative overflow-hidden">
                    {/* Approved bar */}
                    <div
                      className="bg-success h-full rounded-full transition-all duration-500 ease-out absolute top-0 left-0"
                      style={{
                        width: `${
                          Math.max(...monthlyData.map((m) => m.total)) > 0
                            ? (data.approved /
                                Math.max(...monthlyData.map((m) => m.total))) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                    {/* Pending bar */}
                    <div
                      className="bg-warning h-full rounded-full transition-all duration-700 ease-out absolute top-0"
                      style={{
                        left: `${
                          Math.max(...monthlyData.map((m) => m.total)) > 0
                            ? (data.approved /
                                Math.max(...monthlyData.map((m) => m.total))) *
                              100
                            : 0
                        }%`,
                        width: `${
                          Math.max(...monthlyData.map((m) => m.total)) > 0
                            ? (data.pending /
                                Math.max(...monthlyData.map((m) => m.total))) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                    {/* Rejected bar */}
                    <div
                      className="bg-error h-full rounded-full transition-all duration-900 ease-out absolute top-0"
                      style={{
                        left: `${
                          Math.max(...monthlyData.map((m) => m.total)) > 0
                            ? ((data.approved + data.pending) /
                                Math.max(...monthlyData.map((m) => m.total))) *
                              100
                            : 0
                        }%`,
                        width: `${
                          Math.max(...monthlyData.map((m) => m.total)) > 0
                            ? (data.rejected /
                                Math.max(...monthlyData.map((m) => m.total))) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <p>No request data available</p>
          </div>
        )}
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-base-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-secondary">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-sm text-secondary">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-sm text-secondary">Rejected</span>
          </div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
          <h3 className="text-xl font-semibold text-neutral mb-6">
            Request Status Distribution
          </h3>
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="w-full h-full rounded-full relative overflow-hidden">
                {requests.length > 0 ? (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                          from 0deg,
                          hsl(var(--success)) 0deg ${
                            (statusStats.approved / requests.length) * 360
                          }deg,
                          hsl(var(--warning)) ${
                            (statusStats.approved / requests.length) * 360
                          }deg ${
                        ((statusStats.approved + statusStats.pending) /
                          requests.length) *
                        360
                      }deg,
                          hsl(var(--error)) ${
                            ((statusStats.approved + statusStats.pending) /
                              requests.length) *
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
                      {requests.length}
                    </div>
                    <div className="text-sm text-secondary">Total</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="font-medium text-neutral">Approved</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-neutral">
                  {statusStats.approved}
                </div>
                <div className="text-sm text-secondary">
                  {requests.length > 0
                    ? Math.round((statusStats.approved / requests.length) * 100)
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
                  {statusStats.pending}
                </div>
                <div className="text-sm text-secondary">
                  {requests.length > 0
                    ? Math.round((statusStats.pending / requests.length) * 100)
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
                  {statusStats.rejected}
                </div>
                <div className="text-sm text-secondary">
                  {requests.length > 0
                    ? Math.round((statusStats.rejected / requests.length) * 100)
                    : 0}
                  %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
          <h3 className="text-xl font-semibold text-neutral mb-6">
            Request Summary
          </h3>
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">
                {requests.length}
              </div>
              <div className="text-sm text-secondary">Total Requests Made</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">
                  {statusStats.approved}
                </div>
                <div className="text-xs text-secondary">Approved</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning mb-1">
                  {statusStats.pending}
                </div>
                <div className="text-xs text-secondary">Pending</div>
              </div>
            </div>

            <div className="text-center p-4 bg-error/10 rounded-lg">
              <div className="text-2xl font-bold text-error mb-1">
                {statusStats.rejected}
              </div>
              <div className="text-xs text-secondary">Rejected</div>
            </div>

            <div className="text-center p-4 bg-info/10 rounded-lg">
              <div className="text-lg font-bold text-info mb-1">
                {requests.length > 0
                  ? Math.round((statusStats.approved / requests.length) * 100)
                  : 0}
                %
              </div>
              <div className="text-xs text-secondary">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral">All Requests</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`btn btn-sm ${
                filter === "all" ? "btn-primary" : "btn-ghost"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`btn btn-sm ${
                filter === "approved" ? "btn-success" : "btn-ghost"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`btn btn-sm ${
                filter === "pending" ? "btn-warning" : "btn-ghost"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`btn btn-sm ${
                filter === "rejected" ? "btn-error" : "btn-ghost"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="flex items-center justify-between p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={request.assetImage || "https://via.placeholder.com/64"}
                    alt={request.assetName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral text-lg">
                      {request.assetName}
                    </h4>
                    <p className="text-sm text-secondary">
                      Type: {request.assetType}
                    </p>
                    <p className="text-sm text-secondary">
                      Requested:{" "}
                      {new Date(
                        request.assignmentDate || request.dateAdded
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(request.status)}
                  <p className="text-sm text-secondary mt-1">
                    Company: {request.companyName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <p>No requests found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboardRequests;
