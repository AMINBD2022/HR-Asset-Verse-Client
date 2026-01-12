import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAOS from "../../hooks/useAOS";
import useGlobalLoading from "../../hooks/useGlobalLoading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import DemoCredentials from "../../Components/DemoCredentials";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginUser, user } = useAuth();
  const { roleLoading } = useRole();
  const { withLoading } = useGlobalLoading();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize AOS
  useAOS();

  // Redirect logged-in users to home or intended path
  useEffect(() => {
    if (user && !roleLoading) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, roleLoading, navigate, location.state]);

  const handleDemoLogin = (email, password, role) => {
    setValue("email", email);
    setValue("password", password);
    toast.success(`Demo ${role} credentials loaded`);
  };

  const handleLogIn = async (data) => {
    try {
      await withLoading(
        () => loginUser(data.email, data.password),
        "Signing you in..."
      );

      // Show success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to intended path or home after a short delay
      setTimeout(() => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }, 1500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  // Show loading state while checking user authentication
  if (user && roleLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8 text-center max-w-md">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <h2 className="text-2xl font-bold text-neutral mb-2">
            Welcome back!
          </h2>
          <p className="text-secondary">Redirecting you...</p>
        </div>
      </div>
    );
  }

  // Show loading for logged-in users
  if (user) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-8 text-center max-w-md">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <h2 className="text-2xl font-bold text-neutral mb-2">
            Already logged in
          </h2>
          <p className="text-secondary">Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div
          className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {/* Header */}
          <div
            className="bg-linear-to-r from-primary to-secondary p-8 text-center"
            data-aos="fade-down"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            <h1
              className="text-3xl font-bold text-primary-content mb-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="400"
            >
              Welcome Back
            </h1>
            <p
              className="text-primary-content/80"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="500"
            >
              Sign in to your AssetVerse account
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(handleLogIn)} className="space-y-6">
              {/* Demo Credentials Section */}
              <div
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                <DemoCredentials onDemoLogin={handleDemoLogin} />
              </div>

              {/* Email Field */}
              <div
                className="form-control"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="700"
              >
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    className="input input-bordered w-full pl-12"
                    placeholder="Enter your email"
                  />
                  <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50 z-10" />
                </div>
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div
                className="form-control"
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="800"
              >
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type={show ? "text" : "password"}
                    className="input input-bordered w-full pl-12 pr-12"
                    placeholder="Enter your password"
                  />
                  <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50 z-10" />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary z-10"
                  >
                    {show ? (
                      <IoEyeOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOffOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Forgot Password */}
              <div
                className="text-right"
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="900"
              >
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline text-sm"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full h-12 text-lg font-semibold"
                data-aos="zoom-in"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-8">Or</div>

            {/* Google Sign In */}
            <button className="btn btn-outline w-full h-12 mb-6">
              <img
                src="/google.png"
                alt="google Image"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Create Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
