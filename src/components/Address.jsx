import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../components/index";

const Address = ({ address }) => {
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

  //   console.log(address);
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      addressLine1: address?.addressLine1,
      addressLine2: address?.addressLine2,
      city: address?.city,
      pincode: address?.pincode,
      state: address?.state,
      country: address?.country,
    },
  });

  const submit = async (data) => {
    if (address) {
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
      });

      //   if (dbPost) {
      //     navigate(`/post/${dbPost.$id}`);
      //   }
    } else {
      //TODO: 27:00 min video 25

      if (file) {
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          //   navigate(`/post/${dbPost.$id}`);
        }
      }
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

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      //   if (name === "addressLine1") {
      //     setValue("slug", slugTransform(value.addressLine1), {
      //       shouldValidate: true,
      //     });
      //   }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3">
            {" "}
            <Select
              options={indianStates}
              label="state"
              className=" "
              {...register("state", { required: true })}
            />{" "}
          </div>
          <div className="col-span-3">
            <Input
              label="Address Line 1"
              className=""
              {...register("addressLine1", { required: true })}
            ></Input>
          </div>
          <div className="col-span-3">
            <Input
              label="Address Line 2"
              className=""
              {...register("addressLine2", { required: true })}
            ></Input>{" "}
          </div>
          <div className="col-span-3 lg:col-span-1">
            <Input
              label="Pincode"
              className=""
              {...register("pincode", { required: true })}
            ></Input>
          </div>{" "}
          <div className="col-span-3 lg:col-span-1">
            <Input
              label="City"
              className=""
              {...register("city", { required: true })}
            ></Input>
          </div>{" "}
          <div className="col-span-3 lg:col-span-1">
            <Select
              options={["India"]}
              label="country"
              className=""
              {...register("country", { required: true })}
            />
          </div>
          {/* <Button
            type="submit"
            bgColor={address?.addressLine1 ? "bg-green-500" : undefined}
            className="w-full"
          >
            {address?.addressLine1 ? "Update" : "Submit"}
          </Button> */}
        </div>
      </form>
    </>
  );
};

export default Address;
