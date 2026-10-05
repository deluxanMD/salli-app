import type { CategoryId } from '@/theme/salli-theme';

export type Transaction = {
  id: string;
  merchant: string;
  /** Null when the parser could not file it: shown as "Needs a category". */
  categoryId: CategoryId | null;
  /** Negative for expenses, positive for income, in rupees. */
  amount: number;
  /** When the transaction happened (local time). */
  at: Date;
  /** Created from an SMS. */
  auto: boolean;
  account: string;
  /** Original message text, when it came from an SMS. */
  sms?: string;
  note?: string;
};
