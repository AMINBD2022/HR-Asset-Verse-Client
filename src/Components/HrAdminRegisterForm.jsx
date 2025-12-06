import React from "react";

const HrAdminRegisterForm = () => {
  return (
    <div>
      <form className="space-y-3">
        <div>
          <label className="label">Full Name</label>
          <input type="text" className="input w-full" placeholder="Your Name" />
        </div>

        <div>
          <label className="label">Company Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Company Name"
          />
        </div>

        <div>
          <label className="label">Company Logo</label>
          <input type="file" className="file-input w-full" />
        </div>
        <div>
          <label className="label">Date Of Birth</label>
          <input type="date" className="input w-full" />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Your Email"
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

        <button className="btn btn-secondary w-full mt-3">
          Register as HR
        </button>
      </form>
    </div>
  );
};

export default HrAdminRegisterForm;
