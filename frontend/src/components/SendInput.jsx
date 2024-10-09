import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { setMessages } from "../redux/messageSlice.js";
import { IoSend } from "react-icons/io5";
import Picker from 'emoji-picker-react'; // Correct import

function SendInput() {
  const [message, setMessage] = useState(""); // Input message
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Control emoji picker visibility
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user); // User to whom the message is sent
  const { messages } = useSelector(store => store.message); // Existing messages

  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    setMessage(message + emojiData.emoji); // Append selected emoji to the input field
  };

  // Handle sending the message
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      console.log("Message is empty or undefined.");
      return; // Prevent sending empty or undefined messages
    }

    console.log("Message to send:", message); // Debugging message content
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, 
        { message }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      // Check if the response has the new message
      if (res?.data?.newMessage) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setMessage(""); // Clear input field after sending
      } else {
        console.log("No new message in the response.");
      }

    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 my-3 relative">
      <div className="w-full relative">
        {/* Message Input Field */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full p-3 pl-10 pr-10 border-zinc-500 bg-gray-600 text-white" // Add padding to the left and right
        />

        {/* Emoji Picker Trigger */}
        <button 
          type="button" 
          onClick={() => setShowEmojiPicker((prev) => !prev)} 
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          😀 {/* Emoji icon */}
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-10">
            <Picker 
              onEmojiClick={onEmojiClick} 
              pickerStyle={{ width: '300px', height: '300px' }} // Adjust emoji picker size
            />
          </div>
        )}

        {/* Send Button */}
        <button type="submit" className="absolute flex inset-y-0 right-0 items-center pr-4">
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
