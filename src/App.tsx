import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout
import Home from './components/Home'; // Import Home
import Menu from './components/Menu'; // Import Menu
import Shop from './components/Shop'; // Import Shop
import Bake from './components/Bake'; // Import Bake

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/bake" element={<Bake />} />
      </Routes>
    </Layout>
  );
};

export default App;