import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// importing the Navbar component
import Navbar from './Components/Navbar';

// importing pages for each animal
import Home from './home';
import Dog from './dog'; 
import Cat from './cat'; 
import Bird from './bird'; 

// importing stylesheet
import './App.css';

// App component
function App() {
  // using Router for navigation
  return (
    <Router>
      // display Navbar at the top
      <Navbar />
      // main app content
      <div className="App">
        // defining routes for each page
        <Routes>
          // home page route
          <Route exact path="/" element={<Home />} />
          // dog page route
          <Route path="/dog" element={<Dog />} />
          // cat page route
          <Route path="/cat" element={<Cat />} />
          // bird page route
          <Route path="/bird" element={<Bird />} />
        </Routes>
      </div>
    </Router>
  );
}

// making App available for import
export default App;