/** Every user-facing string lives here. English only for now. */
export const en = {
  tabs: {
    home: 'Home',
    activity: 'Activity',
    insights: 'Insights',
    budgets: 'Budgets',
    settings: 'Settings',
  },
  badges: {
    auto: 'Auto',
    review: 'Review',
  },
  transaction: {
    needsCategory: 'Needs a category',
  },
  hero: {
    spentIn: (month: string) => `Spent in ${month}`,
    deltaVs: (percent: string, month: string) => `${percent} vs ${month}`,
    income: 'Income',
    netSaved: 'Net saved',
  },
  a11y: {
    cumulativeSpending: 'Cumulative spending this month',
  },
  placeholders: {
    comingSoon: 'Coming soon',
  },
} as const;
