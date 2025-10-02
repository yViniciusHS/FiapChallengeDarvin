// src/pages/industry/IndustryConectaPage.jsx

import React, { useState } from 'react';
import { useData } from '../../contexts/dataHooks';
import PageHeader from '../../components/common/PageHeader';
import { Button } from 'react-bootstrap';
import CampaignCreationModal from '../../components/industry/CampaignCreationModal';

export default function IndustryConectaPage() {
  const { campaigns } = useData();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [showModal, setShowModal] = useState(false);

  // --- CORREÇÃO AQUI ---
  // Adicionamos a verificação para garantir que o usuário está logado antes de continuar.
  if (!loggedInUser) {
    return <div>Carregando...</div>;
  }

  const industryCampaigns = campaigns.filter(c => c.industryId === loggedInUser.id);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <PageHeader title="Darvin Conecta" subtitle="Crie e gerencie suas campanhas de incentivo." />
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>Lançar Nova Campanha
        </Button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Campanhas Ativas ({industryCampaigns.length})</h5>
        </div>
        <ul className="list-group list-group-flush">
          {industryCampaigns.length > 0 ? (
            industryCampaigns.map(c => (
              <li key={c.id} className="list-group-item">
                <strong>{c.title}</strong>
                <p className="mb-0 text-muted small">{c.description}</p>
              </li>
            ))
          ) : (
            <li className="list-group-item">Nenhuma campanha ativa no momento.</li>
          )}
        </ul>
      </div>

      <CampaignCreationModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
}