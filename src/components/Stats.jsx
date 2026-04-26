import { formatMoney, getCardSpent, getExpensesForMonth, groupTotalBy } from "../utils/calculations";

const sortedEntries = (totals) => Object.entries(totals).sort((a, b) => b[1] - a[1]);

export default function Stats({ expenses, cards, monthKey }) {
  const monthExpenses = getExpensesForMonth(expenses, monthKey);
  const categoryTotals = sortedEntries(groupTotalBy(monthExpenses, "category"));
  const maxCategory = Math.max(...categoryTotals.map(([, value]) => value), 1);

  return (
    <section className="stats-layout">
      <div className="panel">
        <div className="section-title">
          <span>Por cartão</span>
          <strong>{monthExpenses.length} lançamentos</strong>
        </div>
        <div className="mini-card-grid">
          {cards.map((card) => (
            <article className="mini-card" key={card.id}>
              <span className={`dot ${card.theme}`} />
              <small>{card.name}</small>
              <strong>{formatMoney(getCardSpent(expenses, card.id, monthKey))}</strong>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="section-title">
          <span>Por categoria</span>
          <strong>{formatMoney(monthExpenses.reduce((sum, item) => sum + item.value, 0))}</strong>
        </div>

        {categoryTotals.length ? (
          <div className="category-bars">
            {categoryTotals.map(([category, value]) => (
              <div className="category-row" key={category}>
                <div>
                  <span>{category}</span>
                  <strong>{formatMoney(value)}</strong>
                </div>
                <div className="bar-line">
                  <span style={{ width: `${(value / maxCategory) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">Sem gastos para calcular estatísticas neste mês.</p>
        )}
      </div>
    </section>
  );
}
