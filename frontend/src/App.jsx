import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Nav from './components/Nav'
import Home from './components/Home'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/FAQ" />
        <Route path="getting-started" />
        <Route path="/profile"/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
