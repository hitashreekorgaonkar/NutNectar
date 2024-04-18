import React, { useState } from "react";
import { Button, Input2 } from "./index";
import axios from "axios";
const Profile = ({ profile }) => {
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);

  const updateProfile = async () => {
    setError("");
    try {
      const response = await axios.patch("/api/v1/ecommerce/profile", {
        countryCode: "+91",
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      });
      if (response.data.statusCode === 200) {
        // setFirstName(response.data.data.firstName);
      }
    } catch (error) {
      console.log("error", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="grid">
        <div className="bg-white rounded-lg">
          <div
            className={`mx-aut w-full max-w-2xl bg-gy-100 rounded-xl px-10 py-5`}
          >
            <div className="flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                {/* <Logo width="100%" /> */}
              </span>
            </div>
            {/* <h2 className="font-sans text-blue-500 text-lg font-bold leading-tight mb-8"></h2> */}

            {/* <form onSubmit={handleSubmit(submit)} className=""> */}
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4">
                <Input2
                  label="First Name"
                  labelclassname="text-indigo-700"
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Input2>
              </div>
              <div className="col-span-4">
                <Input2
                  label="Last Name"
                  labelclassname="text-indigo-700"
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                ></Input2>{" "}
              </div>
              <div className="col-span-4">
                <Input2
                  label="Phone Number"
                  labelclassname="text-indigo-700"
                  value={phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></Input2>{" "}
              </div>
              <div className="col-span-4">
                <Button
                  type="submit"
                  bgColor="bg-red-500"
                  className="w-full font-semibold"
                  onClick={() => {
                    updateProfile();
                  }}
                >
                  {" "}
                  Submit
                </Button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
