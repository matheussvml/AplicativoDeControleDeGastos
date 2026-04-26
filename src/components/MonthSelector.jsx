import { getCurrentMonthKey, getMonthFromKey, getMonthKey, getMonthName } from "../utils/calculations";

export default function MonthSelector({ monthKey, onMonthChange }) {
  const moveMonth = (direction) => {
    const date = getMonthFromKey(monthKey);
    date.setMonth(date.getMonth() + direction);
    onMonthChange(getMonthKey(date));
  };

  return (
    <section className="month-selector">
      <button className="icon-button" type="button" onClick={() => moveMonth(-1)} aria-label="Mês anterior">
        ‹
      </button>
      <div>
        <span>Mês selecionado</span>
        <strong>{getMonthName(monthKey)}</strong>
      </div>
      <button className="icon-button" type="button" onClick={() => moveMonth(1)} aria-label="Próximo mês">
        ›
      </button>
      {monthKey !== getCurrentMonthKey() && (
        <button className="today-button" type="button" onClick={() => onMonthChange(getCurrentMonthKey())}>
          Hoje
        </button>
      )}
    </section>
  );
}
