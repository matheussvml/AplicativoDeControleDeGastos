import {
  formatMoney,
  getCardSpent,
  getExpensesForMonth,
  getMonthTotal,
  groupTotalBy,
} from "../utils/calculations";

const sortedEntries = (totals) => Object.entries(totals).sort((a, b) => b[1] - a[1]);

function getPastMonths(monthKey, count) {
  const [year, month] = monthKey.split("-").map(Number);
  const result = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(year, month - 1 - i, 1);
    result.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return result;
}

function shortMonth(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1)
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");
}

function TrendChart({ expenses, currentMonthKey }) {
  const months = getPastMonths(currentMonthKey, 6);
  const totals = months.map((mk) => getMonthTotal(expenses, mk));
  const maxValue = Math.max(...totals, 1);

  const BAR_W = 28;
  const SLOT_W = 44;
  const MAX_H = 72;
  const BASE_Y = 88;

  return (
    <div className="panel chart-panel">
      <div className="section-title">
        <span>Tendência (6 meses)</span>
      </div>
      <svg viewBox="0 0 264 116" className="trend-svg" aria-label="Tendência de gastos mensais">
        <line x1="0" y1={BASE_Y + 1} x2="264" y2={BASE_Y + 1} className="trend-baseline" />
        {months.map((mk, i) => {
          const value = totals[i];
          const barH = Math.max((value / maxValue) * MAX_H, value > 0 ? 5 : 2);
          const bx = i * SLOT_W + (SLOT_W - BAR_W) / 2;
          const by = BASE_Y - barH;
          const isCurrent = mk === currentMonthKey;

          return (
            <g key={mk}>
              <rect
                x={bx}
                y={by}
                width={BAR_W}
                height={barH}
                rx={6}
                className={isCurrent ? "trend-bar current" : "trend-bar"}
              />
              {isCurrent && value > 0 && (
                <text
                  x={bx + BAR_W / 2}
                  y={by - 5}
                  textAnchor="middle"
                  className="trend-value"
                >
                  {formatMoney(value)}
                </text>
              )}
              <text
                x={bx + BAR_W / 2}
                y={BASE_Y + 16}
                textAnchor="middle"
                className={isCurrent ? "trend-label current" : "trend-label"}
              >
                {shortMonth(mk)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function Stats({ expenses, cards, monthKey }) {
  const monthExpenses = getExpensesForMonth(expenses, monthKey);
  const total = monthExpenses.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const categoryTotals = sortedEntries(groupTotalBy(monthExpenses, "category"));
  const maxCategory = Math.max(...categoryTotals.map(([, v]) => v), 1);
  const avgValue = monthExpenses.length ? total / monthExpenses.length : 0;
  const maxExpense = monthExpenses.length
    ? Math.max(...monthExpenses.map((e) => Number(e.value || 0)))
    : 0;

  return (
    <section className="stats-layout">
      <div className="stat-chips">
        <div className="stat-chip">
          <span>Lançamentos</span>
          <strong>{monthExpenses.length}</strong>
        </div>
        <div className="stat-chip">
          <span>Ticket médio</span>
          <strong>{formatMoney(avgValue)}</strong>
        </div>
        <div className="stat-chip">
          <span>Maior gasto</span>
          <strong>{formatMoney(maxExpense)}</strong>
        </div>
      </div>

      <TrendChart expenses={expenses} currentMonthKey={monthKey} />

      <div className="panel">
        <div className="section-title">
          <span>Por cartão</span>
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
          <strong>{formatMoney(total)}</strong>
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
