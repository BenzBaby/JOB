import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Routes instead of Switch
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>User Authentication App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/login" element={<Login />} />  {/* Use element instead of component */}
          <Route path="/signup" element={<Signup />} />  {/* Use element instead of component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
