import { CARD_THEMES, normalizeLegacyExpenses } from "./calculations";

const STORAGE_KEY = "credit_card_tracker_v2";
const LEGACY_STORAGE_KEY = "expense_tracker_data";

export const initialData = {
  cards: [
    {
      id: 1,
      name: "Cartão 1",
      limit: 1000,
      theme: CARD_THEMES[0],
    },
    {
      id: 2,
      name: "Cartão 2",
      limit: 1000,
      theme: CARD_THEMES[1],
    },
  ],
  expenses: [],
};

const normalizeCards = (cards) => {
  if (!Array.isArray(cards) || cards.length === 0) return initialData.cards;
  return cards.map((card, index) => ({
    id: card.id ?? index + 1,
    name: card.name || `Cartão ${index + 1}`,
    limit: Number(card.limit) || 1000,
    theme: card.theme || card.color || CARD_THEMES[index % CARD_THEMES.length],
  }));
};

export const getStorageData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : legacy ? JSON.parse(legacy) : initialData;

    return {
      cards: normalizeCards(parsed.cards),
      expenses: normalizeLegacyExpenses(parsed.expenses || []),
    };
  } catch (error) {
    console.error("Não foi possível carregar os dados locais.", error);
    return initialData;
  }
};

export const saveStorageData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Não foi possível salvar os dados locais.", error);
  }
};
