import React from "react";

const EmployeeForm = () => {
  return (
    <div>
      <form className="space-y-3">
        <div>
          <label className="label">Full Name</label>
          <input type="text" className="input w-full" placeholder="Your Name" />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
          />
        </div>

        <div>
          <label className="label">Date Of Birth</label>
          <input type="date" className="input w-full" />
        </div>

        <button className="btn btn-secondary w-full mt-3">
          Register as Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
