// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// Páginas Principais
import Login from './pages/auth/Login';
import MainLayout from './components/common/MainLayout';
import NotFound from './pages/NotFound';

// Páginas do Varejista
import RetailerDashboard from './pages/retailer/RetailerDashboard';
import SalesPage from './pages/retailer/SalesPage';
import StockPage from './pages/retailer/StockPage';
import RetailerConectaPage from './pages/retailer/RetailerConectaPage'; // Nome atualizado

// Subpáginas de Vendas do Varejista
import PDVPage from './pages/retailer/subpages/PDVPage';
import CSVImportPage from './pages/retailer/subpages/CSVImportPage';
import AnotaAiPage from './pages/retailer/subpages/AnotaAiPage';

// Páginas da Indústria
import IndustryDashboard from './pages/industry/IndustryDashboard';
import IndustryConectaPage from './pages/industry/IndustryConectaPage'; // Nome atualizado

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<MainLayout />}>
        {/* Rotas do Varejista */}
        <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
        <Route path="/retailer/sales" element={<SalesPage />}>
          <Route index element={<PDVPage />} />
          <Route path="pdv" element={<PDVPage />} />
          <Route path="csv" element={<CSVImportPage />} />
          <Route path="anota-ai" element={<AnotaAiPage />} />
        </Route>
        <Route path="/retailer/stock" element={<StockPage />} />
        <Route path="/retailer/darvin-conecta" element={<RetailerConectaPage />} />

        {/* Rotas da Indústria */}
        <Route path="/industry/dashboard" element={<IndustryDashboard />} />
        <Route path="/industry/darvin-conecta" element={<IndustryConectaPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;