import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import Layout
import Home from "./components/Home"; // Import Home
import Menu from "./components/Menu"; // Import Menu
import Shop from "./components/Shop"; // Import Shop
import Bake from "./components/Bake"; // Import Bake
import Login from './components/Login'; // Import Login
import Stage1 from "./components/stages/Stage1"; // Import Stage1
import Stage2 from "./components/stages/Stage2"; // Import Stage2
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
        <Route path="/stage1" element={<Stage1 />} />
        <Route path="/stage2" element={<Stage2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Layout>
  );
};

export default App;
