import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout
import Home from './components/Home'; // Import Home
import Menu from './components/Menu'; // Import Menu
import Shop from './components/Shop'; // Import Shop
import Bake from './components/Bake'; // Import Bake
import Login from './components/Login'; // Import Login
import "./styles/App.scss";
import SignUp from './components/SignUp';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/bake" element={<Bake />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<SignUp />} />
      </Routes>
    </Layout>
  );
};

export default App;