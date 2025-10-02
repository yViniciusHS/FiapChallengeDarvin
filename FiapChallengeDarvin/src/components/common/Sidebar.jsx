// src/components/common/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ user, handleLogout }) {
  const navLinks = user?.type === 'retailer' 
    ? [
        { path: '/retailer/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
        { path: '/retailer/sales', label: 'Registrar Venda', icon: 'bi-cart-plus-fill' },
        { path: '/retailer/stock', label: 'Estoque', icon: 'bi-box-seam-fill' },
        // 'Programas' foi renomeado
        { path: '/retailer/darvin-conecta', label: 'Darvin Conecta', icon: 'bi-plugin-fill' },
      ]
    : [
        { path: '/industry/dashboard', label: 'Dashboard', icon: 'bi-bar-chart-line-fill' },
        // 'Oportunidades' foi removido
        // 'Investimentos' foi renomeado
        { path: '/industry/darvin-conecta', label: 'Darvin Conecta', icon: 'bi-plugin-fill' },
      ];

  return (
    <div className="sidebar d-flex flex-column vh-100 p-3 text-white bg-dark">
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">DARVIN</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {navLinks.map((link) => (
          <li className="nav-item" key={link.path}>
            <NavLink to={link.path} className="nav-link text-white">
              <i className={`bi ${link.icon} me-2`}></i>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <strong>{user?.name || 'Usuário'}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li><button className="dropdown-item" onClick={handleLogout}>Sair</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;