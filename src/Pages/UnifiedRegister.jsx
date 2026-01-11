import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import useGlobalLoading from "../hooks/useGlobalLoading";
import useaxiosPublic from "../hooks/useAxiosPublic";
import AlreadyLoggedIn from "../Components/AlreadyLoggedIn";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const UnifiedRegister = () => {
  const location = useLocation();
  const [accountType, setAccountType] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, registerUser, profileUpdate } = useAuth();
  const { withLoading } = useGlobalLoading();
  const axiosPublic = useaxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  // Set account type based on URL
  useEffect(() => {
    if (location.pathname === "/join-hr") {
      setAccountType("hr");
    }
  }, [location.pathname]);

  const handleRegistration = async (data) => {
    try {
      // Password validation
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await withLoading(async () => {
        // Upload image to ImgBB
        const imageFile = data.file[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imageRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );

        const photoURL = imageRes.data.data.url;

        // Create auth user
        await registerUser(data.email, data.password);

        // Prepare user object based on account type
        const name = `${data.fname} ${data.lname}`;
        const baseUser = {
          name,
          photoURL,
          email: data.email,
          dateOfBirth: data.date,
          createdAt: new Date(),
        };

        let newUser;
        if (accountType === "hr") {
          newUser = {
            ...baseUser,
            companyName: data.companyName,
            companyLogo: photoURL,
            role: "hr",
            packageLimit: 5,
            currentEmployees: 0,
            subscription: "basic",
          };
        } else {
          newUser = {
            ...baseUser,
            role: "employee",
          };
        }

        // Save to database
        const dbRes = await axiosPublic.post("/users", newUser);

        if (dbRes.data.insertedId) {
          // Update Firebase profile
          await profileUpdate({
            displayName: name,
            photoURL,
          });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful!",
            text: `Welcome to AssetVerse as ${
              accountType === "hr" ? "HR Manager" : "Employee"
            }`,
            showConfirmButton: false,
            timer: 2000,
          });

          navigate(location.state || "/");
        }
      }, `Creating your ${accountType === "hr" ? "HR Manager" : "Employee"} account...`);
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  if (user) {
    return <AlreadyLoggedIn />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <h1 className="text-4xl font-bold text-primary-content mb-2">
              Join AssetVerse
            </h1>
            <p className="text-primary-content/80">
              Create your account and start managing assets efficiently
            </p>
          </div>

          <div className="p-8">
            {/* Account Type Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-neutral mb-4 text-center">
                Choose Your Account Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType("employee")}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    accountType === "employee"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full ${
                        accountType === "employee"
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 text-neutral"
                      }`}
                    >
                      <IoPersonOutline className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-neutral">Employee</h3>
                      <p className="text-sm text-secondary mt-1">
                        Request and manage your assigned assets
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAccountType("hr")}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    accountType === "hr"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-base-300 hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className={`p-4 rounded-full ${
                        accountType === "hr"
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 text-neutral"
                      }`}
                    >
                      <IoBriefcaseOutline className="w-8 h-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-neutral">HR Manager</h3>
                      <p className="text-sm text-secondary mt-1">
                        Manage company assets and employees
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-6"
            >
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral border-b border-base-200 pb-2">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">First Name</span>
                    </label>
                    <input
                      {...register("fname", {
                        required: "First name is required",
                      })}
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter your first name"
                    />
                    {errors.fname && (
                      <span className="text-error text-sm mt-1">
                        {errors.fname.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Last Name</span>
                    </label>
                    <input
                      {...register("lname", {
                        required: "Last name is required",
                      })}
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter your last name"
                    />
                    {errors.lname && (
                      <span className="text-error text-sm mt-1">
                        {errors.lname.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Email Address
                      </span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <span className="text-error text-sm mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      {...register("date", {
                        required: "Date of birth is required",
                      })}
                      type="date"
                      className="input input-bordered w-full"
                    />
                    {errors.date && (
                      <span className="text-error text-sm mt-1">
                        {errors.date.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Information (HR Only) */}
              {accountType === "hr" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral border-b border-base-200 pb-2">
                    Company Information
                  </h3>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Company Name
                      </span>
                    </label>
                    <input
                      {...register("companyName", {
                        required:
                          accountType === "hr"
                            ? "Company name is required"
                            : false,
                      })}
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter your company name"
                    />
                    {errors.companyName && (
                      <span className="text-error text-sm mt-1">
                        {errors.companyName.message}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Profile Photo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral border-b border-base-200 pb-2">
                  Profile Photo
                </h3>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      {accountType === "hr"
                        ? "Profile Photo / Company Logo"
                        : "Profile Photo"}
                    </span>
                  </label>
                  <input
                    {...register("file", {
                      required: "Profile photo is required",
                    })}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full"
                  />
                  {errors.file && (
                    <span className="text-error text-sm mt-1">
                      {errors.file.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral border-b border-base-200 pb-2">
                  Security
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        type={showPassword ? "text" : "password"}
                        className="input input-bordered w-full pr-12"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                      >
                        {showPassword ? (
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

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Confirm Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        className="input input-bordered w-full pr-12"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                      >
                        {showConfirmPassword ? (
                          <IoEyeOutline className="w-5 h-5" />
                        ) : (
                          <IoEyeOffOutline className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-error text-sm mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <span className="text-error text-sm mt-1">
                    {errors.terms.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full h-14 text-lg font-semibold"
              >
                Create {accountType === "hr" ? "HR Manager" : "Employee"}{" "}
                Account
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-8">Or</div>

            {/* Google Sign Up */}
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

            {/* Sign In Link */}
            <p className="text-center text-secondary">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedRegister;
