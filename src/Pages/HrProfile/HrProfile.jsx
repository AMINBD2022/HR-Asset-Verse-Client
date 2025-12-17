import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";

const HrProfile = () => {
  const { user, updateUserProfile, isLoading } = useAuth();
  const modalRef = useRef();
  console.log(user);
  const { register, handleSubmit } = useForm();
  const axiosURL = useAxios();
  const [updateUser, setUpdateUser] = useState();

  const { data: hrData = {}, isLoading: loading } = useQuery({
    queryKey: ["hrData", user?.email],
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading)
    return <p className="text-center mt-10">Loading...</p>;
  const handleOpenModal = (user) => {
    modalRef.current.showModal();
    setUpdateUser(user);
  };
  const handleEditProfile = async (data) => {
    const imageFile = data.file[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageBB = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );
    await updateUserProfile({
      displayName: data.name,
      photoURL: imageBB.data.data.url,
    });
    // ---- Update Backend MongoDB Profile ----
    await axiosURL.patch(`/users/${user.email}`, {
      name: data.name,
      photoURL: imageBB.data.data.url,
      phoneNumber: data.phoneNumber,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Profile Update successfull",
      showConfirmButton: false,
      timer: 1500,
    });

    modalRef.current.close();
    console.log({ name: data.name, image: imageBB.data.data.url });
  };
  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Manager Profile</h2>

      <div className="card bg-base-100 shadow-xl p-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
            <img
              src={
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/219/219970.png"
              }
              alt="HR"
            />
          </div>

          {/* Profile Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Role:</span>{" "}
              {hrData?.role || "HR Manager"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">My Company:</span>{" "}
              {hrData?.companyName || "Human Resources"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Phone:</span>{" "}
              {hrData?.phoneNumber || "Not Provided"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Joined At:</span>
              {hrData?.createdAt || "No Date Found"}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => handleOpenModal(user)}
            className="btn btn-secondary"
          >
            Edit Profile <FiEdit />
          </button>
        </div>
      </div>
      {/* Update User Profile  */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Your Profile
          </h2>
          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="space-y-4"
          >
            {/* Asset Name */}
            <div>
              <label className="label">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={updateUser?.displayName}
                placeholder="Your name..."
                className="input w-full"
              />
            </div>

            {/* Profile Image  */}

            <div>
              <label className="label">Profile Image</label>
              {updateUser?.photoURL && (
                <img src={updateUser?.photoURL} className="w-20 h-20 mb-2" />
              )}
              <input
                {...register("file")}
                type="file"
                required
                className="file-input w-full"
              />
              {/* Phone Number  */}
            </div>
            <div>
              <label className="label">Phone Number</label>

              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="Your Phone..."
                className="input w-full"
              />
            </div>
            {/* Submit Button */}
            <button className="btn btn-secondary w-full mt-2">
              Update Now
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">
                <IoMdClose />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HrProfile;
