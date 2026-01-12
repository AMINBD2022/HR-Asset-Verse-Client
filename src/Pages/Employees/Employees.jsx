import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useaxiosPublic from "../../hooks/useAxiosPublic";
import { UserX } from "lucide-react";

const Employees = () => {
  const { user } = useAuth();
  const axiosURL = useaxiosPublic();

  const {
    data: employees = [],
    isError,
    refetch,
  } = useQuery({
    queryKey: ["employeeList", user.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/employees?hrEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await axiosURL.delete(`/employees/${id}?hrEmail=${user?.email}`);
      refetch();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  };
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching data!</p>
    );

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6">
        My All Employees <span className="text-xl">({employees.length})</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="card shadow-sm border border-gray-200 bg-base-100 "
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <img
                  src={
                    emp.employeePhoto ||
                    "https://i.ibb.co.com/Jw9RDf6R/images-2.jpg"
                  }
                  alt={emp.companyName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{emp.employeeName}</h3>
                  <p className="text-gray-500">{emp.employeeEmail}</p>
                  <p className="text-gray-500">{emp.companyName}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                Affiliated Sinc:{" "}
                {new Date(emp.affiliationDate).toLocaleDateString()}
              </p>
              <div className="flex justify-between">
                <p>Total Assets: {emp.assetsCount}</p>
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="btn btn-warning text-white"
                >
                  <UserX />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
