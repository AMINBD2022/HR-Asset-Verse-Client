import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoBriefcaseOutline,
} from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAOS from "../hooks/useAOS";
import useGlobalLoading from "../hooks/useGlobalLoading";
import useaxiosPublic from "../hooks/useAxiosPublic";
import DemoCredentials from "../Components/DemoCredentials";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const location = useLocation();
  const [accountType, setAccountType] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, registerUser, profileUpdate } = useAuth();
  const { roleLoading, forceRefreshRole } = useRole();
  const { withLoading } = useGlobalLoading();
  const axiosPublic = useaxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Initialize AOS
  useAOS();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  // Redirect logged-in users to home or intended path
  useEffect(() => {
    if (user && !roleLoading) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [user, roleLoading, navigate, location.state]);

  const handleDemoLogin = (email, password, role) => {
    // Redirect to login page with demo credentials
    navigate("/login", {
      state: {
        demoEmail: email,
        demoPassword: password,
        demoRole: role,
      },
    });
  };

  // const testApiConnection = async () => {
  //   try {
  //     console.log("🧪 Testing API connection...");

  //     // Test basic connection
  //     const healthResponse = await axiosPublic.get("/");
  //     console.log(
  //       "✅ Health check successful:",
  //       healthResponse.status,
  //       healthResponse.data
  //     );

  //     // Test users endpoint with GET
  //     try {
  //       const usersResponse = await axiosPublic.get("/users");
  //       console.log("✅ Users endpoint accessible:", usersResponse.status);
  //       toast.success("API connection and users endpoint working!");
  //     } catch (usersError) {
  //       console.log(
  //         "ℹ️ Users GET endpoint response:",
  //         usersError.response?.status
  //       );
  //       if (usersError.response?.status === 404) {
  //         console.log(
  //           "ℹ️ Users endpoint might not support GET, but server is reachable"
  //         );
  //         toast.success("API connection successful! (Users endpoint exists)");
  //       } else {
  //         throw usersError;
  //       }
  //     }
  //   } catch (error) {
  //     console.error("❌ API test failed:", error);
  //     console.error("❌ Error details:", {
  //       message: error.message,
  //       status: error.response?.status,
  //       data: error.response?.data,
  //     });
  //     toast.error("API connection failed: " + error.message);
  //   }
  // };

  const handleRegistration = async (data) => {
    try {
      // Test API connection first
      console.log("🔗 Testing API connection...");
      try {
        const testRes = await axiosPublic.get("/");
        console.log("✅ API connection test successful:", testRes.status);
      } catch (testError) {
        console.error("❌ API connection test failed:", testError);
        toast.error("Cannot connect to server. Please try again later.");
        return;
      }

      // Password validation
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Validate file upload
      if (!data.file || !data.file[0]) {
        toast.error("Please select a profile photo");
        return;
      }

      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (data.file[0].size > maxSize) {
        toast.error("Image file size must be less than 5MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(data.file[0].type)) {
        toast.error(
          "Please select a valid image file (JPEG, PNG, GIF, or WebP)"
        );
        return;
      }

      await withLoading(async () => {
        console.log("🚀 Starting registration process...");

        // Upload image to ImgBB
        const imageFile = data.file[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        let photoURL;
        try {
          console.log("📤 Uploading image to ImgBB...");
          const imageRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMGBB_KEY
            }`,
            formData
          );
          photoURL = imageRes.data.data.url;
          console.log("✅ Image uploaded successfully:", photoURL);
        } catch (imageError) {
          console.error("❌ Image upload error:", imageError);
          throw new Error("Failed to upload image. Please try again.");
        }

        // Create auth user
        console.log("🔐 Creating Firebase auth user...");
        await registerUser(data.email, data.password);
        console.log("✅ Firebase auth user created");

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
            role: "hr", // Changed to capital H to match the rest of the app
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

        // Validate required fields
        console.log("🔍 Validating user data...");
        if (!newUser.name || !newUser.email || !newUser.role) {
          console.error("❌ Missing required fields:", {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          });
          throw new Error("Missing required user information");
        }

        if (accountType === "hr" && !newUser.companyName) {
          console.error("❌ Missing company name for HR user");
          throw new Error("Company name is required for HR users");
        }

        console.log("✅ User data validation passed");

        // Save to database
        console.log("💾 Saving user to database:", newUser);
        console.log(
          "🌐 API endpoint:",
          axiosPublic.defaults.baseURL + "/users"
        );
        console.log("📤 Request payload:", JSON.stringify(newUser, null, 2));

        let dbRes;
        try {
          dbRes = await axiosPublic.post("/users", newUser);
          console.log("📊 Database response:", dbRes);
          console.log("📊 Database response data:", dbRes.data);
          console.log("📊 Database response status:", dbRes.status);
          console.log("📊 Database response headers:", dbRes.headers);

          // Check if the response indicates success
          if (dbRes.status === 200 || dbRes.status === 201) {
            console.log("✅ Database save successful");
          } else {
            console.error(
              "❌ Unexpected database response status:",
              dbRes.status
            );
            throw new Error("Unexpected response from database");
          }
        } catch (dbError) {
          console.error("❌ Database save error:", dbError);
          console.error("❌ Database error response:", dbError.response);
          console.error("❌ Database error message:", dbError.message);

          if (dbError.response?.status === 400) {
            throw new Error("Invalid user data format");
          } else if (dbError.response?.status === 500) {
            throw new Error("Server error while saving user");
          } else if (dbError.code === "NETWORK_ERROR") {
            throw new Error("Network error - cannot reach server");
          } else {
            throw new Error(
              "Failed to save user to database: " + dbError.message
            );
          }
        }

        // Check for successful database insertion
        if (
          dbRes &&
          (dbRes.data?.insertedId ||
            dbRes.data?.acknowledged ||
            dbRes.status === 200 ||
            dbRes.status === 201)
        ) {
          console.log("✅ User successfully saved to database");

          try {
            // Update Firebase profile
            await profileUpdate({
              displayName: name,
              photoURL,
            });
            console.log("✅ Firebase profile updated");

            // Clear all queries related to the user to force fresh data
            queryClient.clear();
            console.log("✅ Query cache cleared");

            // Force refresh role data (clears cache completely)
            forceRefreshRole();
            console.log("✅ Role data refreshed");

            // Show success message
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration successful!",
              text: `Welcome to AssetVerse, ${
                accountType === "hr" ? "HR Manager" : "Employee"
              }!`,
              showConfirmButton: false,
              timer: 2000,
            });

            // Show success toast
            toast.success("Account created successfully!");
            console.log("✅ Success messages displayed");

            // Navigate to home after delay
            setTimeout(() => {
              console.log("✅ Navigating to home page");
              navigate("/", { replace: true });
            }, 2000);
          } catch (postRegistrationError) {
            console.warn(
              "⚠️ Post-registration error (but registration was successful):",
              postRegistrationError
            );
            // Still show success since the main registration worked
            toast.success("Account created successfully!");
            setTimeout(() => {
              navigate("/", { replace: true });
            }, 2000);
          }
        } else {
          console.error("❌ Database insertion failed");
          throw new Error("Failed to save user to database");
        }
      }, `Creating your ${accountType === "hr" ? "HR Manager" : "Employee"} account...`);
    } catch (err) {
      console.error("Registration error:", err);

      // Handle Firebase Auth errors
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address");
      } else if (err.code === "auth/network-request-failed") {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else if (err.message && err.message.includes("database")) {
        toast.error("Failed to save user information. Please try again.");
      } else if (err.response?.status === 400) {
        toast.error(
          "Invalid registration data. Please check your information."
        );
      } else if (err.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        // Only show generic error for actual failures
        console.error("Unexpected registration error:", err);
        toast.error("Registration failed. Please try again.");
      }
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
            Already registered
          </h2>
          <p className="text-secondary">Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
              className="text-4xl font-bold text-primary-content mb-2"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="400"
            >
              Join AssetVerse
            </h1>
            <p
              className="text-primary-content/80"
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="500"
            >
              Create your account and start managing assets efficiently
            </p>
          </div>

          <div className="p-8">
            {/* Demo Credentials Section */}
            <div
              className="mb-8"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="600"
            >
              <DemoCredentials
                onDemoLogin={handleDemoLogin}
                showCredentials={false}
                message="Click a button above to go to login with demo credentials"
              />
              <p className="text-center text-sm text-secondary mt-3">
                Already have an account? Try our demo credentials above or{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  sign in here
                </Link>
              </p>
            </div>

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
              <img
                src="/google.png"
                alt="google Image"
                className="w-5 h-5 mr-2"
              />
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

export default Register;
