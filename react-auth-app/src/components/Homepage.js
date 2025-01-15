import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const PasswordResetLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 40px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const Card = styled.div`
  padding: 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color:rgb(100, 217, 79);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if no token is found in localStorage
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleCardClick = () => {
    navigate('/Form');
  };

  const handleLogout = () => {
    // Clear the token from localStorage to log the user out
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate('/login');
  };

  return (
    <HomeContainer>
      <Header>
        <HeaderTitle>Homepage</HeaderTitle>
       
        <PasswordResetLink to="/reset-password">Reset Password</PasswordResetLink>
        
        
      </Header>
      <HomeContent>
        <h2>Welcome to the Homepage!</h2>
        <p>You are successfully logged in.</p>
        <Card onClick={handleCardClick}>Go to Form</Card>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        
      </HomeContent>
    </HomeContainer>
  );
};

export default HomePage;
