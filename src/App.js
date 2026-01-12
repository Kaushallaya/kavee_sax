import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import axios from 'axios';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Music from './components/Music';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Biography from './components/Biography';
import Contact from './components/Contact';
import Footer from './components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="bg-black text-white">
      <Header />
      <Hero />
      <Services />
      <Music />
      <Events />
      <Gallery />
      <Biography />
      <Contact />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
