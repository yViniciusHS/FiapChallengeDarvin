// src/contexts/DataProvider.jsx

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { products as initialProducts, sales as initialSales, campaigns as initialCampaigns } from '../data/mockData';
import { DataContext } from './dataHooks';

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  // Carregamento inicial de todos os dados
  useEffect(() => {
    let productsData = JSON.parse(localStorage.getItem('products')) || initialProducts;
    let salesData = JSON.parse(localStorage.getItem('sales')) || initialSales;
    let campaignsData = JSON.parse(localStorage.getItem('campaigns')) || initialCampaigns;

    localStorage.setItem('products', JSON.stringify(productsData));
    localStorage.setItem('sales', JSON.stringify(salesData));
    localStorage.setItem('campaigns', JSON.stringify(campaignsData));

    setProducts(productsData);
    setSales(salesData);
    setCampaigns(campaignsData);
  }, []);

  // Função addSale (continua a mesma)
  const addSale = (saleItems) => {
    const newSale = {
      id: uuidv4(),
      date: new Date().toISOString(),
      retailerId: JSON.parse(localStorage.getItem('loggedInUser')).id, // Pega o ID do usuário logado
      totalAmount: saleItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0),
      items: saleItems,
    };
    const updatedSales = [...sales, newSale];
    setSales(updatedSales);
    localStorage.setItem('sales', JSON.stringify(updatedSales));

    const updatedProducts = products.map(p => {
      const itemInSale = saleItems.find(item => item.productId === p.id);
      if (itemInSale) {
        return { ...p, stock: p.stock - itemInSale.quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  // Função addCampaign (continua a mesma)
  const addCampaign = (campaignData) => {
    const newCampaign = {
      id: uuidv4(),
      ...campaignData
    };
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  // --- NOVAS FUNÇÕES ---
  const addProduct = (productData) => {
    const newProduct = {
      id: uuidv4(),
      avgSalesPerDay: 0, // Novo produto começa com média 0
      ...productData,
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (productId, updatedData) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, ...updatedData } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };
  
  // Adiciona as novas funções ao valor do contexto
  const value = { products, sales, campaigns, addSale, addCampaign, addProduct, updateProduct };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}