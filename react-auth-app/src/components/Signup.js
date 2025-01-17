import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px; /* Reduced padding for a smaller height */
  border-radius: 20px;
  width: 350px; /* Increased width for the form container */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px; /* Adjusted spacing */
`;

const InputContainer = styled.div`
  margin-bottom: 15px; /* Adjusted spacing */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 95%; /* Inputs remain full width */
  padding: 8px; /* Reduced padding for smaller height */
  border: ${props => (props.error ? '1px solid red' : '1px solid #ccc')};
  border-radius: 15px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px; /* Slightly smaller padding for buttons */
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  background-color: #f8f9fa;
  color:rgb(255, 255, 255);
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
`;


function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        console.log(data);
        // Handle successful signup (e.g., redirect to login page)
      } else {
        setError(data.error || 'Signup failed!');
      }
    } catch (err) {
      setError('An error occurred during signup.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Signup</Title>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>First Name:</Label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>Last Name:</Label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!emailRegex.test(email)} 
            />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={!passwordRegex.test(password)} 
            />
          </InputContainer>
          <InputContainer>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputContainer>
          <Button type="submit">Signup</Button>
        </form>
        <center>or</center>
        <SecondaryButton onClick={() => navigate('/Login')}>
          Login
        </SecondaryButton>
      </FormContainer>
    </Container>
  );
}

export default Signup;