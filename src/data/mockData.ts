export type TrendPoint = {
  label: string;
  value: number;
  value2?: number;
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  change: number;
  changeLabel: string;
  spark: number[];
  accent: 'accent' | 'mint' | 'amber' | 'rose';
  icon: 'revenue' | 'customers' | 'projects' | 'conversion';
};

export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  progress: number;
  budget: number;
  spent: number;
  due: string;
  team: { initials: string; color: string }[];
};

export type Transaction = {
  id: string;
  description: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  status: 'completed' | 'pending' | 'failed';
};

export type Activity = {
  id: string;
  user: string;
  initials: string;
  color: string;
  action: string;
  target: string;
  time: string;
};

export const kpis: Kpi[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$2.84M',
    rawValue: 2840000,
    change: 12.4,
    changeLabel: 'vs last quarter',
    spark: [42, 48, 45, 52, 58, 55, 64, 68, 72, 78, 84, 92],
    accent: 'accent',
    icon: 'revenue',
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '18,492',
    rawValue: 18492,
    change: 8.1,
    changeLabel: 'vs last quarter',
    spark: [30, 32, 35, 38, 42, 44, 48, 52, 55, 58, 62, 66],
    accent: 'mint',
    icon: 'customers',
  },
  {
    id: 'projects',
    label: 'Active Projects',
    value: '247',
    rawValue: 247,
    change: -3.2,
    changeLabel: 'vs last quarter',
    spark: [60, 58, 62, 55, 52, 56, 50, 48, 52, 49, 47, 48],
    accent: 'amber',
    icon: 'projects',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '4.7%',
    rawValue: 4.7,
    change: 1.8,
    changeLabel: 'vs last quarter',
    spark: [20, 22, 21, 24, 26, 25, 28, 30, 32, 31, 34, 38],
    accent: 'rose',
    icon: 'conversion',
  },
];

export const revenueData: TrendPoint[] = [
  { label: 'Jan', value: 184, value2: 142 },
  { label: 'Feb', value: 198, value2: 150 },
  { label: 'Mar', value: 215, value2: 165 },
  { label: 'Apr', value: 208, value2: 172 },
  { label: 'May', value: 234, value2: 180 },
  { label: 'Jun', value: 252, value2: 195 },
  { label: 'Jul', value: 248, value2: 202 },
  { label: 'Aug', value: 276, value2: 215 },
  { label: 'Sep', value: 294, value2: 228 },
  { label: 'Oct', value: 312, value2: 240 },
  { label: 'Nov', value: 328, value2: 252 },
  { label: 'Dec', value: 356, value2: 268 },
];

export const expenseData: TrendPoint[] = [
  { label: 'Jan', value: 92 },
  { label: 'Feb', value: 98 },
  { label: 'Mar', value: 105 },
  { label: 'Apr', value: 102 },
  { label: 'May', value: 112 },
  { label: 'Jun', value: 118 },
  { label: 'Jul', value: 115 },
  { label: 'Aug', value: 125 },
  { label: 'Sep', value: 132 },
  { label: 'Oct', value: 138 },
  { label: 'Nov', value: 142 },
  { label: 'Dec', value: 148 },
];

export const categoryBreakdown = [
  { label: 'SaaS Subscriptions', value: 38, color: '#3b82f6' },
  { label: 'Infrastructure', value: 24, color: '#10b981' },
  { label: 'Marketing', value: 18, color: '#f59e0b' },
  { label: 'Operations', value: 12, color: '#8b5cf6' },
  { label: 'Other', value: 8, color: '#64748b' },
];

export const weeklyActivity = [
  { label: 'Mon', value: 64 },
  { label: 'Tue', value: 78 },
  { label: 'Wed', value: 52 },
  { label: 'Thu', value: 88 },
  { label: 'Fri', value: 96 },
  { label: 'Sat', value: 34 },
  { label: 'Sun', value: 28 },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Atlas Platform Migration',
    client: 'Helios Corp',
    status: 'on-track',
    progress: 72,
    budget: 480000,
    spent: 312000,
    due: 'Nov 14',
    team: [
      { initials: 'AK', color: '#3b82f6' },
      { initials: 'MR', color: '#10b981' },
      { initials: 'JS', color: '#f59e0b' },
    ],
  },
  {
    id: 'p2',
    name: 'Quantum Analytics Rollout',
    client: 'Northwind Labs',
    status: 'at-risk',
    progress: 48,
    budget: 320000,
    spent: 198000,
    due: 'Oct 28',
    team: [
      { initials: 'DL', color: '#8b5cf6' },
      { initials: 'SP', color: '#f43f5e' },
    ],
  },
  {
    id: 'p3',
    name: 'Payment Gateway Integration',
    client: 'Stripe Partners',
    status: 'on-track',
    progress: 86,
    budget: 210000,
    spent: 178000,
    due: 'Oct 10',
    team: [
      { initials: 'TN', color: '#3b82f6' },
      { initials: 'EV', color: '#10b981' },
      { initials: 'BK', color: '#f59e0b' },
      { initials: 'LC', color: '#8b5cf6' },
    ],
  },
  {
    id: 'p4',
    name: 'Mobile App Redesign',
    client: 'Acme Inc',
    status: 'delayed',
    progress: 34,
    budget: 156000,
    spent: 112000,
    due: 'Sep 30',
    team: [
      { initials: 'RH', color: '#f43f5e' },
      { initials: 'MK', color: '#3b82f6' },
    ],
  },
  {
    id: 'p5',
    name: 'Data Warehouse Modernization',
    client: 'CloudPeak',
    status: 'completed',
    progress: 100,
    budget: 540000,
    spent: 512000,
    due: 'Sep 12',
    team: [
      { initials: 'JW', color: '#10b981' },
      { initials: 'AP', color: '#8b5cf6' },
      { initials: 'CF', color: '#f59e0b' },
    ],
  },
  {
    id: 'p6',
    name: 'Customer Portal v3',
    client: 'Helios Corp',
    status: 'on-track',
    progress: 61,
    budget: 280000,
    spent: 164000,
    due: 'Dec 02',
    team: [
      { initials: 'NM', color: '#3b82f6' },
      { initials: 'OS', color: '#10b981' },
    ],
  },
];

export const transactions: Transaction[] = [
  { id: 't1', description: 'Enterprise Plan — Helios Corp', category: 'Subscription', amount: 24900, type: 'credit', date: 'Sep 17', status: 'completed' },
  { id: 't2', description: 'AWS Infrastructure', category: 'Infrastructure', amount: 8420, type: 'debit', date: 'Sep 16', status: 'completed' },
  { id: 't3', description: 'Pro Plan — Acme Inc', category: 'Subscription', amount: 4900, type: 'credit', date: 'Sep 16', status: 'completed' },
  { id: 't4', description: 'Marketing Campaign Q4', category: 'Marketing', amount: 12600, type: 'debit', date: 'Sep 15', status: 'pending' },
  { id: 't5', description: 'Enterprise Plan — CloudPeak', category: 'Subscription', amount: 24900, type: 'credit', date: 'Sep 15', status: 'completed' },
  { id: 't6', description: 'Figma Team Licenses', category: 'Operations', amount: 2400, type: 'debit', date: 'Sep 14', status: 'completed' },
  { id: 't7', description: 'Starter Plan — BlueOak', category: 'Subscription', amount: 990, type: 'credit', date: 'Sep 14', status: 'failed' },
  { id: 't8', description: 'Datadog Monitoring', category: 'Infrastructure', amount: 3200, type: 'debit', date: 'Sep 13', status: 'completed' },
];

export const activities: Activity[] = [
  { id: 'a1', user: 'Anna Kim', initials: 'AK', color: '#3b82f6', action: 'deployed', target: 'Atlas Platform v2.4', time: '12 min ago' },
  { id: 'a2', user: 'Devon Lee', initials: 'DL', color: '#8b5cf6', action: 'created invoice for', target: 'Northwind Labs', time: '38 min ago' },
  { id: 'a3', user: 'Tara Nguyen', initials: 'TN', color: '#3b82f6', action: 'closed ticket', target: '#1247 — Payment flow bug', time: '1 hr ago' },
  { id: 'a4', user: 'Jordan Webb', initials: 'JW', color: '#10b981', action: 'completed milestone', target: 'Data Warehouse Migration', time: '2 hr ago' },
  { id: 'a5', user: 'Mia Rodriguez', initials: 'MR', color: '#10b981', action: 'uploaded', target: 'Q4 Financial Report', time: '3 hr ago' },
  { id: 'a6', user: 'Evan Vasquez', initials: 'EV', color: '#10b981', action: 'invited', target: '3 team members', time: '5 hr ago' },
];

export const cashFlowData: TrendPoint[] = [
  { label: 'W1', value: 45, value2: 28 },
  { label: 'W2', value: 52, value2: 32 },
  { label: 'W3', value: 48, value2: 35 },
  { label: 'W4', value: 61, value2: 38 },
  { label: 'W5', value: 58, value2: 42 },
  { label: 'W6', value: 68, value2: 45 },
];

export const teamPerformance = [
  { label: 'Engineering', value: 92, color: '#3b82f6' },
  { label: 'Design', value: 78, color: '#8b5cf6' },
  { label: 'Product', value: 85, color: '#10b981' },
  { label: 'Marketing', value: 64, color: '#f59e0b' },
  { label: 'Sales', value: 88, color: '#f43f5e' },
];
