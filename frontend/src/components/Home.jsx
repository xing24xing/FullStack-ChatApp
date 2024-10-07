import React, { useEffect } from 'react';
import SideBar from './SideBar';
import MessageContainer from './MessageConatiner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-row sm:h-[450px] md:h-[550px] w-full max-w-4xl rounded-lg overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <SideBar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
