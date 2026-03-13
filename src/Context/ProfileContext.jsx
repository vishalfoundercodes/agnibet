import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import apis  from "../utils/apis";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileDetails, setProfileDetails] = useState(null);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      const res = await axios.get(`${apis.profile_winbhai}${userId}`);
      console.log("Profile API Response:", res?.data);
      setProfileDetails(res?.data?.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{ profileDetails, setProfileDetails, fetchProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
