import React from "react";

const packages = [
  {
    name: "Basic",
    employeeLimit: 5,
    price: 5,
    features: ["Asset Tracking", "Employee Management", "Basic Support"],
  },
  {
    name: "Standard",
    employeeLimit: 10,
    price: 8,
    features: [
      "Asset Tracking",
      "Employee Management",
      "Basic Support",
      "All Basic features",
      "Advanced Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Premium",
    employeeLimit: 20,
    price: 15,
    features: [
      "Asset Tracking",
      "Employee Management",
      "Basic Support",
      "All Basic features",
      "Advanced Analytics",
      "Priority Support",
      "All Standard features",
      "Custom Branding",
      "24/7 Support",
    ],
  },
];

const Packages = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6 w-11/12 mx-auto">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="card bg-base-100 shadow-xl justify-end border border-gray-200"
        >
          <div className="card-body flex-0">
            <h2 className="card-title text-3xl font-bold">{pkg.name}</h2>
            <p className="text-gray-600">
              Employee Limit:{" "}
              <span className="font-semibold">{pkg.employeeLimit}</span>
            </p>

            <p className="text-4xl font-bold mt-3">
              ${pkg.price}
              <span className="text-sm text-gray-400 font-normal">/month</span>
            </p>

            <ul className="mt-4 space-y-2">
              {pkg.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="checkbox checkbox-sm"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="card-actions mt-5">
              <button className="btn btn-neutral w-full">Choose Plan</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Packages;
