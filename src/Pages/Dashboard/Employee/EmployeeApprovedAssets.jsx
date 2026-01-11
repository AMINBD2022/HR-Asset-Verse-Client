import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useaxiosPublic from "../../../hooks/useAxiosPublic";
import EmployeeDashboardLayout from "../../../Layouts/EmployeeDashboardLayout";
import {
  FiPackage,
  FiCalendar,
  FiUser,
  FiSearch,
  FiFilter,
} from "react-icons/fi";

const EmployeeApprovedAssets = () => {
  const { user } = useAuth();
  const axiosPublic = useaxiosPublic();
  const [approvedAssets, setApprovedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    totalApproved: 0,
    returnable: 0,
    nonReturnable: 0,
    companies: 0,
  });

  useEffect(() => {
    const fetchApprovedAssets = async () => {
      try {
        setLoading(true);

        // Fetch employee's approved/assigned assets
        const response = await axiosPublic.get(
          `/asset-requests?requesterEmail=${user?.email}&status=assigned`
        );
        const assets = response.data || [];

        // Calculate statistics
        const totalApproved = assets.length;
        const returnable = assets.filter(
          (asset) => asset.assetType === "Returnable"
        ).length;
        const nonReturnable = assets.filter(
          (asset) => asset.assetType === "Non-returnable"
        ).length;
        const uniqueCompanies = [
          ...new Set(assets.map((asset) => asset.companyName)),
        ].length;

        setApprovedAssets(assets);
        setFilteredAssets(assets);
        setStats({
          totalApproved,
          returnable,
          nonReturnable,
          companies: uniqueCompanies,
        });
      } catch (error) {
        console.error("Error fetching approved assets:", error);
        setApprovedAssets([]);
        setFilteredAssets([]);
        setStats({
          totalApproved: 0,
          returnable: 0,
          nonReturnable: 0,
          companies: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApprovedAssets();
    }
  }, [user?.email, axiosPublic]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = approvedAssets;

    // Apply type filter
    if (filterType !== "all") {
      filtered = filtered.filter(
        (asset) => asset.assetType.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAssets(filtered);
  }, [approvedAssets, filterType, searchTerm]);

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
        <h1 className="text-3xl font-bold text-neutral flex items-center gap-3">
          <FiPackage className="text-primary" />
          My Approved Assets
        </h1>
        <p className="text-secondary mt-2">
          View and manage all your approved and assigned assets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Total Approved
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {stats.totalApproved}
              </p>
              <p className="text-xs text-success mt-1">Assets assigned</p>
            </div>
            <div className="p-4 bg-success/10 rounded-xl">
              <FiPackage className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Returnable</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {stats.returnable}
              </p>
              <p className="text-xs text-info mt-1">Must return</p>
            </div>
            <div className="p-4 bg-info/10 rounded-xl">
              <svg
                className="w-8 h-8 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">
                Non-Returnable
              </p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {stats.nonReturnable}
              </p>
              <p className="text-xs text-warning mt-1">Keep forever</p>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm font-medium">Companies</p>
              <p className="text-3xl font-bold text-neutral mt-2">
                {stats.companies}
              </p>
              <p className="text-xs text-primary mt-1">Organizations</p>
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Type Distribution Chart */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-xl font-semibold text-neutral mb-6">
          Asset Type Distribution
        </h3>
        {stats.totalApproved > 0 ? (
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="w-full h-full rounded-full relative overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                        from 0deg,
                        hsl(var(--info)) 0deg ${
                          (stats.returnable / stats.totalApproved) * 360
                        }deg,
                        hsl(var(--warning)) ${
                          (stats.returnable / stats.totalApproved) * 360
                        }deg 360deg
                      )`,
                  }}
                ></div>
                <div className="absolute inset-6 bg-base-100 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral">
                      {stats.totalApproved}
                    </div>
                    <div className="text-sm text-secondary">Assets</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-secondary">
            <FiPackage className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No approved assets yet</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-info/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-info rounded-full"></div>
              <span className="font-medium text-neutral">Returnable</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-neutral">{stats.returnable}</div>
              <div className="text-sm text-secondary">
                {stats.totalApproved > 0
                  ? Math.round((stats.returnable / stats.totalApproved) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-warning rounded-full"></div>
              <span className="font-medium text-neutral">Non-Returnable</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-neutral">
                {stats.nonReturnable}
              </div>
              <div className="text-sm text-secondary">
                {stats.totalApproved > 0
                  ? Math.round(
                      (stats.nonReturnable / stats.totalApproved) * 100
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              <input
                type="text"
                placeholder="Search assets by name or company..."
                className="input input-bordered w-full pl-10 bg-base-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline flex items-center gap-2"
              >
                <FiFilter />
                Filter: {filterType === "all" ? "All Types" : filterType}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-base-300"
              >
                <li>
                  <button
                    onClick={() => setFilterType("all")}
                    className={filterType === "all" ? "active" : ""}
                  >
                    All Types
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilterType("returnable")}
                    className={filterType === "returnable" ? "active" : ""}
                  >
                    Returnable
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setFilterType("non-returnable")}
                    className={filterType === "non-returnable" ? "active" : ""}
                  >
                    Non-Returnable
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assets Grid */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset._id}
                className="bg-base-200 rounded-xl p-6 border border-base-300 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={asset.assetImage || "https://via.placeholder.com/80"}
                    alt={asset.assetName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral text-lg mb-2 truncate">
                      {asset.assetName}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <FiPackage className="text-primary w-4 h-4" />
                        <span className="text-secondary">Type:</span>
                        <span
                          className={`badge badge-sm ${
                            asset.assetType === "Returnable"
                              ? "badge-info"
                              : "badge-warning"
                          }`}
                        >
                          {asset.assetType}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiUser className="text-primary w-4 h-4" />
                        <span className="text-secondary">Company:</span>
                        <span className="text-neutral font-medium truncate">
                          {asset.companyName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FiCalendar className="text-primary w-4 h-4" />
                        <span className="text-secondary">Assigned:</span>
                        <span className="text-neutral">
                          {new Date(asset.assignmentDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-base-300">
                  <div className="flex items-center justify-between">
                    <span className="badge badge-success">Approved</span>
                    <span className="text-xs text-secondary">
                      Asset ID: {asset.assetId?.slice(-8) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-secondary">
            <FiPackage className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No assets found</p>
            <p className="text-sm">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "You haven't been assigned any assets yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeApprovedAssets;
