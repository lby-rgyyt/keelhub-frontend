import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar className="fixed h-full" />
      <div className="flex flex-col flex-1" style={{ marginLeft: '250px' }}>
        <Header />
        <div className="flex-1 p-4 mt-16" style={{ marginLeft: '-250px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
