import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setOtherUsers } from '../redux/userSlice.js';
import { BASE_URL } from '../utils/constant.js';

const useGetOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // Set withCredentials for all axios requests
        axios.defaults.withCredentials = true;

        // Make the GET request to fetch users
        const res = await axios.get(`${BASE_URL}/api/v1/user`);

        // Log the response for debugging
        console.log("other users -> ", res.data);

        // Dispatch the action to store the users in the Redux state
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        // Log the error message
        console.error("Error fetching other users:", error);
      }
    };

    // Call the function to fetch users
    fetchOtherUsers();
  }, [dispatch]); // Add dispatch to the dependency array
};

export default useGetOtherUser;
