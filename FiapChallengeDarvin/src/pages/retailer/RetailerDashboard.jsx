// src/pages/retailer/RetailerDashboard.jsx

import React from 'react';
import { useData } from '../../contexts/dataHooks';
import AdvancedKPICard from '../../components/common/AdvancedKPICard';
import PageHeader from '../../components/common/PageHeader';
import SalesTrendChart from '../../components/retailer/SalesTrendChart';
import TopProductsChart from '../../components/retailer/TopProductsChart';
import QuickInsights from '../../components/retailer/QuickInsights';
import RatingBadge from '../../components/retailer/RatingBadge';

function RetailerDashboard() {
  const { sales, products } = useData();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!sales || !products || !loggedInUser) {
    return <div>Carregando dashboard...</div>;
  }
  
  // Filtra as vendas para mostrar apenas dados do varejista logado
  const retailerSales = sales.filter(s => s.retailerId === loggedInUser.id);

  // --- LÓGICA DE CÁLCULO DO RATING ---
  const calculateRating = () => {
    let recencyScore = 0;
    let volumeScore = 0;
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const salesLastMonth = retailerSales.filter(s => new Date(s.date) > oneMonthAgo);
    const lastSaleDate = retailerSales.length > 0 ? new Date(Math.max(...retailerSales.map(s => new Date(s.date)))) : null;

    if (salesLastMonth.length > 50) volumeScore = 5;
    else if (salesLastMonth.length > 30) volumeScore = 4;
    else if (salesLastMonth.length > 10) volumeScore = 3;
    else if (salesLastMonth.length > 0) volumeScore = 2;

    if (lastSaleDate) {
      const diffDays = (now - lastSaleDate) / (1000 * 60 * 60 * 24);
      if (diffDays <= 1) recencyScore = 5;
      else if (diffDays <= 3) recencyScore = 4;
      else if (diffDays <= 7) recencyScore = 3;
      else if (diffDays <= 15) recencyScore = 2;
    }
    
    const totalScore = recencyScore + volumeScore;

    if (totalScore >= 9) return 'A';
    if (totalScore >= 7) return 'B';
    if (totalScore >= 5) return 'C';
    if (totalScore >= 3) return 'D';
    return 'E';
  };

  const userRating = calculateRating();
  
  // --- CÁLCULOS (usando apenas as vendas do varejista) ---
  const totalRevenue = retailerSales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalSalesCount = retailerSales.length;
  const averageTicket = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  const totalUnitsSold = retailerSales.reduce((total, sale) => total + sale.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0);
  
  const salesByDay = retailerSales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString('pt-BR');
    if (!acc[date]) { acc[date] = 0; }
    acc[date] += sale.totalAmount;
    return acc;
  }, {});
  const trendData = Object.keys(salesByDay).map(date => ({ date, revenue: salesByDay[date] }));

  const revenueByProduct = products.map(product => {
    const productRevenue = retailerSales.reduce((sum, sale) => {
      const item = sale.items.find(i => i.productId === product.id);
      return sum + (item ? item.quantity * item.unitPrice : 0);
    }, 0);
    return { name: product.name, revenue: productRevenue };
  });
  const topProductsData = revenueByProduct.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  
  const bestSeller = topProductsData.length > 0 ? topProductsData[0] : null;
  const lowStockProduct = products.sort((a, b) => a.stock - b.stock)[0];

  return (
    <div>
      <PageHeader title={`Dashboard: ${loggedInUser.name}`} subtitle={<RatingBadge rating={userRating} />} />
      
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Faturamento Total" value={`R$ ${totalRevenue.toFixed(2)}`} icon="bi-cash-coin" trendValue="+5.2% (simulado)" trendDirection="up" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Ticket Médio" value={`R$ ${averageTicket.toFixed(2)}`} icon="bi-receipt-cutoff" trendValue="-1.1% (simulado)" trendDirection="down" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Vendas Realizadas" value={totalSalesCount} icon="bi-cart-check" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Unidades Vendidas" value={totalUnitsSold} icon="bi-box-seam" /></div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8 mb-4"><SalesTrendChart data={trendData} /></div>
        <div className="col-lg-4 mb-4"><QuickInsights bestSeller={bestSeller} lowStockProduct={lowStockProduct} /></div>
      </div>

      <div className="row"><div className="col-lg-12"><TopProductsChart data={topProductsData} /></div></div>
    </div>
  );
}

export default RetailerDashboard;