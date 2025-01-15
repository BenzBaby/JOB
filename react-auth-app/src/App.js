import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'; 
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage'; // Import the HomePage component
import Form from './components/Form'; // Import the page where your form is
import ResetPassword from './components/ResetPassword';  // Import the ResetPassword component

function App() {
  return (
    <Router>
     
       
      
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Homepage" element={<Homepage />} /> {/* Route for the homepage */}
          <Route path="/Form" element={<Form />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    
    </Router>
  );
}

export default App;
