import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import { maskEmail } from "../../Utilities/emailMaks";
import useaxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../Components/Container";
import useAOS from "../../hooks/useAOS";
import { pageAnimations } from "../../utils/aosAnimations";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosURL = useaxiosPublic();
  const [page, setPage] = useState(0);
  const limit = 10;
  const skip = page * limit;
  const [filter, setFilter] = useState("");

  // Initialize AOS
  useAOS();

  const { data } = useQuery({
    queryKey: ["AssignedAssets", user?.email, page, filter],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosURL.get(
        `/assignedAssets?employeeEmail=${user.email}&limit=${limit}&skip=${skip}&filter=${filter}`
      );
      return res.data;
    },
  });
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <Container>
      <div
        className="flex flex-col lg:flex-row gap-3 justify-between items-center my-6"
        {...pageAnimations.assetManagement.header}
      >
        <h2 className="text-2xl font-bold text-gray-800">
          Total Assigned Assets {data?.total}
        </h2>
        <label
          className="input"
          data-aos="fade-left"
          data-aos-duration="600"
          data-aos-delay="200"
        >
          <input type="search" required placeholder="Search" />
        </label>
        <select
          value={filter}
          onChange={(e) => {
            setPage(0);
            setFilter(e.target.value);
          }}
          className="select"
          data-aos="fade-left"
          data-aos-duration="600"
          data-aos-delay="300"
        >
          <option value="">All Assets</option>
          <option value="Non-returnable">Non-returnable</option>
          <option value="Returnable">Returnable</option>
        </select>
      </div>

      <div
        className="overflow-x-auto shadow rounded-lg"
        {...pageAnimations.assetManagement.table}
      >
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Approved By</th>
              <th>Company Name</th>
              <th>Assigned Date</th>
              <th>Type</th>
            </tr>
          </thead>

          <tbody>
            {data?.result?.map((item, index) => (
              <tr
                {...pageAnimations.assetManagement.row(index)}
                key={item._id}
                className="hover:bg-gray-50"
              >
                <td>{index + 1}</td>

                <td className="flex items-center gap-3 min-w-max">
                  <img
                    src={item.assetImage}
                    alt={item.assetName}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span>{item.assetName}</span>
                </td>

                <td>{maskEmail(item.hrEmail)}</td>
                <td>{item.companyName}</td>
                <td>{new Date(item.assignmentDate).toLocaleDateString()}</td>
                <td>
                  {" "}
                  {item.assetType === "Returnable" ? (
                    <button className="btn btn-secondary">Returnable</button>
                  ) : (
                    <button className="btn btn-disabled">Non Return</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --------------------------Pagination for ---------------------- */}
      <div
        className="text-center mt-5 space-x-2"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="400"
      >
        <button
          className="btn"
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`btn ${page === i ? "btn-secondary" : ""}`}
            data-aos="zoom-in"
            data-aos-duration="400"
            data-aos-delay={`${500 + i * 50}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn"
          disabled={page + 1 === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export default MyAssets;
