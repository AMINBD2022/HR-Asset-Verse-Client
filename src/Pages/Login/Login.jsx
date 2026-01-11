import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useGlobalLoading from "../../hooks/useGlobalLoading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import AlreadyLoggedIn from "../../Components/AlreadyLoggedIn";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginUser, user } = useAuth();
  const { withLoading } = useGlobalLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = async (data) => {
    try {
      await withLoading(
        () => loginUser(data.email, data.password),
        "Signing you in..."
      );
      navigate(location.state || "/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome back!",
        text: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  };

  return user ? (
    <AlreadyLoggedIn />
  ) : (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <h1 className="text-3xl font-bold text-primary-content mb-2">
              Welcome Back
            </h1>
            <p className="text-primary-content/80">
              Sign in to your AssetVerse account
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit(handleLogIn)} className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
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
                  <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                </div>
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
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
                  <IoLockClosedOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
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
              <div className="text-right">
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
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-8">Or</div>

            {/* Google Sign In */}
            <button className="btn btn-outline w-full h-12 mb-6">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Create account here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
