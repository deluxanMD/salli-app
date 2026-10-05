import type { CategoryId } from '@/theme/salli-theme';
import type { Transaction } from '@/types/transaction';

/** Fixed "now" for the design mock: the canvas shows Wednesday 30 September 2026. */
export const MOCK_NOW = new Date(2026, 8, 30, 20, 0);

const SMS_KEELLS = 'Rs 4,820.00 debited at KEELLS SUPER from card ending 1234.';

export const mockTransactions: Transaction[] = [
  {
    id: 't1',
    merchant: 'Keells Super',
    categoryId: 'groceries',
    amount: -4820,
    at: new Date(2026, 8, 30, 18, 42),
    auto: true,
    account: 'Card ending 1234',
    sms: SMS_KEELLS,
  },
  {
    id: 't2',
    merchant: 'PickMe',
    categoryId: 'transport',
    amount: -780,
    at: new Date(2026, 8, 30, 17, 10),
    auto: true,
    account: 'Card ending 1234',
    sms: 'Rs 780.00 debited at PICKME from card ending 1234.',
  },
  {
    id: 't3',
    merchant: 'Salary',
    categoryId: 'income',
    amount: 185000,
    at: new Date(2026, 8, 30, 9, 2),
    auto: true,
    account: 'Account ending 8841',
    sms: 'Rs 185,000.00 credited to account ending 8841. SALARY.',
  },
  {
    id: 't4',
    merchant: 'Dialog Axiata',
    categoryId: 'bills',
    amount: -1990,
    at: new Date(2026, 8, 29, 20, 15),
    auto: true,
    account: 'Card ending 1234',
    sms: 'Rs 1,990.00 debited at DIALOG AXIATA from card ending 1234.',
  },
  {
    id: 't5',
    merchant: 'Urban Coffee',
    categoryId: 'food',
    amount: -1350,
    at: new Date(2026, 8, 29, 11, 30),
    auto: true,
    account: 'Card ending 1234',
    sms: 'Rs 1,350.00 debited at URBAN COFFEE from card ending 1234.',
  },
  {
    id: 't6',
    merchant: 'POS 4421 MERCH',
    categoryId: null,
    amount: -3200,
    at: new Date(2026, 8, 29, 9, 48),
    auto: true,
    account: 'Card ending 1234',
    sms: 'Rs 3,200.00 debited at POS 4421 MERCH from card ending 1234.',
  },
  {
    id: 't7',
    merchant: 'CEB Electricity',
    categoryId: 'bills',
    amount: -4850,
    at: new Date(2026, 8, 27, 16, 5),
    auto: true,
    account: 'Account ending 8841',
    sms: 'Rs 4,850.00 debited at CEB ELECTRICITY from account ending 8841.',
  },
  {
    id: 't8',
    merchant: 'Cargills Food City',
    categoryId: 'groceries',
    amount: -2640,
    at: new Date(2026, 8, 27, 13, 20),
    auto: true,
    account: 'Card ending 1234',
    sms: 'Rs 2,640.00 debited at CARGILLS FOOD CITY from card ending 1234.',
  },
];

/** Overview totals for September 2026. Computed from real data in the data-layer milestone. */
export const mockOverview = {
  monthLabel: 'September',
  previousMonthLabel: 'Aug',
  spent: 87350,
  income: 185000,
  netSaved: 97650,
  deltaPercent: -5.2,
  /** Cumulative spend through the month, one point per sample. */
  trend: [57, 52.7, 50.2, 42.8, 38.4, 33.4, 29.7, 24.8, 19.8, 16.1, 11.7, 8].map((y) => 70 - y),
};

export const mockCategoryShare: readonly { categoryId: CategoryId; percent: number }[] = [
  { categoryId: 'food', percent: 28.2 },
  { categoryId: 'groceries', percent: 21.6 },
  { categoryId: 'bills', percent: 17.5 },
  { categoryId: 'transport', percent: 12.8 },
  { categoryId: 'shopping', percent: 10.8 },
  { categoryId: 'entertainment', percent: 4.7 },
  { categoryId: 'health', percent: 4.4 },
];

export type BudgetLine = { categoryId: CategoryId; spent: number; limit: number };

export const mockBudgets: readonly BudgetLine[] = [
  { categoryId: 'food', spent: 24600, limit: 30000 },
  { categoryId: 'groceries', spent: 18900, limit: 25000 },
  { categoryId: 'transport', spent: 11200, limit: 15000 },
  { categoryId: 'bills', spent: 15300, limit: 16000 },
  { categoryId: 'shopping', spent: 9450, limit: 15000 },
  { categoryId: 'entertainment', spent: 4100, limit: 5000 },
  { categoryId: 'health', spent: 3800, limit: 6000 },
];

/** Budget lines shown on the dashboard, most urgent first. */
export const mockDashboardBudgetIds: readonly CategoryId[] = ['bills', 'food', 'entertainment'];

export const mockOverallBudget = { spent: 87350, remaining: 24650 };

export const mockTopMerchants: readonly { merchant: string; total: number }[] = [
  { merchant: 'Keells Super', total: 14300 },
  { merchant: 'PickMe', total: 7400 },
  { merchant: 'Dialog Axiata', total: 5980 },
  { merchant: 'Urban Coffee', total: 5200 },
  { merchant: 'CEB Electricity', total: 4850 },
];

export const mockHighlights = {
  biggestCategory: { categoryId: 'food' as CategoryId, percent: 28 },
  highestDay: 'Saturday',
};
