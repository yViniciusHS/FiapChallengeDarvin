// src/pages/retailer/SalesPage.jsx

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import './SalesPage.css'; // Importe o novo CSS

export default function SalesPage() {
  return (
    <div>
      <PageHeader title="Registrar Vendas" subtitle="Escolha o método de sua preferência para registrar os dados de sell-out." />

      {/* Nova Navegação em Cards */}
      <div className="row mb-5">
        {/* Card PDV */}
        <div className="col-md-4">
          <NavLink to="/retailer/sales/pdv" className="card-selector">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-grid-3x3-gap-fill fs-1 mb-3"></i>
                <h5 className="card-title">PDV</h5>
                <p className="card-text small text-muted">Use uma interface de caixa visual com cards de produtos.</p>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Card CSV */}
        <div className="col-md-4">
          <NavLink to="/retailer/sales/csv" className="card-selector">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-file-earmark-spreadsheet-fill fs-1 mb-3"></i>
                <h5 className="card-title">Importar Planilha</h5>
                <p className="card-text small text-muted">Faça o upload de um arquivo CSV com múltiplas vendas.</p>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Card Anota Aí */}
        <div className="col-md-4">
          <NavLink to="/retailer/sales/anota-ai" className="card-selector">
            <div className="card text-center h-100">
              <div className="card-body">
                <i className="bi bi-chat-left-text-fill fs-1 mb-3"></i>
                <h5 className="card-title">Anota Aí</h5>
                <p className="card-text small text-muted">Registre vendas rápidas preenchendo uma frase.</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      {/* O Outlet continua aqui, renderizando o componente filho */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}