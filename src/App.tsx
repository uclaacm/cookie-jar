<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout
import Home from './components/Home'; // Import Home
import Menu from './components/Menu'; // Import Menu
import Shop from './components/Shop'; // Import Shop
import Bake from './components/Bake'; // Import Bake
import Footer from './components/Footer'; //Import Footer
import Login from './components/Login'; // Import Login
<<<<<<< HEAD
import SignUp from './components/SignUp'; // Import SignUp
import Stage1 from "./components/stages/Stage1"; // Import Stage1
import Stage2 from "./components/stages/Stage2"; // Import Stage2
=======
=======
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout
import Home from "./components/Home"; // Import Home
import Menu from "./components/Menu"; // Import Menu
import Shop from "./components/Shop"; // Import Shop
import Bake from "./components/Bake"; // Import Bake
import Stage1 from "./components/stages/Stage1"; // Import Stage1
import Stage2 from "./components/stages/Stage2"; // Import Stage2
>>>>>>> 91100f0 (Completed Stage 1 and began on Stage 2)
>>>>>>> 3c5fbcc (Completed Stage 1 and began on Stage 2)
import "./styles/App.scss";


const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/bake" element={<Bake />} />
<<<<<<< HEAD
        <Route path="/stage1" element={<Stage1 />} />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
=======
<<<<<<< HEAD
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<SignUp />} />
=======
        <Route path="/stage1" element={<Stage1 />} />
        <Route path="/stage2" element={<Stage2 />} />
>>>>>>> 91100f0 (Completed Stage 1 and began on Stage 2)
>>>>>>> 3c5fbcc (Completed Stage 1 and began on Stage 2)
      </Routes>
      <Footer />
    </Layout>
  );
};

export default App;
