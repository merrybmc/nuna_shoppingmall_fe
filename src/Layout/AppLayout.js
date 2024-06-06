import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ToastMessage from '../component/ToastMessage';
import styled from 'styled-components';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const user = null;

  useEffect(() => {}, []);

  return (
    <>
      <ToastMessage />
      {location.pathname.includes('admin') ? (
        <div>
          <Sidebar />
          {children}
        </div>
      ) : (
        <>
          <Navbar user={user} />
          <Layout>{children}</Layout>
        </>
      )}
    </>
  );
};

export default AppLayout;

const Layout = styled.div`
  padding-top: 265px;
`;
