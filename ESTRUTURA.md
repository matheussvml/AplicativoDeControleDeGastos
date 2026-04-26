# 📂 Estrutura de Arquivos Criados

## Arquivos de Configuração

- `package.json` - Dependências e scripts do projeto
- `vite.config.js` - Configuração do Vite
- `index.html` - HTML principal
- `.gitignore` - Arquivos ignorados pelo git

## Pasta src/

### Arquivo Principal

- `main.jsx` - Entrada da aplicação React
- `App.jsx` - Componente principal com lógica geral
- `index.css` - Estilos CSS puro (mobile-first, sem Tailwind)

### Pasta src/components/

Componentes React reutilizáveis:

1. **CardSummary.jsx** (175 linhas)
   - Exibe resumo de cada cartão
   - Mostra gasto, limite e progresso
   - Alertas visuais para 80% e 100%
   - Botão para editar cartão

2. **ExpenseForm.jsx** (120 linhas)
   - Formulário modal para adicionar gastos
   - Campos: cartão, descrição, valor, categoria, data, parcelas, observação
   - Validação de campos obrigatórios
   - Suporte até 24 parcelas

3. **ExpenseList.jsx** (150 linhas)
   - Lista todos os gastos do mês
   - Mostra parcela atual (1/3, 2/3, etc)
   - Modal de confirmação para deletar
   - Opção de deletar parcela ou tudo
   - Filtros dinâmicos aplicados

4. **MonthSelector.jsx** (80 linhas)
   - Navegação entre meses e anos
   - Botão "Hoje" para retornar ao mês atual
   - Display do mês selecionado

5. **Stats.jsx** (130 linhas)
   - Estatísticas por categoria
   - Total por cartão
   - Gráfico simples em cards
   - Top 5 categorias

6. **CardSettings.jsx** (100 linhas)
   - Modal para configurar cartões
   - Editar nome de cada cartão
   - Editar limite de cada cartão
   - Display de limite formatado

### Pasta src/utils/

1. **storage.js** (40 linhas)
   - Função getStorageData() - Recupera dados do localStorage
   - Função saveStorageData() - Salva dados no localStorage
   - Função initializeStorage() - Inicializa dados padrão
   - Dados padrão com 2 cartões de R$ 1000

2. **calculations.js** (180 linhas)
   - getMonthKey() - Gera chave de período (YYYY-MM)
   - getCurrentMonthKey() - Pega mês atual
   - formatMoney() - Formata para BRL
   - formatDate() - Formata data em pt-BR
   - getMonthName() - Nome do mês formatado
   - getExpensesForMonth() - Filtra gastos por mês
   - generateInstalments() - Gera parcelas com mês de cada uma
   - calculateTotalForCard() - Total gasto por cartão
   - calculateTotalByCategory() - Total por categoria
   - calculateTotalByCardAndCategory() - Total combinado
   - getUsagePercentage() - Calcula % de uso do limite
   - getUsageStatus() - Retorna 'normal', 'warning' ou 'danger'

## Documentação

- `README.md` - Guia completo de uso e funcionalidades

## Pasta node_modules/

Dependências instaladas via npm install

## Pasta dist/

Build otimizado para produção (gerado com npm run build)

---

## 📊 Resumo de Funcionalidades Implementadas

✅ Dashboard com resumo dos 2 cartões
✅ Cadastro e edição de gastos com 8 categorias
✅ Suporte a até 24 parcelas com distribuição por mês
✅ Lista de gastos com parcela atual (1/3, 2/3, etc)
✅ Filtros por cartão, categoria e busca por descrição
✅ Seletor de mês com navegação anterior/próximo
✅ Estatísticas por categoria e por cartão
✅ Barras de progresso com alertas visuais (80% e 100%)
✅ Configuração de nome e limite de cada cartão
✅ Exclusão com confirmação e opção de deletar uma ou todas parcelas
✅ Persistência em localStorage
✅ Design mobile-first responsivo
✅ Cores diferentes para cada cartão
✅ CSS puro, sem frameworks

## 🚀 Como Usar

1. Instalar: `npm install`
2. Desenvolver: `npm run dev`
3. Buildar: `npm run build`
4. Preview: `npm run preview`

O app estará em http://localhost:5173/
