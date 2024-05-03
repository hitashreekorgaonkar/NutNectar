import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, authService } from "./index";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { appwriteService } from "./index";

const AddressForm = ({
  profileID,
  addrDialogOpen,
  onClose,
  isEdit,
  address,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  // const [localAddress, setLocalAddress] = useState(address || "");

  const onClose2 = () => {
    reset({});
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      houseFloor: address?.houseFloor,
      building: address?.building,
      landmark: address?.landmark,
      city: address?.city,
      pincode: address?.pincode,
      state: address?.state,
      // label: address?.label,
    },
  });

  useEffect(() => {
    reset({
      houseFloor: address?.houseFloor || "",
      building: address?.building || "",
      landmark: address?.landmark || "",
      city: address?.city || "",
      pincode: address?.pincode || null,
      state: address?.state || "Maharashtra",
    });
    // setLocalAddress(address || "");
  }, [address, reset]);

  const submit = async (data) => {
    if (isEdit) {
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await appwriteService.updateAddress(address?.$id, {
            ...data,
            userId: profileID,
          });
          onClose();
          onClose2();
          // console.log("updateAddress response", response.data);
          setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            setLoginError(error?.response.data?.message);
            console.log("Request canceled", error.message);
            return;
          }
          setError(true);
          setLoading(false);
        }
      })();
    } else {
      //TODO: 27:00 min video 25
      (async () => {
        try {
          setLoading(true);
          setError(false);
          const response = await appwriteService.addAddress({
            ...data,
            userId: profileID,
          });
          onClose();
          onClose2();
          // console.log("response", response);
          setLoading(false);
        } catch (error) {
          if (axios.isCancel(error)) {
            setLoginError(error?.response.data?.message);
            console.log("Request canceled", error.message);
            return;
          }
          setError(true);
          setLoading(false);
        }
      })();
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  // React.useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     //   if (name === "houseFloor") {
  //     //     setValue("slug", slugTransform(value.houseFloor), {
  //     //       shouldValidate: true,
  //     //     });
  //     //   }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);

  return (
    <>
      {addrDialogOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
              <div className="relative transform rounded-lg backdrop-opacity-10 backdrop-invert bg-white/30 p-5 text-left shadow-xl transition-all sm:w-full sm:max-w-2xl ">
                <div className="bg-white rounded-lg">
                  <div className="absolute -right-3 -top-3">
                    <button
                      onClick={() => {
                        onClose();
                        onClose2();
                      }}
                      type="button"
                      className="rounded-full bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>{" "}
                  <div
                    className={`mx-auto w-full max-w-2xl bg-gy-100 rounded-xl px-10 py-5 border border-black/10`}
                  >
                    <div className="flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                      </span>
                    </div>
                    <h2 className="font-sans text-blue-500 text-lg font-bold leading-tight mb-8">
                      Enter Location Information
                    </h2>

                    {error && (
                      <p className="text-red-600 mt-8 text-center">
                        {loginError}
                      </p>
                    )}
                    <form onSubmit={handleSubmit(submit)} className="">
                      <div className="grid grid-cols-4 gap-6">
                        <div className="col-span-4">
                          <Input
                            label="House No. & Floor*"
                            className=""
                            {...register("houseFloor", { required: true })}
                          ></Input>
                        </div>
                        <div className="col-span-4">
                          <Input
                            label="Building*"
                            className=""
                            {...register("building", { required: true })}
                          ></Input>{" "}
                        </div>{" "}
                        <div className="col-span-4">
                          <Input
                            label="Landmark and Area Name"
                            className=""
                            {...register("landmark", { required: true })}
                          ></Input>{" "}
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            label="Pincode"
                            className=""
                            {...register("pincode", {
                              minLength: 6,
                              maxLength: 6,
                              valueAsNumber: true,
                              required: true,
                            })}
                          ></Input>
                        </div>{" "}
                        <div className="col-span-2">
                          <Input
                            label="City"
                            className=""
                            {...register("city", { required: true })}
                          ></Input>
                        </div>{" "}
                        <div className="col-span-3">
                          {" "}
                          <Select
                            options={indianStates}
                            label="state"
                            className=" "
                            {...register("state", { required: true })}
                          />{" "}
                        </div>
                        <div className="col-span-4">
                          <Button
                            type="submit"
                            bgColor={isEdit ? "bg-green-500" : "bg-red-500"}
                            className="w-full font-semibold"
                          >
                            {isEdit ? "Update" : "Save & Continue"}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressForm;
