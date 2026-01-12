import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { RxCross2 } from "react-icons/rx";
import useaxiosPublic from "../../hooks/useAxiosPublic";
import useAOS from "../../hooks/useAOS";
import { pageAnimations } from "../../utils/aosAnimations";

const RequestAsset = () => {
  const { user } = useAuth();
  const axiosURL = useaxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const modalRef = useRef();
  const [request, setRequest] = useState({});
  const viewModalRef = useRef();
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Initialize AOS
  useAOS();

  // Load all assets
  const { data: assets = [], isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosURL.get("/assets");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div
        className="text-center py-12"
        data-aos="fade-in"
        data-aos-duration="600"
      >
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-secondary">Loading assets...</p>
      </div>
    );

  // Handle form submit

  const handleAssetRequst = async (data) => {
    //  request data  Genarate------------------
    const requestAssetData = {
      assetId: request._id,
      assetName: request.productName,
      assetImage: request.productImage,
      assetType: request.productType,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      employeePhoto: user?.photoURL,
      hrEmail: request.hrEmail,
      companyName: request.companyName,
      requestStatus: "pending",
      requestDate: new Date(),
      approvalDate: null,
      processedBy: null,
      note: data.note,
    };

    // Submit request-----------
    axiosURL
      .post("/asset-requests", requestAssetData)
      .then((res) => {
        if (res.data.insertedId) {
          modalRef.current.close();
          reset();
          Swal.fire({
            icon: "success",
            title: "Request submitted!",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: err.message,
        });
      });
  };

  const handleOpenModal = (asset) => {
    setRequest(asset);
    modalRef.current.showModal();
    modalRef.current.focus();
  };

  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    viewModalRef.current?.showModal();
  };

  return (
    <div className="bg-base-200">
      <div className="py-8" data-aos="fade-down" data-aos-duration="800">
        <h1 className="text-3xl font-bold text-center text-neutral mb-2">
          Request Assets
        </h1>
        <p className="text-center text-secondary">
          Browse and request available company assets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 w-11/12 max-w-7xl mx-auto pb-15">
        {assets.map(
          (asset, index) =>
            asset.availableQuantity > 0 && (
              <div
                key={asset._id}
                className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={`${index * 100}`}
              >
                <figure>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-full h-auto aspect-2/1 object-cover"
                  />
                </figure>
                <div className="card-body p-3">
                  <h2
                    className="card-title border-b"
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay={`${200 + index * 100}`}
                  >
                    {asset.productName.slice(0, 15)}...
                  </h2>
                  <h2
                    data-aos="fade-right"
                    data-aos-duration="400"
                    data-aos-delay={`${300 + index * 100}`}
                  >
                    <span className="font-bold">Company : </span>
                    <span className="text-sm">{asset.companyName}</span>
                  </h2>
                  <p
                    className="badge badge-outline"
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={`${400 + index * 100}`}
                  >
                    {asset.productType}
                  </p>
                  <div
                    className="card-actions justify-start"
                    data-aos="fade-up"
                    data-aos-duration="400"
                    data-aos-delay={`${500 + index * 100}`}
                  >
                    <button
                      onClick={() => handleOpenModal(asset)}
                      className="btn btn-outline btn-primary"
                    >
                      Collect
                    </button>
                    <button
                      onClick={() => handleViewAsset(asset)}
                      className="btn btn-outline btn-secondary"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {/*---------------- Modal For Asset Reques ---------------- */}
      <dialog
        ref={modalRef}
        tabIndex="-1"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box" data-aos="zoom-in" data-aos-duration="400">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Request An Asset
          </h2>
          <h2 className="font-bold text-lg">
            Product Name : {request.productName}
          </h2>
          <form
            onSubmit={handleSubmit(handleAssetRequst)}
            className="space-y-4"
          >
            <label className="label mb-2">Reason: </label>
            <textarea
              {...register("note", {
                required: true,
              })}
              className="w-full textarea"
              placeholder="Note..."
            ></textarea>
            <button className="btn btn-secondary w-full mt-2">
              Request Now
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* View asset Modal  */}
      <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box" data-aos="fade-up" data-aos-duration="400">
          {selectedAsset && (
            <>
              <h2 className="text-2xl font-bold mb-3">
                {selectedAsset.productName}
              </h2>

              <img
                src={selectedAsset.productImage}
                alt={selectedAsset.productName}
                className="w-full aspect-2/1  object-cover rounded mb-3"
              />

              <p>
                <strong>Company:</strong> {selectedAsset.companyName}
              </p>
              <p>
                <strong>Type:</strong> {selectedAsset.productType}
              </p>
              <p>
                <strong>Available:</strong>{" "}
                <span className="text-secondary font-semibold">
                  {selectedAsset.availableQuantity}
                </span>
              </p>
              <p>
                <strong>HR Email:</strong> {selectedAsset.hrEmail}
              </p>
            </>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">
                <RxCross2 />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
