import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-header">Вы не авторизованы</h2>
        <p className="dashboard-info">Пожалуйста, войдите в систему.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Личный кабинет</h1>
      <p className="dashboard-info">Добро пожаловать, {user.name}!</p>
      <p className="dashboard-info">Email: {user.email}</p>
      <button className="dashboard-logout-btn" onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Dashboard;
