import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';

import Home from './home';
import Dog from './dog'; 
import Cat from './cat'; 
import Bird from './bird'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/cat" element={<Cat />} />
          <Route path="/bird" element={<Bird />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
