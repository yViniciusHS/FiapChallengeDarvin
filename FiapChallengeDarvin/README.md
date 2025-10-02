# 🎯 DARVIN - MVP para o FIAP Challenge 2025

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

## 📄 Sobre o Projeto

O **DARVIN** é uma plataforma de inteligência de sell-out projetada para conectar a indústria e o pequeno varejo. A aplicação foi desenvolvida como um protótipo funcional (MVP) para o **FIAP Challenge 2025**, em parceria com a empresa **Astéria**.

A solução visa democratizar o acesso a dados de vendas, fornecendo ferramentas de BI para a indústria e funcionalidades de gestão para o varejista, criando um ecossistema de crescimento mútuo e resolvendo a lacuna de informações de sell-out no mercado.

## ✨ Funcionalidades Implementadas

O MVP está dividido em duas experiências de usuário distintas e conectadas:

### Para o Varejista 🛍️

* **Dashboard Dinâmico:** Visualização de KPIs (Faturamento, Ticket Médio), gráficos de tendência de vendas, ranking de produtos mais vendidos e um sistema de **Rating** que avalia a qualidade dos dados fornecidos.
* **Registro de Vendas Multi-método:**
    * **PDV Visual:** Interface de ponto de venda com cards de produtos e busca em tempo real.
    * **Importação de Planilha:** Ferramenta para upload de arquivos `.csv` para registro de vendas em lote.
    * **Anota Aí:** Um formulário estruturado para registro rápido de vendas individuais.
* **Gestão de Estoque:** Tabela de visualização de estoque com funcionalidades de **Adicionar** e **Editar** produtos através de um formulário em modal.
* **Darvin Conecta:** Painel para visualizar e acompanhar o progresso em campanhas de incentivo criadas pelas indústrias.

### Para a Indústria 🏭

* **Dashboard Agregado:** Visão consolidada do sell-out, com KPIs de faturamento, unidades vendidas e performance por varejista.
* **Performance por Varejista:** Tabela interativa que, ao clique, abre um modal com detalhes e oportunidades específicas para cada parceiro de varejo.
* **Darvin Conecta (Central de Investimentos):** Interface para criar e gerenciar campanhas de incentivo através de um "wizard" em etapas.
* **Radar de Oportunidades:** Componente que gera insights automáticos sobre expansão de mix de produtos e alertas de estoque.

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React (v18) com Vite
* **Estilização:** Bootstrap & React-Bootstrap
* **Ícones:** Bootstrap Icons
* **Gráficos:** Recharts
* **Roteamento:** React Router
* **Estado Global:** React Context API
* **Utilitários:** Papaparse (para CSV), UUID (para IDs únicos)

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd FiapChallengeDarvin
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).