// src/data/mockData.js

// --- USUÁRIOS ---
export const allIndustries = [
  { id: 'ind-01', name: 'Indústria de Bebidas H2O+', type: 'industry' },
  { id: 'ind-02', name: 'Global Snacks & Co.', type: 'industry' },
  { id: 'ind-03', name: 'Laticínios Via Láctea', type: 'industry' },
];

export const allRetailers = [
  { id: 'ret-01', name: 'Mercadinho do Bairro', type: 'retailer', dataRating: 85 },
  { id: 'ret-02', name: 'Supermercado Central', type: 'retailer', dataRating: 92 },
  { id: 'ret-03', name: 'Conveniência 24h', type: 'retailer', dataRating: 71 },
];

// --- PRODUTOS ---
export const products = [
  // Indústria H2O+ (Bebidas)
  { id: 'prod-001', sku: 'H2O-500ML-LIMAO', name: 'Água Saborizada Limão 500ml', industryId: 'ind-01', category: 'Bebidas', costPrice: 1.50, sellingPrice: 3.00, stock: 120, avgSalesPerDay: 8, image: 'https://via.placeholder.com/150/92c952' },
  { id: 'prod-002', sku: 'H2O-500ML-UVA', name: 'Água Saborizada Uva 500ml', industryId: 'ind-01', category: 'Bebidas', costPrice: 1.50, sellingPrice: 3.00, stock: 85, avgSalesPerDay: 5, image: 'https://via.placeholder.com/150/771796' },
  { id: 'prod-003', sku: 'H2O-1L-TANGERINA', name: 'Água Saborizada Tangerina 1L', industryId: 'ind-01', category: 'Bebidas', costPrice: 2.20, sellingPrice: 4.50, stock: 60, avgSalesPerDay: 3, image: 'https://via.placeholder.com/150/f66b97' },
  // Global Snacks & Co. (Salgadinhos e Doces)
  { id: 'prod-004', sku: 'GSC-BATATA-OND-50G', name: 'Batata Ondulada Original 50g', industryId: 'ind-02', category: 'Salgadinhos', costPrice: 2.00, sellingPrice: 4.00, stock: 150, avgSalesPerDay: 10, image: 'https://via.placeholder.com/150/56a8c2' },
  { id: 'prod-005', sku: 'GSC-AMEND-JAP-100G', name: 'Amendoim Japonês 100g', industryId: 'ind-02', category: 'Salgadinhos', costPrice: 1.80, sellingPrice: 3.50, stock: 110, avgSalesPerDay: 7, image: 'https://via.placeholder.com/150/d32776' },
  { id: 'prod-006', sku: 'GSC-CHOC-BAR-40G', name: 'Barra de Chocolate ao Leite 40g', industryId: 'ind-02', category: 'Doces', costPrice: 2.50, sellingPrice: 5.00, stock: 75, avgSalesPerDay: 5, image: 'https://via.placeholder.com/150/24f355' },
  // Laticínios Via Láctea (Laticínios)
  { id: 'prod-007', sku: 'LVL-IOG-MOR-150G', name: 'Iogurte de Morango 150g', industryId: 'ind-03', category: 'Laticínios', costPrice: 1.20, sellingPrice: 2.50, stock: 200, avgSalesPerDay: 15, image: 'https://via.placeholder.com/150/e91e63' },
  { id: 'prod-008', sku: 'LVL-REQ-CREM-200G', name: 'Requeijão Cremoso 200g', industryId: 'ind-03', category: 'Laticínios', costPrice: 3.00, sellingPrice: 5.50, stock: 95, avgSalesPerDay: 6, image: 'https://via.placeholder.com/150/ffeb3b' },
  { id: 'prod-009', sku: 'LVL-LEITE-INT-1L', name: 'Leite Integral UHT 1L', industryId: 'ind-03', category: 'Laticínios', costPrice: 2.80, sellingPrice: 4.20, stock: 300, avgSalesPerDay: 25, image: 'https://via.placeholder.com/150/ffffff' },
];

// --- VENDAS INICIAIS ---
export const sales = [
  // Vendas do Mercadinho do Bairro
  { id: 'sale-001', retailerId: 'ret-01', totalAmount: 7.50, items: [{ productId: 'prod-001', quantity: 1, unitPrice: 3.00 }, { productId: 'prod-003', quantity: 1, unitPrice: 4.50 }] },
  { id: 'sale-002', retailerId: 'ret-01', totalAmount: 12.00, items: [{ productId: 'prod-004', quantity: 3, unitPrice: 4.00 }] },
  // Vendas do Supermercado Central
  { id: 'sale-003', retailerId: 'ret-02', totalAmount: 21.00, items: [{ productId: 'prod-009', quantity: 5, unitPrice: 4.20 }] },
  { id: 'sale-004', retailerId: 'ret-02', totalAmount: 18.00, items: [{ productId: 'prod-007', quantity: 4, unitPrice: 2.50 }, { productId: 'prod-006', quantity: 2, unitPrice: 4.00 }] },
  // Vendas da Conveniência 24h
  { id: 'sale-005', retailerId: 'ret-03', totalAmount: 9.00, items: [{ productId: 'prod-002', quantity: 3, unitPrice: 3.00 }] },
];

// --- CAMPANHAS ---
export const campaigns = [
  { id: 'camp-01', industryId: 'ind-01', title: 'Acelera Vendas H2O+ Limão', description: 'Venda 50 unidades de Água Saborizada Limão e ganhe R$25.', productId: 'prod-001', targetQuantity: 50, bonus: 25.00, },
  { id: 'camp-02', industryId: 'ind-02', title: 'Explosão de Sabor: Batata Ondulada', description: 'Venda 100 unidades de Batata Ondulada e ganhe R$40.', productId: 'prod-004', targetQuantity: 100, bonus: 40.00, },
  { id: 'camp-03', industryId: 'ind-03', title: 'Meta Láctea: Iogurte', description: 'Venda 200 Iogurtes de Morango e ganhe R$75.', productId: 'prod-007', targetQuantity: 200, bonus: 75.00, },
];