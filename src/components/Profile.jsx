import React, { useState } from "react";
import { Button, Input2, authService } from "./index";
import axios from "axios";
const Profile = ({ profile }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState(profile.name);

  const updateProfile = async () => {
    setError("");
    try {
      const response = await authService.updateName({
        name,
      });
      // console.log("response", response);
      // if (response.data.statusCode === 200) {
      // setName(response.data.data.name);
      // }
    } catch (error) {
      // console.log("error", error);
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
                  label="Name"
                  labelclassname="text-indigo-700"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                ></Input2>
              </div>
              {/* <div className="col-span-4">
                <Input2
                  label="Phone Number"
                  labelclassname="text-indigo-700"
                  value={phoneNumber || ""}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                ></Input2>{" "}
              </div> */}
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
