import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/Profile';
import Minter from './components/Minters';
import Nft from "./components/Nft";
import NotFound from './components/common/NotFound'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/FAQ" />
        <Route path="get-started" />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nft" element={<Nft/>}/>
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Minter />} />
      </Routes>
    </>
  );
}

export default App;
