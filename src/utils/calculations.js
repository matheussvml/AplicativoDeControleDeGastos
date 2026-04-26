export const CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Assinaturas",
  "Compras",
  "Saúde",
  "Educação",
  "Outros",
];

export const CARD_THEMES = ["card-a", "card-b"];

export const getMonthKey = (date = new Date()) => {
  const safeDate = date instanceof Date ? date : new Date(`${date}T12:00:00`);
  return `${safeDate.getFullYear()}-${String(safeDate.getMonth() + 1).padStart(2, "0")}`;
};

export const getCurrentMonthKey = () => getMonthKey(new Date());

export const getMonthFromKey = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  return new Date(year, month - 1, 1);
};

export const addMonths = (dateString, monthsToAdd) => {
  const date = new Date(`${dateString}T12:00:00`);
  date.setMonth(date.getMonth() + monthsToAdd);
  return date;
};

export const getMonthName = (monthKey) =>
  getMonthFromKey(monthKey).toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

export const formatMoney = (value = 0) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number.isFinite(value) ? value : 0);

export const formatDate = (dateString) =>
  new Date(`${dateString}T12:00:00`).toLocaleDateString("pt-BR");

export const createInstallments = (expense) => {
  const totalInstallments = Math.max(Number(expense.installments) || 1, 1);
  const totalValue = Number(expense.value) || 0;
  const installmentValue = Number((totalValue / totalInstallments).toFixed(2));
  const purchaseId = crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return Array.from({ length: totalInstallments }, (_, index) => {
    const isLast = index === totalInstallments - 1;
    const adjustedValue = isLast
      ? Number((totalValue - installmentValue * (totalInstallments - 1)).toFixed(2))
      : installmentValue;

    return {
      id: `${purchaseId}-${index + 1}`,
      purchaseId,
      cardId: Number(expense.cardId),
      description: expense.description.trim(),
      value: adjustedValue,
      totalValue,
      category: expense.category,
      date: expense.date,
      monthKey: getMonthKey(addMonths(expense.date, index)),
      installmentNumber: index + 1,
      installmentsTotal: totalInstallments,
      observation: expense.observation?.trim() || "",
      createdAt: new Date().toISOString(),
    };
  });
};

export const getExpensesForMonth = (expenses, monthKey) =>
  expenses.filter((expense) => expense.monthKey === monthKey);

export const getCardSpent = (expenses, cardId, monthKey) =>
  getExpensesForMonth(expenses, monthKey)
    .filter((expense) => expense.cardId === cardId)
    .reduce((sum, expense) => sum + Number(expense.value || 0), 0);

export const getMonthTotal = (expenses, monthKey) =>
  getExpensesForMonth(expenses, monthKey).reduce(
    (sum, expense) => sum + Number(expense.value || 0),
    0,
  );

export const groupTotalBy = (expenses, key) =>
  expenses.reduce((totals, expense) => {
    const label = expense[key] || "Outros";
    totals[label] = (totals[label] || 0) + Number(expense.value || 0);
    return totals;
  }, {});

export const getUsagePercentage = (spent, limit) => {
  if (!limit) return 0;
  return Math.min((spent / limit) * 100, 100);
};

export const getUsageStatus = (spent, limit) => {
  if (!limit) return "neutral";
  const percentage = (spent / limit) * 100;
  if (percentage >= 100) return "danger";
  if (percentage >= 80) return "warning";
  return "ok";
};

export const normalizeLegacyExpenses = (expenses = []) =>
  expenses.flatMap((expense) => {
    if (expense.monthKey && expense.purchaseId) return expense;

    return createInstallments({
      cardId: expense.cardId,
      description: expense.description || "Gasto importado",
      value: expense.value || 0,
      category: expense.category || "Outros",
      date: expense.date || new Date().toISOString().slice(0, 10),
      installments: expense.instalments || expense.installments || 1,
      observation: expense.observation || "",
    });
  });
