import {
  formatMoney,
  getCardSpent,
  getUsagePercentage,
  getUsageStatus,
} from "../utils/calculations";

export default function CardSummary({ card, expenses, monthKey, onEditCard }) {
  const spent = getCardSpent(expenses, card.id, monthKey);
  const remaining = card.limit - spent;
  const percentage = getUsagePercentage(spent, card.limit);
  const status = getUsageStatus(spent, card.limit);

  return (
    <article className={`credit-card ${card.theme} ${status}`}>
      <div className="card-topline">
        <span>{card.name}</span>
        <button className="ghost-button light" type="button" onClick={onEditCard}>
          Editar
        </button>
      </div>

      <div className="card-money">
        <div>
          <small>Gasto no mês</small>
          <strong>{formatMoney(spent)}</strong>
        </div>
        <div>
          <small>Limite</small>
          <strong>{formatMoney(card.limit)}</strong>
        </div>
      </div>

      <div className="progress-track" aria-label={`${percentage.toFixed(0)}% do limite usado`}>
        <span className={`progress-fill ${status}`} style={{ width: `${percentage}%` }} />
      </div>

      <div className="card-footer">
        <span>{percentage.toFixed(0)}% utilizado</span>
        <span>{formatMoney(Math.max(remaining, 0))} restante</span>
      </div>

      {status === "warning" && (
        <p className="limit-alert warning">Atenção: este cartão passou de 80% do limite.</p>
      )}
      {status === "danger" && (
        <p className="limit-alert danger">Limite estourado neste mês.</p>
      )}
    </article>
  );
}
