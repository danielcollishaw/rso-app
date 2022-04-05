import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Page Imports
import Home from './Home';
import Login from './Login';
import Register from './Register';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
