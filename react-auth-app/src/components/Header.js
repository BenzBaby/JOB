import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Header = () => {
  const handleLogout = () => {
    // Logic for logout
    alert("Logged out!");
  };

  const handlePasswordReset = () => {
    // Logic for password reset
    alert("Password reset initiated!");
  };

  return (
    <HeaderContainer>
      <h2>Profile Section</h2>
      <div>
        <Button onClick={handlePasswordReset}>Change Password</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </HeaderContainer>
  );
};

export default Header;
