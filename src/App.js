import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import TaskManagement from "./components/TaskManagement";
import Feed from "./components/Feed";
import Navbar from './components/Navbar';
import { FeedProvider } from './context/FeedContext';



const App = () => {
  return (
    <FeedProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
    </FeedProvider>
  );
};

export default App;
