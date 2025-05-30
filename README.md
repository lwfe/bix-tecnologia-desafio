# Bix Tecnologia Desafio

Um dashboard financeiro com login, filtros dinâmicos, visualizações de dados e design responsivo.

## Funcionalidades

- Página de login e dashboard protegida
- Sidebar exclusiva para a página da dashboard
- Filtros globais e dinâmicos (data, conta, indústria, estado)
- Cards resumindo receitas, despesas e saldo total
- Gráficos de barras empilhadas e linhas para visualização de transações
- Tabela de transações com paginação
- Persistência de sessão e filtros sem banco de dados (usando cookies)
- Design responsivo e interativo

## Tecnologias Utilizadas

- Next.js 15 (App Router)
- TypeScript
- Styled Components
- Context API para gerenciamento de estado
- Recharts para visualização de dados
- Cookies para persistência de sessão e filtros
- Lucide React para ícones

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/lwfe/bix-tecnologia-desafio
   cd bix-tecnologia-desafio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `/app` - Rotas e páginas da aplicação (Next.js App Router)
- `/components` - Componentes reutilizáveis
- `/contexts` - Contextos para gerenciamento de estado (Auth e Filter)
- `/lib` - Utilitários e configurações
- `/styles` - Estilos globais
- `/types` - Definições de tipos TypeScript
- `/utils` - Funções utilitárias

## Uso

1. Faça login com qualquer email e senha (autenticação simulada para demonstração)
2. Explore o dashboard com os diferentes filtros
3. Visualize os dados nos gráficos e tabelas
4. Os filtros e a sessão são persistidos entre recarregamentos da página

## Observações

- Este projeto utiliza dados mockados para demonstração
- A autenticação é simulada e aceita qualquer email/senha
- Os filtros e a sessão são persistidos usando cookies do navegador
