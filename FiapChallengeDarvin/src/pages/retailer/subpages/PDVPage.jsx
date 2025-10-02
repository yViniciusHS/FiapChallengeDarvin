// src/pages/retailer/subpages/PDVPage.jsx

import React, { useState } from 'react';
import { useData } from '../../../contexts/dataHooks';
import { useNavigate } from 'react-router-dom';

export default function PDVPage() {
  const { products, addSale } = useData();
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Função que retorna um ícone com base na categoria do produto
  const getIconForCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'bebidas':
        return 'bi-cup-straw';
      case 'salgadinhos':
        return 'bi-box-seam';
      case 'doces':
        return 'bi-gift';
      case 'laticínios':
        return 'bi-egg-fried';
      case 'biscoitos':
        return 'bi-record-circle';
      default:
        return 'bi-archive'; // Ícone padrão
    }
  };

  const handleProductClick = (product) => {
    if (product.stock <= 0) {
      alert('Produto sem estoque!');
      return;
    }

    const existingItem = cart.find(item => item.productId === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newItem = { productId: product.id, name: product.name, quantity: 1, unitPrice: product.sellingPrice };
      setCart([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (productId, amount) => {
    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean);
    setCart(updatedCart);
  };
  
  const handleFinalizeSale = () => {
    if (cart.length === 0) return;
    addSale(cart);
    alert('Venda registrada com sucesso!');
    navigate('/retailer/dashboard');
  };

  const cartTotal = cart.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="row">
      {/* Coluna de Produtos */}
      <div className="col-md-7">
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar produto por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {filteredProducts.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100" onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                
                {/* 2. A tag <img> foi substituída por este bloco com o ícone */}
                <div className="card-img-top d-flex justify-content-center align-items-center bg-light" style={{ height: '120px' }}>
                  <i className={`bi ${getIconForCategory(product.category)} display-4 text-muted`}></i>
                </div>
                
                <div className="card-body">
                  <h6 className="card-title small">{product.name}</h6>
                  <p className="card-text fw-bold">R$ {product.sellingPrice.toFixed(2)}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Estoque: {product.stock}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna do Carrinho */}
      <div className="col-md-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Carrinho</h5>
            {cart.length === 0 ? (
              <p className="text-muted">Selecione produtos para adicionar ao carrinho.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {cart.map(item => (
                  <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div className='small'>{item.name}</div>
                      <small className="text-muted">R$ {item.unitPrice.toFixed(2)}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleUpdateQuantity(item.productId, -1)}>-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleUpdateQuantity(item.productId, 1)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Total:</h5>
              <h5 className="mb-0">R$ {cartTotal.toFixed(2)}</h5>
            </div>
            <button className="btn btn-success w-100 mt-3" onClick={handleFinalizeSale} disabled={cart.length === 0}>
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}