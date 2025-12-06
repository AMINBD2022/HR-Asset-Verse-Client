import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const HrAdminRegisterForm = () => {
  const { setUser, registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const handleRegistation = (data) => {
    registerUser(data.email, data.password)
      .then((data) => {
        setUser(data.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registation successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(data.user);
      })
      .catch((err) => console.log(err));
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-3">
        <div>
          <label className="label">Full Name</label>
          <input
            {...register("name")}
            type="text"
            className="input w-full"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="label">Company Name</label>
          <input
            {...register("companyName")}
            type="text"
            className="input w-full"
            placeholder="Company Name"
          />
        </div>

        <div>
          <label className="label">Company Logo</label>
          <input
            {...register("file")}
            type="file"
            className="file-input w-full"
          />
        </div>
        <div>
          <label className="label">Date Of Birth</label>
          <input {...register("date")} type="date" className="input w-full" />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input w-full"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            {...register("password")}
            type="password"
            className="input w-full"
            placeholder="Password"
          />
        </div>

        <button className="btn btn-secondary w-full mt-3">
          Register as HR
        </button>
      </form>
    </div>
  );
};

export default HrAdminRegisterForm;
