// src/pages/retailer/subpages/CSVImportPage.jsx

import React, { useState } from 'react';
import { useData } from '../../../contexts/dataHooks'; // CORREÇÃO
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

export default function CSVImportPage() {
  const { products, addSale } = useData(); // CORREÇÃO
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setStatus('');
    setFile(e.target.files[0]);
  };

  const processCSV = () => {
    if (!file) {
      setStatus('Erro: Nenhum arquivo selecionado.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const salesFromCSV = results.data.map(row => {
            const product = products.find(p => p.sku === row.SKU);
            if (!product) throw new Error(`SKU não encontrado: ${row.SKU}`);
            
            return {
              productId: product.id,
              name: product.name,
              quantity: parseInt(row.Quantidade),
              unitPrice: parseFloat(row['Preço Unitário']),
            };
          });

          addSale(salesFromCSV);
          setStatus(`${salesFromCSV.length} itens de venda importados com sucesso!`);
          setTimeout(() => navigate('/retailer/dashboard'), 2000);
        } catch (error) {
          setStatus(`Erro no processamento: ${error.message}`);
        }
      },
      error: (error) => {
        setStatus(`Erro na leitura do arquivo: ${error.message}`);
      }
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Importar Vendas de Planilha (CSV)</h5>
        <p>O arquivo deve conter as colunas: <strong>SKU</strong>, <strong>Quantidade</strong>, <strong>Preço Unitário</strong>.</p>
        <div className="mb-3">
          <label htmlFor="csvFile" className="form-label">Selecione o arquivo CSV</label>
          <input className="form-control" type="file" id="csvFile" accept=".csv" onChange={handleFileChange} />
        </div>
        <button className="btn btn-primary" onClick={processCSV} disabled={!file}>Processar Arquivo</button>
        {status && <div className="alert alert-info mt-3">{status}</div>}
      </div>
    </div>
  );
}