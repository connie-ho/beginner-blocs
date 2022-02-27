import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/Profile';
import Minter from './components/Minters';
import FAQ from './components/faq';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/faq" element={<FAQ />} />
        <Route path="get-started" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Minter />} />
      </Routes>
    </>
  );
}

export default App;
