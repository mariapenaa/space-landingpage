
import './App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Technology from 'components/Technology/Technology';
import Crew from 'components/Crew/Crew';
import Home from 'components/Home/Home';
import Destination from 'components/Destination/Destination';
import Error from 'components/Error/Error';
import Header from 'components/Header/Header';


const App = () => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
            <Route path="/space-landingpage/" element={<Home />}  />
            <Route path="/space-landingpage/crew" element={<Crew />} />
            <Route path="/space-landingpage/technology" element={<Technology />} />
            <Route path="/space-landingpage/destination" element={<Destination />} />
            <Route element={Error} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
