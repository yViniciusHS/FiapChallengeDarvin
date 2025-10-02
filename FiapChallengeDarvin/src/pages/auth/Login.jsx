// src/pages/auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allIndustries, allRetailers } from '../../data/mockData';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('retailer');

  const handleLogin = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    if (user.type === 'retailer') {
      navigate('/retailer/dashboard');
    } else {
      navigate('/industry/dashboard');
    }
  };

  const usersToList = userType === 'retailer' ? allRetailers : allIndustries;

  return (
    <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <h1 className="display-4">DARVIN</h1>
        <p className="lead text-muted">Inteligência de Sell-out para Indústria e Varejo</p>
      </div>
      
      <div className="card shadow-sm border-0" style={{ width: '450px' }}>
        <div className="card-body p-4">
          <div className="btn-group d-flex mb-4">
            <button
              type="button"
              className={`btn ${userType === 'retailer' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setUserType('retailer')}
            >
              <i className="bi bi-shop me-2"></i>Sou Varejista
            </button>
            <button
              type="button"
              className={`btn ${userType === 'industry' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setUserType('industry')}
            >
              <i className="bi bi-building me-2"></i>Sou da Indústria
            </button>
          </div>

          <h5 className="text-center text-muted mb-3">Selecione um perfil para logar:</h5>
          
          <div className="list-group">
            {usersToList.map(user => (
              <button 
                key={user.id} 
                className="list-group-item list-group-item-action text-center"
                onClick={() => handleLogin(user)}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}