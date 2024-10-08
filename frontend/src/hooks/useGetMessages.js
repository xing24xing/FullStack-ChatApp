import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOtherUsers } from '../redux/userSlice.js';
import { BASE_URL } from '../utils/constant.js';

const useGetOtherUser = (token) => { // Accept token as a parameter
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}` // Set the Authorization header
          }
        });
        // Store
        console.log("other users -> ", res);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("Error fetching other users:", error);
      }
    };

    if (token) { // Check if token exists before making the request
      fetchOtherUsers();
    }
  }, [dispatch, token]);
};

export default useGetOtherUser;
