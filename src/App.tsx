import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';

import Bake from './components/Bake'
import Menu from './components/Menu'
import Shop from './components/Shop'
import Home from './components/Home'
import TopAppBar from './components/TopAppBar'

function App() {

  return (
    <>
      <TopAppBar />
      <Routes>
       <Route path="/Bake" element={<Bake />} />
       <Route path="/Menu" element={<Menu />} />
       <Route path="/Shop" element={<Shop />} />
       <Route path="/" element={<Home />} />
      </Routes>

    </>

  )
}

export default App
