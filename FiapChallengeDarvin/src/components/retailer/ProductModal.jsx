// src/components/retailer/ProductModal.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductModal({ show, handleClose, product, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({ name: '', sku: '', category: '', costPrice: 0, sellingPrice: 0, stock: 0, industryId: '' });
    }
  }, [product, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SKU</Form.Label>
            <Form.Control type="text" name="sku" value={formData.sku || ''} onChange={handleChange} />
          </Form.Group> {/* <-- TAG CORRIGIDA AQUI */}
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control type="text" name="category" value={formData.category || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço de Custo</Form.Label>
            <Form.Control type="number" name="costPrice" value={formData.costPrice || 0} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Preço de Venda</Form.Label>
            <Form.Control type="number" name="sellingPrice" value={formData.sellingPrice || 0} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estoque Inicial</Form.Label>
            <Form.Control type="number" name="stock" value={formData.stock || 0} onChange={handleChange} disabled={!!product} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Salvar Alterações</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;