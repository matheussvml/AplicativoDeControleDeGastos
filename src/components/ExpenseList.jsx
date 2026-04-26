import { useState } from "react";
import { formatDate, formatMoney, getExpensesForMonth } from "../utils/calculations";

export default function ExpenseList({
  expenses,
  cards,
  monthKey,
  cardFilter,
  categoryFilter,
  searchFilter,
  onDeleteExpense,
}) {
  const [pendingDelete, setPendingDelete] = useState(null);

  const visibleExpenses = getExpensesForMonth(expenses, monthKey)
    .filter((expense) => !cardFilter || expense.cardId === Number(cardFilter))
    .filter((expense) => !categoryFilter || expense.category === categoryFilter)
    .filter((expense) =>
      expense.description.toLowerCase().includes(searchFilter.trim().toLowerCase()),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getCard = (cardId) => cards.find((card) => card.id === cardId);

  if (!visibleExpenses.length) {
    return (
      <section className="empty-state">
        <strong>Nenhum gasto encontrado</strong>
        <span>Quando você registrar uma compra para este mês, ela aparece aqui.</span>
      </section>
    );
  }

  return (
    <>
      <section className="expense-list">
        {visibleExpenses.map((expense) => {
          const card = getCard(expense.cardId);

          return (
            <article className="expense-item" key={expense.id}>
              <span className={`expense-accent ${card?.theme || "card-a"}`} />
              <div className="expense-main">
                <div className="expense-title">
                  <strong>{expense.description}</strong>
                  <b>{formatMoney(expense.value)}</b>
                </div>
                <div className="expense-meta">
                  <span>{expense.category}</span>
                  <span>{card?.name || "Cartão"}</span>
                  <span>{formatDate(expense.date)}</span>
                  <span>
                    {expense.installmentNumber}/{expense.installmentsTotal}
                  </span>
                </div>
                {expense.observation && <p className="expense-note">{expense.observation}</p>}
              </div>
              <button
                className="delete-button"
                type="button"
                onClick={() => setPendingDelete(expense)}
              >
                Excluir
              </button>
            </article>
          );
        })}
      </section>

      {pendingDelete && (
        <div className="modal-overlay" role="presentation" onClick={() => setPendingDelete(null)}>
          <section className="confirm-box" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <h2>Excluir gasto?</h2>
            <p>
              {pendingDelete.description} · {formatMoney(pendingDelete.value)} · parcela{" "}
              {pendingDelete.installmentNumber}/{pendingDelete.installmentsTotal}
            </p>

            {pendingDelete.installmentsTotal > 1 ? (
              <div className="confirm-actions">
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    onDeleteExpense(pendingDelete, "single");
                    setPendingDelete(null);
                  }}
                >
                  Só esta parcela
                </button>
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => {
                    onDeleteExpense(pendingDelete, "all");
                    setPendingDelete(null);
                  }}
                >
                  Todas as parcelas
                </button>
              </div>
            ) : (
              <button
                className="danger-button full"
                type="button"
                onClick={() => {
                  onDeleteExpense(pendingDelete, "single");
                  setPendingDelete(null);
                }}
              >
                Confirmar exclusão
              </button>
            )}

            <button className="text-button" type="button" onClick={() => setPendingDelete(null)}>
              Cancelar
            </button>
          </section>
        </div>
      )}
    </>
  );
}
