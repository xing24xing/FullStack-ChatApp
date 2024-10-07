import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        messageToDelete: null, // Track the message selected for deletion
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        toggleMessageToDelete: (state, action) => {
            state.messageToDelete = state.messageToDelete === action.payload ? null : action.payload; // Toggle the selected message
        },
        deleteMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message._id !== action.payload); // Remove message from the array
        }
    }
});

export const { setMessages, toggleMessageToDelete, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
