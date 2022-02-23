import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/Profile';
import Minter from './components/Minters';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/FAQ" />
        <Route path="get-started" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Minter />} />
      </Routes>
    </Router>
  );
}

export default App;
