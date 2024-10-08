import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant.js';
import { setMessages } from '../redux/messageSlice.js';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return; // Early exit if no selected user

            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`);

                console.log("Fetched messages:", res.data); // Log the fetched messages
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]); // Fetch messages whenever selectedUser changes
};

export default useGetMessages;
