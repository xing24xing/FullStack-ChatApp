import React from "react";
import { useSelector } from "react-redux";
import useGetOtherUser from "../hooks/useGetOtherUser.js";
import OtherUser from "./OtherUser";


function OtherUsers() {
    useGetOtherUser();
    const { otherUsers } = useSelector((store) => store.user);

    if (!otherUsers) return null;

    return (
        <div className="overflow-auto flex-1">
            {otherUsers.map((user) => (
                <OtherUser key={user._id} user={user} />
            ))}
        </div>
    );
}

export default OtherUsers;
