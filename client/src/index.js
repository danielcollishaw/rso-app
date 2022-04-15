import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Page Imports
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Organize from './Organize';
import Found from "./Found";
import Attend from "./Attend";
import Join from "./Join";
import Create from "./Create";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/organize" element={<Organize />}></Route>
        <Route exact path="/university" element={<Found />}></Route>
        <Route exact path="/attend" element={<Attend />}></Route>
        <Route exact path="/join" element={<Join />}></Route>
        <Route exact path="/create" element={<Create />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
