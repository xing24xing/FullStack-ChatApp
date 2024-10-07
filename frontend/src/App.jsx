import { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setOnlineUsers } from './redux/userSlice.js';
import { BASE_URL } from './utils/constant.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio;
    if (authUser) {
      socketio = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.close();
      };
    }

    return () => {
      if (socketio) {
        socketio.close();
      }
    };
  }, [authUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
