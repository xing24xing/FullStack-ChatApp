import React, { useState, useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa'; // React icon for trash
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BASE_URL, playNotificationSound } from '../utils/constant.js'; // Include playNotificationSound here
import { deleteMessage } from '../redux/messageSlice'; // Import deleteMessage action

const Message = ({ message }) => {
    const [showDelete, setShowDelete] = useState(false);
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleDoubleClick = () => {
        setShowDelete((prev) => !prev);
    };

    const handleDeleteMessage = async () => {
        try {
            const res = await axios.delete(`${BASE_URL}/api/v1/message/delete/${message._id}`);
            toast.success(res.data.message);
            dispatch(deleteMessage(message._id)); // Update Redux state to remove the message
            setShowDelete(false);
        } catch (error) {
            console.error("Error deleting message:", error);
            toast.error("Failed to delete message.");
        }
    };

    const isSender = message?.senderId === authUser?.user?._id;

    return (
        <div 
            ref={scroll} 
            onDoubleClick={handleDoubleClick}
            className={`relative chat ${isSender ? 'chat-end' : 'chat-start'}`}
        >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="User Avatar"
                        src={isSender ? authUser?.user?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className={`chat-bubble ${!isSender ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'}`}>
                {message?.message}
            </div>

            {showDelete && (
                <FaTrash 
                    onClick={handleDeleteMessage}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-red-500 cursor-pointer"
                    size={18}
                />
            )}
        </div>
    );
};

export default Message;



