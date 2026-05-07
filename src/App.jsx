import { useEffect, useMemo, useState } from "react";
import CardSettings from "./components/CardSettings";
import CardSummary from "./components/CardSummary";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthSelector from "./components/MonthSelector";
import SpendingChart from "./components/SpendingChart";
import Stats from "./components/Stats";
import { getStorageData, saveStorageData } from "./utils/storage";
import {
  CATEGORIES,
  formatMoney,
  getCurrentMonthKey,
  getMonthTotal,
} from "./utils/calculations";

const tabs = [
  { id: "dashboard", label: "Resumo" },
  { id: "expenses", label: "Gastos" },
  { id: "stats", label: "Estatísticas" },
];

export default function App() {
  const [data, setData] = useState(() => getStorageData());
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filters, setFilters] = useState({
    cardId: "",
    category: "",
    search: "",
  });

  useEffect(() => {
    saveStorageData(data);
  }, [data]);

  const summary = useMemo(() => {
    const spent = getMonthTotal(data.expenses, monthKey);
    const limit = data.cards.reduce((sum, card) => sum + Number(card.limit || 0), 0);
    return {
      spent,
      limit,
      remaining: limit - spent,
    };
  }, [data, monthKey]);

  const updateFilter = (field, value) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const addExpense = (installments) => {
    setData((current) => ({
      ...current,
      expenses: [...current.expenses, ...installments],
    }));
    setActiveTab("expenses");
  };

  const deleteExpense = (expense, mode) => {
    setData((current) => ({
      ...current,
      expenses:
        mode === "all"
          ? current.expenses.filter((item) => item.purchaseId !== expense.purchaseId)
          : current.expenses.filter((item) => item.id !== expense.id),
    }));
  };

  const saveCards = (cards) => {
    setData((current) => ({ ...current, cards }));
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="top-icons">
          <button className="round-icon" type="button" aria-label="Menu">
            ≡
          </button>
          <button className="round-icon" type="button" onClick={() => setShowSettings(true)} aria-label="Ajustes">
            ◎
          </button>
        </div>
        <div className="balance-hero">
          <span>Total gasto no mês</span>
          <h1>{formatMoney(summary.spent)}</h1>
          <p>Controle manual dos cartões liberados para você.</p>
        </div>
      </header>

      <MonthSelector monthKey={monthKey} onMonthChange={setMonthKey} />

      <section className="overview-panel">
        <div>
          <span>Total gasto</span>
          <strong>{formatMoney(summary.spent)}</strong>
        </div>
        <div>
          <span>Limite total</span>
          <strong>{formatMoney(summary.limit)}</strong>
        </div>
        <div className={summary.remaining < 0 ? "negative" : ""}>
          <span>Restante</span>
          <strong>{formatMoney(Math.max(summary.remaining, 0))}</strong>
        </div>
      </section>

      <nav className="tab-bar" aria-label="Seções do aplicativo">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "dashboard" && (
        <section className="stack">
          {data.cards.map((card) => (
            <CardSummary
              key={card.id}
              card={card}
              expenses={data.expenses}
              monthKey={monthKey}
              onEditCard={() => setShowSettings(true)}
            />
          ))}
          <SpendingChart expenses={data.expenses} monthKey={monthKey} />
        </section>
      )}

      {activeTab === "expenses" && (
        <section className="stack">
          <div className="filters-panel">
            <label className="search-field">
              Buscar descrição
              <input
                value={filters.search}
                onChange={(event) => updateFilter("search", event.target.value)}
                placeholder="Ex: mercado"
              />
            </label>
            <div className="two-columns">
              <label>
                Cartão
                <select
                  value={filters.cardId}
                  onChange={(event) => updateFilter("cardId", event.target.value)}
                >
                  <option value="">Todos</option>
                  {data.cards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Categoria
                <select
                  value={filters.category}
                  onChange={(event) => updateFilter("category", event.target.value)}
                >
                  <option value="">Todas</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <ExpenseList
            expenses={data.expenses}
            cards={data.cards}
            monthKey={monthKey}
            cardFilter={filters.cardId}
            categoryFilter={filters.category}
            searchFilter={filters.search}
            onDeleteExpense={deleteExpense}
          />
        </section>
      )}

      {activeTab === "stats" && (
        <Stats expenses={data.expenses} cards={data.cards} monthKey={monthKey} />
      )}

      <button className="fab" type="button" onClick={() => setShowExpenseForm(true)}>
        +
      </button>

      {showExpenseForm && (
        <ExpenseForm
          cards={data.cards}
          onAddExpense={addExpense}
          onClose={() => setShowExpenseForm(false)}
        />
      )}

      {showSettings && (
        <CardSettings
          cards={data.cards}
          onSaveCards={saveCards}
          onClose={() => setShowSettings(false)}
        />
      )}
    </main>
  );
}
