import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import Home from './components/Home'; // Import Home
import Menu from './components/Menu'; // Import Menu
import Bake from './components/Bake'; // Import Bake
import Footer from './components/Footer'; //Import Footer
import Login from './components/Login'; // Import Login
import SignUp from './components/SignUp'; // Import SignUp
import Stage1 from "./components/stages/Stage1"; // Import Stage1
import Stage2 from "./components/stages/Stage2"; // Import Stage2
import Stage3 from "./components/stages/Stage3"; // Import Stage3
import Stage5 from "./components/stages/Stage5"; // Import Stage5
import Stage4 from "./components/stages/Stage4"; //Import Stage4
import GameStages from "./components/GameStages"; // Import Game Stages
import Stage6 from "./components/stages/Stage6"; // Import Stage6
import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bake"
          element={
            <ProtectedRoute>
              <Bake />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage1"
          element={
            <ProtectedRoute>
              <Stage1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage2"
          element={
            <ProtectedRoute>
              <Stage2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage3"
          element={
            <ProtectedRoute>
              <Stage3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage4"
          element={
            <ProtectedRoute>
              <Stage4 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage5"
          element={
            <ProtectedRoute>
              <Stage5 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stage6"
          element={
            <ProtectedRoute>
              <Stage6 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gamestages"
          element={
            <ProtectedRoute>
              <GameStages />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Layout>
  );
};

export default App;
