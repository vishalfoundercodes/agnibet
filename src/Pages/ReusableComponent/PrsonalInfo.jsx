import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../Context/ProfileContext";
import apis from "../../utils/apis";
import axios from "axios";
export default function PersonalInfo() {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
      username: "",
      mobile: "",
      fullname: "",
      email: "",
      address: "",
      city: "",
      pincode: "",
    });
    const { profileDetails, fetchProfile } = useProfile();
    useEffect(() => {
      fetchProfile();
    }, []);
    useEffect(() => {
      if (profileDetails) {
        setFormData({
          username: profileDetails.username || "",
          mobile: profileDetails.mobile || "",
          address: profileDetails.address || "",
          city: profileDetails.address || "",
          fullname: profileDetails.name || "",
          pincode: profileDetails.pincode || "",
          email: profileDetails.email || "",
        });
      }
    }, [profileDetails]);
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        console.log("user name:", formData.username);
        console.log("full name:", formData.fullname);
        console.log("mobile:", formData.mobile);
        console.log("city:", formData.city);
        console.log("address:", formData.address);
        console.log("pincode:", formData.pincode);
        console.log("email:", formData.email);
        const payload = {
          // username: ,
          // mobile: "",
          id: localStorage.getItem("userId"),
          name: formData.fullname,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        };
        const res = await axios.post(apis.updateProfile, payload);
        console.log("update profile:", res?.data);
        if (res?.data?.status == 200) {
          toast.success(res?.data?.message);
          setFormData({
            username: "",
            mobile: "",
            fullname: "",
            email: "",
            address: "",
            city: "",
            pincode: "",
          });
          fetchProfile();
        }
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className="p-4 lg2:p-0 lg2:px-4 min-h-screen ">
      <div className="lg2:flex lg2:gap-4 mb-4 lg2:mt-0 hidden">
        <div
          className="hidden lg2:block cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="44" height="44" rx="8" fill="#636774" />
            <path
              d="M28 31.202L26.2153 33L16.4945 23.2009C16.3378 23.0439 16.2134 22.8572 16.1285 22.6515C16.0437 22.4459 16 22.2253 16 22.0025C16 21.7798 16.0437 21.5592 16.1285 21.3536C16.2134 21.1479 16.3378 20.9612 16.4945 20.8042L26.2153 11L27.9983 12.798L18.8746 22L28 31.202Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="bg-red lg2:rounded-t-2xl p-2 px-4 hidden lg:block">
        <h2 className="text-white text-sm font-semibold">Personal Info</h2>
      </div>
      {/* <form className="space-y-4 bg-white p-6 rounded-b-2xl rounded-t-2xl lg2:rounded-t-none">
       
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            User Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            defaultValue="Vikas"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            defaultValue="Vikas Sharma"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm font-semibold text-grayBorder focus:outline-none border border-grayBorder"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            defaultValue="098764321"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorders"
          />
        </div>

        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Pin Code
          </label>
          <input
            type="text"
            placeholder="Enter pin code"
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

      
        <div className="flex flex-row gap-3 pt-2 lg2:flex-row lg2:justify-end lg2:gap-2">
          <button
            type="button"
            className="border border-darkGray rounded-md py-2 text-ssm font-medium text-darkGray w-full lg2:w-auto px-6"
          >
            Confirm
          </button>
          <button
            type="submit"
            className="bg-red text-white rounded-md py-2 text-ssm font-medium w-full lg2:w-auto px-6"
          >
            Save Changes
          </button>
        </div>
      </form> */}
      <form
        className="space-y-4 bg-grayBg p-6 rounded-b-2xl rounded-t-2xl lg2:rounded-t-none"
        onSubmit={handleSubmit}
      >
        {/* User Name */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            User Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            value={formData.username}
            readOnly
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            defaultValue="Vikas Sharma"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm font-semibold text-grayBorder focus:outline-none border border-grayBorder"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter your phone number"
            readOnly
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            City
          </label>
          <input
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* Pin Code */}
        <div>
          <label className="block text-ssm font-semibold text-white mb-1">
            Pin Code
          </label>
          <input
            type="Number"
            placeholder="Enter pin code"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            className="w-full rounded-md bg-red px-3 py-2 text-ssm focus:outline-none border border-grayBorder font-semibold text-grayBorder"
          />
        </div>

        {/* Buttons */}
        {/* <div className="flex gap-3 pt-2">
          <button
            type="button"
            className="flex-1 border border-darkGray rounded-md py-2 text-ssm font-medium text-darkGray  "
          >
            Confirm
          </button>
          <button
            type="submit"
            className="flex-1 bg-red text-white rounded-md py-2 text-ssm "
          >
            Save
          </button>
        </div> */}
        <div className="flex flex-row gap-3 pt-2 lg2:flex-row lg2:justify-end lg2:gap-2">
          <button
            type="button"
            className="border border-red rounded-md py-2 text-ssm font-medium text-white w-full lg2:w-auto px-6"
            onClick={() => navigate("/")}
          >
            Confirm
          </button>
          <button
            type="submit"
            className="bg-lightMain text-white  cursor-pointer rounded-md py-2 text-ssm font-medium w-full lg2:w-auto px-6"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
