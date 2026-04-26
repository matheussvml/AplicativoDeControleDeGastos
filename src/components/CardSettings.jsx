import { useState } from "react";
import { formatMoney } from "../utils/calculations";

export default function CardSettings({ cards, onSaveCards, onClose }) {
  const [draftCards, setDraftCards] = useState(cards.map((card) => ({ ...card })));

  const updateCard = (cardId, field, value) => {
    setDraftCards((current) =>
      current.map((card) =>
        card.id === cardId
          ? { ...card, [field]: field === "limit" ? Number(value) : value }
          : card,
      ),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (draftCards.some((card) => !card.name.trim() || Number(card.limit) <= 0)) {
      alert("Informe nome e limite válido para os dois cartões.");
      return;
    }

    onSaveCards(draftCards);
    onClose();
  };

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section className="sheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <div className="sheet-header">
          <div>
            <span className="eyebrow">Configuração</span>
            <h2>Editar cartões</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          {draftCards.map((card, index) => (
            <fieldset className="settings-card" key={card.id}>
              <legend>
                <span className={`dot ${card.theme}`} />
                Cartão {index + 1}
              </legend>

              <label>
                Nome do cartão
                <input
                  value={card.name}
                  onChange={(event) => updateCard(card.id, "name", event.target.value)}
                  placeholder="Ex: Nubank, Inter, cartão azul..."
                />
              </label>

              <label>
                Limite
                <input
                  type="number"
                  inputMode="decimal"
                  min="1"
                  step="50"
                  value={card.limit}
                  onChange={(event) => updateCard(card.id, "limit", event.target.value)}
                />
              </label>

              <div className="limit-preview">
                <span>Limite atual</span>
                <strong>{formatMoney(card.limit)}</strong>
              </div>
            </fieldset>
          ))}

          <div className="actions-row">
            <button className="secondary-button" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="primary-button" type="submit">
              Salvar cartões
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
