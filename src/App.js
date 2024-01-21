import React from 'react';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import Header from './components/Header';
import Exchange from './components/Exchange';
import Coins from './components/Coins';
import Coinsdetail from './components/Coinsdetail';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/exchange" element={<Exchange/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/coin/:id" element={<Coinsdetail/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
// npx create-react-app . --template @chakra-ui is first step create a folder then inside that folder write this code in cli
// npm i react-router-dom
// npm i react-icons axios chart.js react-chartjs-2