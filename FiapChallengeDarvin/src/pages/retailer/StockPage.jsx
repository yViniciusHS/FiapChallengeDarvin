// src/pages/retailer/StockPage.jsx

import React, { useState } from 'react';
import { useData } from '../../contexts/dataHooks';
import PageHeader from '../../components/common/PageHeader';
import ProductModal from '../../components/retailer/ProductModal';
import { Button } from 'react-bootstrap';

export default function StockPage() {
  const { products, addProduct, updateProduct } = useData();
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Editando um produto existente
      updateProduct(editingProduct.id, productData);
    } else {
      // Adicionando um novo produto
      addProduct(productData);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <PageHeader title="Gestão de Estoque" subtitle="Adicione, edite e acompanhe seus produtos." />
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <i className="bi bi-plus-circle me-2"></i>Adicionar Produto
        </Button>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover table-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>Produto</th>
                <th>Estoque Atual</th>
                <th>Preço de Venda</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.stock} un.</td>
                  <td>R$ {parseFloat(product.sellingPrice).toFixed(2)}</td>
                  <td>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleOpenModal(product)}>
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal 
        show={showModal}
        handleClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}