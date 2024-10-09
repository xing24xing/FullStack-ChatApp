import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice.js';
import { BASE_URL, USER_API } from '../utils/constant.js';
import OtherUsers from './OtherUsers';

function SideBar() {
    const [search, setSearch] = useState('');
    const { otherUsers } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
            toast.error("Logout failed!");
        }
    };

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    };

    return (
        <div className='border-r border-slate-600 p-4 flex flex-col h-full'>
            <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-purple-600 text-white'>
                    <FaSearch className='w-5 h-5 outline-none' />
                </button>
            </form>
            <div className="divider px-3"></div>
            <div className="flex-1 overflow-auto"> {/* Make this section scrollable */}
                <OtherUsers />
            </div>
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm w-full'>Logout</button>
            </div>
        </div>
    );
}

export default SideBar;
