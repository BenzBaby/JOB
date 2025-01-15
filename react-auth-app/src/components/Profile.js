import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const Button = styled.button`
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 3px;
`;

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session or token, and redirect to login
    alert('Logged out');
    navigate('/login');
  };

  const handleChangePassword = () => {
    // Implement password change logic
    alert('Password change initiated');
  };

  return (
    <Header>
      <h2>Profile</h2>
      <div>
        <Button onClick={handleChangePassword}>Change Password</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Header>
  );
};

export default Profile;
