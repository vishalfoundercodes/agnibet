import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import apis from "../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const {t}=useTranslation()
  // State to toggle each field visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async(values) => {
      const userId=localStorage.getItem('userId')
      console.log("Password change payload:", userId);
      console.log("Password change payload:", { ...values, userid:userId });
      // API call here
      try{
        const payload = {
          old_password: values.currentPassword,
          new_password: values.newPassword,
          confirm_password: values.confirmPassword,
          userid: userId,
        };
        console.log(payload)
           const res = await axios.post(apis.changePassword, payload);
                  console.log(res);

                  if (res?.data?.status === 200) {
                    toast.success(res?.data?.msg);
                    localStorage.clear()
                    navigate("/login");
                  }
                  if (res?.data?.status === 400) {
                    toast.error(res?.data?.msg);
                  }
      }catch(error){
          console.log(error)
            if (error?.response?.data?.status === 400) {
              toast.error(error?.response?.data?.msg);
              console.log('fgh')
            }
      }
    },
  });

  return (
    <div className="py-4 px-2 bg-red rounded-2xl m-2 lg2:m-0">
      <form onSubmit={formik.handleSubmit} className="space-y-4 font-semibold">
        {/* Current Password */}
        <div>
          <label className="block text-ssm mb-1 text-white">
            {t(`Current_Password`)}
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              placeholder={t("Enter_current_password")}
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 rounded-[8px] bg-white border border-gray-300 focus:outline-none "
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-white text-xs mt-1">
              {formik.errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-ssm mb-1 text-white">
            {t(`New_Password`)}
          </label>
          <div className="relative">
            <input
              type={showNew ? t("text") : t("password")}
              name="newPassword"
              placeholder={t("Enter_new_password")}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2  rounded-[8px] bg-white border border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-white text-xs mt-1">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-ssm mb-1 text-white">
            {t(`Confirm_New_Password`)}
          </label>
          <div className="relative">
            <input
              type={showConfirm ? t("text") : t("password")}
              name="confirmPassword"
              placeholder={t("Confirm_New_Password")}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2  rounded-[8px] bg-white border border-gray-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-white text-xs mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-lightMain text-white py-2 rounded-[8px] font-semibold text-ssm hover:text-red cursor-pointer"
        >
          {t(`Update_Password`)}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
