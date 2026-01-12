import React from "react";

const DemoCredentials = ({ onDemoLogin, message }) => {
  return (
    <div className="bg-info/10 rounded-xl p-4 border border-info/20">
      <h3 className="text-sm font-semibold text-info mb-3 flex items-center gap-2">
        Demo Credentials - Try the App
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() =>
            onDemoLogin("aminulxrpd@gmail.com", "aminulxrpd", "HR Admin")
          }
          className="btn btn-info btn-sm text-xs flex items-center gap-2"
        >
          <span className="text-base">👨‍💼</span>
          HR Admin Login
        </button>
        <button
          type="button"
          onClick={() =>
            onDemoLogin("kalam@gmail.com", "kalam@gmail.com", "Employee")
          }
          className="btn btn-success btn-sm text-xs flex items-center gap-2"
        >
          <span className="text-base">👤</span>
          Employee Login
        </button>
      </div>
      <p className="text-xs text-info/70 mt-2">
        {message ||
          (onDemoLogin.toString().includes("navigate")
            ? "Click a button above to go to login with demo credentials"
            : 'Click a button above to auto-fill credentials, then click "Sign In"')}
      </p>
    </div>
  );
};

export default DemoCredentials;
