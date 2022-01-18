import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Warld</p>
      </header>
      <Router>
        <Routes>
          <Route path="/"></Route>
          <Route path="/FAQ"></Route>
          <Route path="getting-started"></Route>
          <Route path="/profile"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
