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

const normalizeCards = (cards = initialData.cards) =>
  initialData.cards.map((fallback, index) => {
    const card = cards[index] || fallback;
    return {
      ...fallback,
      ...card,
      id: fallback.id,
      limit: Number(card.limit) || fallback.limit,
      theme: card.theme || card.color || fallback.theme,
    };
  });

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
