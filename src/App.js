import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Resume from './components/Resume';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import './App.css';
import { Container } from 'react-bootstrap';
import AboutMe from './components/AboutMe';

const App = () => {
  return (
    <Router>
      <Header />
      <Home />
      <Navigation/>
      <Container className="shadow bg-light py-4 border rounded-bottom border-top-0 " >
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </Container>
    </Router>
  );
};

export default App;


