// src/pages/industry/IndustryDashboard.jsx

import React, { useState } from 'react';
import { useData } from '../../contexts/dataHooks';
import { allRetailers } from '../../data/mockData';
import AdvancedKPICard from '../../components/common/AdvancedKPICard';
import PageHeader from '../../components/common/PageHeader';
import RetailerPerformanceTable from '../../components/industry/RetailerPerformanceTable';
import ProductComparisonChart from '../../components/industry/ProductComparisonChart';
import OpportunityRadar from '../../components/industry/OpportunityRadar';
import RetailerDetailModal from '../../components/industry/RetailerDetailModal';

export default function IndustryDashboard() {
  const { sales, products } = useData();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  
  const [selectedRetailer, setSelectedRetailer] = useState(null);

  if (!sales || !products || !loggedInUser) {
    return <div>Carregando dados...</div>;
  }

  // (Toda a lógica de cálculo de dados continua a mesma)
  const industryProducts = products.filter(p => p.industryId === loggedInUser.id);
  const industryProductIds = new Set(industryProducts.map(p => p.id));
  const industrySales = sales.filter(sale => sale.items.some(item => industryProductIds.has(item.productId)));
  const totalSellOutRevenue = industrySales.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalUnitsSold = industrySales.reduce((total, sale) => total + sale.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0);
  const distinctSkusSold = new Set(industrySales.flatMap(sale => sale.items.map(item => item.productId))).size;
  const retailerPerformanceData = allRetailers.map(retailer => {
    const retailerSales = industrySales.filter(s => s.retailerId === retailer.id);
    const revenue = retailerSales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    const unitsSold = retailerSales.reduce((total, sale) => total + sale.items.reduce((itemTotal, item) => itemTotal + item.quantity, 0), 0);
    return { id: retailer.id, name: retailer.name, revenue, unitsSold, dataRating: retailer.dataRating, };
  });
  const productComparisonData = industryProducts.map(product => {
      const unitsSold = industrySales.reduce((sum, sale) => {
        const item = sale.items.find(i => i.productId === product.id);
        return sum + (item ? item.quantity : 0);
      }, 0);
      return { name: product.name.split(" ").slice(0, 2).join(" "), stock: product.stock, unitsSold, };
    });
  const opportunityInsights = [
    { type: 'alert', text: `Estoque baixo para "Requeijão Cremoso" no Supermercado Central.` },
    { type: 'mix', text: `Oportunidade de Mix: "Conveniência 24h" ainda não vende produtos da categoria Laticínios.` },
    { type: 'growth', text: `Produto em destaque: O volume de vendas de Bebidas cresceu 20% este mês.` }
  ];

  return (
    <div>
      <PageHeader title={`Dashboard de Sell-Out: ${loggedInUser.name}`} subtitle="Análise de performance nos canais de varejo" />
      
      {/* SEÇÃO DE KPIs RESTAURADA */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Faturamento Total (Sell-Out)" value={`R$ ${totalSellOutRevenue.toFixed(2)}`} icon="bi-graph-up" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Unidades Vendidas" value={totalUnitsSold.toLocaleString('pt-BR')} icon="bi-box-seam" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="SKUs com Venda" value={distinctSkusSold} icon="bi-tags-fill" /></div>
        <div className="col-lg-3 col-md-6 mb-4"><AdvancedKPICard title="Varejistas Ativos" value={allRetailers.length} icon="bi-shop" /></div>
      </div>
      
      {/* Tabela Interativa */}
      <div className="row mb-4">
        <div className="col-lg-12">
          <RetailerPerformanceTable data={retailerPerformanceData} onRowClick={setSelectedRetailer} />
        </div>
      </div>

      {/* SEÇÃO DE GRÁFICOS E RADAR RESTAURADA */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <ProductComparisonChart data={productComparisonData} />
        </div>
        <div className="col-lg-4 mb-4">
          <OpportunityRadar insights={opportunityInsights} />
        </div>
      </div>

      {/* Modal que abre ao clicar */}
      <RetailerDetailModal 
        retailer={selectedRetailer}
        handleClose={() => setSelectedRetailer(null)}
      />
    </div>
  );
}