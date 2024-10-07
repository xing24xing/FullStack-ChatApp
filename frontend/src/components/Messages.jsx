import React from 'react';
import useGetMessages from '../hooks/useGetMessages.js';
import useGetRealTime from '../hooks/useGetRealTime.js';
import { useSelector } from 'react-redux';
import Message from './Message';

function Messages() {
    // Custom hooks for fetching messages and listening to real-time events
    useGetMessages();
    useGetRealTime();

    const { messages } = useSelector((store) => store.message);
    const { authUser, selectedUser } = useSelector((store) => store.user);

    const currentUserId = authUser?.user?._id;
    const selectedUserId = selectedUser?._id;

    // Filter messages to show only the conversation between the current user and the selected user
    const filteredMessages = Array.isArray(messages) 
        ? messages.filter((message) => (
            (message.senderId === currentUserId && message.receiverId === selectedUserId) ||
            (message.senderId === selectedUserId && message.receiverId === currentUserId)
        )) 
        : []; // Fallback to an empty array if messages is not an array

    return (
        <div className="px-4 flex-1 overflow-auto">
            {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                    <Message key={message._id} message={message} />
                ))
            ) : (
                <div>No messages yet.</div>
            )}
        </div>
    );
}

export default Messages;
