// src/components/common/MainLayout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Este useEffect executa quando o layout é montado
  useEffect(() => {
    // Busca os dados do usuário no localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
      // Se não houver usuário logado, redireciona para a página de login
      navigate('/');
    } else {
      setUser(loggedInUser);
    }
  }, [navigate]); // O navigate é uma dependência do useEffect

  const handleLogout = () => {
    // Limpa o localStorage e redireciona para o login
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  // Enquanto verifica o usuário, podemos mostrar um loading (opcional)
  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Coluna da Sidebar - ocupa 2 de 12 colunas em telas médias ou maiores */}
        <div className="col-md-2 bg-dark p-0">
          <Sidebar user={user} handleLogout={handleLogout} />
        </div>
        
        {/* Coluna do Conteúdo Principal - ocupa 10 de 12 colunas */}
        <main className="col-md-10 p-4">
          {/* O Outlet é o lugar onde o React Router irá renderizar a página da rota filha */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;