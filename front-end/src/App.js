import React from 'react';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
