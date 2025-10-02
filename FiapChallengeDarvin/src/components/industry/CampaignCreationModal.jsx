// src/components/industry/CampaignCreationModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import { useData } from '../../contexts/dataHooks';

export default function CampaignCreationModal({ show, handleClose }) {
  // 1. TODOS OS HOOKS SÃO CHAMADOS PRIMEIRO
  const { products, addCampaign } = useData();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({});

  // 2. A VERIFICAÇÃO DE SEGURANÇA VEM DEPOIS
  if (!loggedInUser) {
    return null; 
  }

  // O useEffect também é um hook e deve ser chamado no nível superior
  useEffect(() => {
    if (show) {
      setStep(1);
      setCampaignData({
        industryId: loggedInUser.id,
        title: '',
        productId: products.find(p => p.industryId === loggedInUser.id)?.id || '',
        targetQuantity: 50,
        bonus: 25,
      });
    }
  }, [show, loggedInUser.id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
  };

  const handleLaunch = () => {
    if (!campaignData.title.trim()) {
      alert("Por favor, dê um nome para a campanha.");
      setStep(1);
      return;
    }
    const product = products.find(p => p.id === campaignData.productId);
    if (!product) {
      alert("Produto inválido selecionado.");
      setStep(2);
      return;
    }
    const description = `Venda ${campaignData.targetQuantity} unidades de ${product.name} e ganhe R$${parseFloat(campaignData.bonus).toFixed(2)}.`;
    addCampaign({ ...campaignData, description });
    alert('Campanha lançada com sucesso!');
    handleClose();
  };

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Lançar Nova Campanha</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar now={progress} label={`${step}/${totalSteps}`} className="mb-4" />

        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Qual o nome da sua campanha?</Form.Label>
            <Form.Control type="text" name="title" placeholder="Ex: Acelera Vendas Verão" value={campaignData.title || ''} onChange={handleChange} required />
          </Form.Group>
        )}

        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Qual produto será o alvo?</Form.Label>
            <Form.Select name="productId" value={campaignData.productId || ''} onChange={handleChange}>
              {products.filter(p => p.industryId === loggedInUser.id).map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </Form.Select>
            <Form.Label className="mt-3">Qual a meta de vendas (unidades)?</Form.Label>
            <Form.Control type="number" name="targetQuantity" value={campaignData.targetQuantity || 50} onChange={handleChange} />
          </Form.Group>
        )}

        {step === 3 && (
          <Form.Group className="mb-3">
            <Form.Label>Qual será o bônus em R$ para o varejista que atingir a meta?</Form.Label>
            <Form.Control type="number" name="bonus" value={campaignData.bonus || 25} onChange={handleChange} />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Voltar</Button>}
        {step < totalSteps && <Button variant="primary" onClick={() => setStep(step + 1)}>Avançar</Button>}
        {step === totalSteps && <Button variant="success" onClick={handleLaunch}>Lançar Campanha</Button>}
      </Modal.Footer>
    </Modal>
  );
}