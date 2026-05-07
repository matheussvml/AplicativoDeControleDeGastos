import { useMemo, useState } from "react";
import { CATEGORIES, createInstallments, formatMoney } from "../utils/calculations";

const today = () => new Date().toISOString().slice(0, 10);

export default function ExpenseForm({ cards, onAddExpense, onClose }) {
  const [form, setForm] = useState({
    cardId: cards[0]?.id || 1,
    description: "",
    value: "",
    category: CATEGORIES[0],
    date: today(),
    installments: 1,
    observation: "",
  });

  const installmentPreview = useMemo(() => {
    const value = Number(form.value) || 0;
    const installments = Number(form.installments) || 1;
    return installments > 1 ? value / installments : value;
  }, [form.value, form.installments]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "cardId" || name === "installments" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.description.trim() || Number(form.value) <= 0) {
      alert("Preencha a descrição e um valor válido.");
      return;
    }

    onAddExpense(createInstallments(form));
    onClose();
  };

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section className="sheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <div>
            <span className="eyebrow">Novo gasto</span>
            <h2>Registrar compra</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Cartão usado
            <select name="cardId" value={form.cardId} onChange={updateField}>
              {cards.map((card) => (
                <option key={card.id} value={card.id}>
                  {card.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Descrição
            <input
              name="description"
              value={form.description}
              onChange={updateField}
              placeholder="Mercado, farmácia, assinatura..."
              autoFocus
            />
          </label>

          <div className="two-columns">
            <label>
              Valor total
              <input
                name="value"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={form.value}
                onChange={updateField}
                placeholder="0,00"
              />
            </label>
            <label>
              Parcelas
              <input
                name="installments"
                type="number"
                min="1"
                max="36"
                value={form.installments}
                onChange={updateField}
              />
            </label>
          </div>

          <div className="two-columns">
            <label>
              Categoria
              <select name="category" value={form.category} onChange={updateField}>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Data
              <input name="date" type="date" value={form.date} onChange={updateField} />
            </label>
          </div>

          <label>
            Observação opcional
            <textarea
              name="observation"
              value={form.observation}
              onChange={updateField}
              rows="3"
              placeholder="Algo que ajude você a lembrar desse gasto"
            />
          </label>

          {Number(form.installments) > 1 && (
            <div className="installment-note">
              <span>Cada mês receberá</span>
              <strong>{formatMoney(installmentPreview)}</strong>
            </div>
          )}

          <div className="actions-row">
            <button className="secondary-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary-button" type="submit">
              Salvar gasto
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
