import { formatMoney, getExpensesForMonth, groupTotalBy } from "../utils/calculations";

const CATEGORY_COLORS = {
  Alimentação: "#f97316",
  Transporte: "#06b6d4",
  Lazer: "#8b5cf6",
  Assinaturas: "#a78bfa",
  Compras: "#f59e0b",
  Saúde: "#10b981",
  Educação: "#3b82f6",
  Outros: "#94a3b8",
};

const FALLBACK_COLORS = ["#f97316", "#06b6d4", "#8b5cf6", "#f59e0b", "#10b981", "#3b82f6", "#e879f9", "#94a3b8"];

function getColor(category, index) {
  return CATEGORY_COLORS[category] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function buildSlices(entries, total) {
  const circumference = 2 * Math.PI * 68;
  let accumulated = 0;
  return entries.map(([category, value], index) => {
    const fraction = value / total;
    const dash = fraction * circumference;
    const offset = circumference * 0.25 - accumulated * circumference;
    accumulated += fraction;
    return { category, value, fraction, dash, offset, color: getColor(category, index) };
  });
}

export default function SpendingChart({ expenses, monthKey }) {
  const monthExpenses = getExpensesForMonth(expenses, monthKey);
  const total = monthExpenses.reduce((sum, e) => sum + Number(e.value || 0), 0);

  if (!total) {
    return (
      <div className="panel chart-panel">
        <div className="section-title">
          <span>Distribuição</span>
        </div>
        <p className="muted chart-empty">Adicione gastos para ver o gráfico.</p>
      </div>
    );
  }

  const entries = Object.entries(groupTotalBy(monthExpenses, "category")).sort((a, b) => b[1] - a[1]);
  const slices = buildSlices(entries, total);
  const circumference = 2 * Math.PI * 68;

  return (
    <div className="panel chart-panel">
      <div className="section-title">
        <span>Por categoria</span>
        <strong>{formatMoney(total)}</strong>
      </div>

      <div className="donut-wrapper">
        <svg viewBox="0 0 180 180" className="donut-svg" aria-hidden="true">
          <circle cx="90" cy="90" r="68" fill="none" stroke="#1c1930" strokeWidth="22" />
          {slices.map(({ category, dash, offset, color }) => (
            <circle
              key={category}
              cx="90"
              cy="90"
              r="68"
              fill="none"
              stroke={color}
              strokeWidth="22"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="donut-center">
          <span>total</span>
          <strong>{formatMoney(total)}</strong>
        </div>
      </div>

      <div className="chart-legend">
        {slices.map(({ category, value, fraction, color }) => (
          <div className="legend-row" key={category}>
            <span className="legend-dot" style={{ background: color }} />
            <span className="legend-label">{category}</span>
            <span className="legend-value">{formatMoney(value)}</span>
            <span className="legend-pct">{(fraction * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
