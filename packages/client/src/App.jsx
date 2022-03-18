import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Profile from './components/Profile';
import Minter from './components/Minters';
import NftDetails from './components/NftDetails';
import NotFound from './components/common/NotFound';
import FAQ from './components/FAQ';

import RequireAuth from './RequireAuth';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="get-started" />
        <Route path="/user/:userAddress" element={<Profile owner={false} />} />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile owner={true} />
            </RequireAuth>
          }
        />

        <Route path="/nft" element={<NftDetails />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <Minter />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
