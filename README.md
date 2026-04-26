# 💰 Controle de Gastos - Cartão de Crédito

Um aplicativo React mobile-first para controlar gastos em cartão de crédito com suporte a parcelamento e categorização.

## 🚀 Como Começar

### Pré-requisitos

- Node.js 14 ou superior
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm build

# Preview da build
npm run preview
```

O app estará disponível em `http://localhost:5173/`

## 📋 Funcionalidades

### ✅ Principais

- **Dashboard**: Visualize o total gasto por cartão com barras de progresso
- **Cadastro de Gastos**: Adicione despesas com categoria, data e valor
- **Parcelamento**: Suporte até 24 parcelas com distribuição por mês
- **Filtros**: Filtrar por cartão, categoria e busca por descrição
- **Estatísticas**: Visualize gastos por categoria e por cartão
- **Seletor de Mês**: Navegue entre meses para ver histórico

### 🎨 Design

- Mobile-first responsivo
- Cards com cores diferentes para cada cartão
- Alertas visuais (80% e 100% do limite)
- Barras de progresso animadas
- Interface limpa e intuitiva

### 💾 Persistência

- Todos os dados salvos em localStorage
- Dados permanecem após recarregar a página

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── CardSummary.jsx      # Resumo do cartão
│   ├── ExpenseForm.jsx      # Formulário para adicionar gasto
│   ├── ExpenseList.jsx      # Lista de gastos com filtros
│   ├── MonthSelector.jsx    # Seletor de mês/ano
│   ├── Stats.jsx            # Estatísticas e gráficos
│   └── CardSettings.jsx     # Configurações dos cartões
├── utils/
│   ├── storage.js           # Funções de localStorage
│   └── calculations.js      # Cálculos de gastos e períodos
├── App.jsx                  # Componente principal
├── main.jsx                 # Entrada da aplicação
└── index.css                # Estilos CSS puro
```

## 🎮 Como Usar

### 1. Configurar Cartões

Clique no botão ⚙️ para:

- Editar o nome de cada cartão
- Definir limite de cada cartão
- As informações são salvas automaticamente

### 2. Adicionar Gastos

Clique no botão + para:

- Selecionar o cartão usado
- Descrever o gasto
- Informar o valor
- Escolher a categoria
- Selecionar a data
- Definir quantidade de parcelas (se parcelado)
- Adicionar observação (opcional)

### 3. Visualizar Gastos

- **Dashboard**: Resumo de cada cartão
- **Aba Gastos**: Lista completa com filtros
- **Aba Estatísticas**: Gastos por categoria

### 4. Gerenciar Gastos

- Filtrar por cartão, categoria ou descrição
- Deletar gastos (com confirmação para parcelados)
- Navegar entre meses

## 🔐 Segurança & Armazenamento

- **Sem Backend**: Dados armazenados apenas no localStorage do navegador
- **Sem Autenticação**: App local, dados privados do usuário
- **Sem API Externa**: Funciona completamente offline

## 💡 Funcionalidades Especiais

### Parcelamento

- Selecione quantas parcelas o gasto terá (até 24)
- O app divide automaticamente o valor entre os meses
- Na lista de gastos, aparece "Parcela X/Total"
- Ao deletar, escolha entre deletar apenas uma parcela ou todas

### Alertas Visuais

- 🟡 Amarelo: Atingiu 80% do limite
- 🔴 Vermelho: Passou do limite

### Filtros Inteligentes

- Filtre por um ou mais cartões
- Selecione categorias específicas
- Busque por descrição do gasto
- Os filtros combinam entre si

## 📱 Compatibilidade

- ✅ Celular (qualquer tamanho)
- ✅ Tablet
- ✅ Desktop
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🛠️ Categorias Disponíveis

- Alimentação
- Transporte
- Lazer
- Assinaturas
- Compras
- Saúde
- Educação
- Outros

## 📊 Exemplo de Uso

1. Configure dois cartões com limite de R$ 1000
2. Adicione um gasto de R$ 300 em "Compras" com 3 parcelas
3. O app dividirá em R$ 100 por mês automaticamente
4. Navegue para outros meses e veja as parcelas aparecerem

## ⚙️ Personalizações Possíveis

Você pode facilmente:

- Adicionar mais cartões (edite cardSettings no storage.js)
- Mudar cores dos cartões (edite card-1, card-2 em index.css)
- Adicionar mais categorias (edite CATEGORIES em App.jsx)
- Ajustar limites de alerta (edite getUsageStatus em calculations.js)

## 🐛 Troubleshooting

**Dados não aparecem após recarregar?**

- Verifique se o localStorage está habilitado
- Tente limpar o cache do navegador

**Erro ao compilar?**

- Execute `npm install` novamente
- Delete a pasta `node_modules` e rode `npm install`

**Servidor não inicia?**

- Verifique se a porta 5173 está disponível
- Tente executar com `npm run dev -- --port 3000`

## 📄 Licença

Livre para uso pessoal

---

**Desenvolvido com ❤️ para controlar seus gastos com cartão de crédito**
