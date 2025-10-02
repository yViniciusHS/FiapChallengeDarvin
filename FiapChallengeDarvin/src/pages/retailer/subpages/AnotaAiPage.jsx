// src/pages/retailer/subpages/AnotaAiPage.jsx

import React, { useState, useEffect } from 'react';
import { useData } from '../../../contexts/dataHooks';
import { useNavigate } from 'react-router-dom';

export default function AnotaAiPage() {
  const { products, addSale } = useData();
  const navigate = useNavigate();

  // Novos estados para o formulário estruturado
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(products.length > 0 ? products[0].id : '');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  // Efeito para auto-preencher o preço quando um produto é selecionado
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct);
      setPrice(product ? product.sellingPrice.toFixed(2) : '');
    }
  }, [selectedProduct, products]);

  // Nova lógica de registro, sem Regex
  const handleRegisterSale = (e) => {
    e.preventDefault();
    setMessage('');

    const product = products.find(p => p.id === selectedProduct);
    if (!product) {
      setMessage('Erro: Produto não encontrado.');
      return;
    }

    if (product.stock < quantity) {
      setMessage(`Estoque insuficiente! Apenas ${product.stock} unidades disponíveis.`);
      return;
    }

    const saleItem = [{
      productId: product.id,
      name: product.name,
      quantity: parseInt(quantity),
      unitPrice: parseFloat(price),
    }];

    addSale(saleItem);
    setMessage(`Venda de ${quantity}x ${product.name} registrada com sucesso!`);

    // Limpa os campos após o sucesso
    setQuantity(1);
    setPrice(product.sellingPrice.toFixed(2));

    // Redireciona para o dashboard após um breve delay
    setTimeout(() => navigate('/retailer/dashboard'), 2000);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Anota Aí - Registro Rápido</h5>
        <p className="card-text text-muted">Preencha os campos para registrar uma venda simples rapidamente.</p>
        
        <form onSubmit={handleRegisterSale}>
          <div className="input-group input-group-lg align-items-center">
            <span className="input-group-text">Vendi</span>
            <input 
              type="number" 
              className="form-control" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
              style={{ flex: '0 1 100px' }}
            />
            <select 
              className="form-select"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <span className="input-group-text">por R$</span>
            <input 
              type="number"
              step="0.01"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={{ flex: '0 1 120px' }}
            />
            <button className="btn btn-primary" type="submit">Registrar</button>
          </div>
        </form>
        
        {message && <div className="alert alert-success mt-3">{message}</div>}
      </div>
    </div>
  );
}