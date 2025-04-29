import logo from './image.png';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SimilaritySearch from "./SimilaritySearch";
import Home from "./Home";
import Student from "./studentView";
function App() {
  return (
    <BrowserRouter>
    <nav class = "App">
      <header className='App-header'>
            <img src={logo} className="logo" alt="logo" />
      </header>
      <div className = "contents">
      <ul >
        <li>
          <Link to="/" className="no-underline">Home</Link>
        </li>
        <li>
          <Link to="/SimilaritySearch" className="no-underline">Similarity Search</Link>
        </li>
        <li>
          <Link to="/student" className="no-underline">Student</Link>
        </li>
      </ul>
      </div>
    </nav>


    <Routes>
      <Route path="/SimilaritySearch" element={<SimilaritySearch />} />
      <Route path="/" element={<Home />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  </BrowserRouter>
    
 
  );
}

export default App;
