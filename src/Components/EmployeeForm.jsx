import React from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EmployeeForm = () => {
  const { registerUser, setUser } = useAuth();

  const { register, handleSubmit } = useForm();
  const handleRegistation = (data) => {
    console.log(data);
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
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input w-full"
            placeholder="Your email"
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

        <div>
          <label className="label">Date Of Birth</label>
          <input {...register("date")} type="date" className="input w-full" />
        </div>

        <button className="btn btn-secondary w-full mt-3">
          Register as Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
