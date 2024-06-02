import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ToastMessage from '../component/ToastMessage';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const user = null;

  useEffect(() => {}, []);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes('admin') ? (
        <div>
          <Sidebar />
          {children}
        </div>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
    </div>
  );
};

export default AppLayout;
