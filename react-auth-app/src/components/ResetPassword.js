import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 15%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
`;

const Error = styled.p`
  color: red;
  margin-top: 10px;
`;

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success message

    try {
      const response = await fetch('http://localhost:5001/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message); // Show success message
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred while resetting the password.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Reset Password</Title>
        {error && <Error>{error}</Error>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>Current Password:</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </InputContainer>
          <InputContainer>
            <Label>New Password:</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </InputContainer>
          <Button type="submit">Reset Password</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default ResetPassword;
