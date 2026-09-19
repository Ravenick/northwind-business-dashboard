# Northwind | Business Intelligence

A dark, responsive business intelligence dashboard built by Nelson Emmanuel | Ravenick. Northwind brings performance metrics, project tracking, wallet activity, team reporting, and account settings into one focused operational workspace.

> [!NOTE]
> This is a front-end dashboard experience powered by local mock data. It is designed as a polished portfolio interface and does not require a backend to run.

## Preview

![Ravenick logo](public/oc-logo-no-bg.png)

## Features

- Responsive dashboard shell with desktop sidebar and mobile navigation
- Dashboard overview with KPI cards, activity feed, transactions, and project summaries
- Analytics view with area, line, bar, donut, radial progress, and sparkline visualizations
- Projects view for project status, progress, owners, deadlines, and budgets
- Wallet view for account balances and financial transaction tracking
- Team view for department performance and member activity
- Settings view for account and system preference surfaces
- Persistent dark/light mode toggle with local browser preference storage
- Fixed, non-dismissible Ravenick author badge with the project logo and continuous sheen animation
- Responsive glass-panel styling, grid textures, glow layers, and dashboard-focused typography
- Branded SEO metadata, social sharing metadata, favicon, and theme color

## Built With

| Tool | Use |
| --- | --- |
| React 18 | Dashboard composition and view navigation |
| TypeScript | Typed view contracts and component props |
| Tailwind CSS 3 | Responsive layout and theme utilities |
| Lucide React | Interface and navigation icons |
| Vite | Development server and production compilation |

## Project Structure

```text
public/
	oc-logo-no-bg.png
src/
	components/
		charts/
			AreaChart.tsx
			BarChart.tsx
			DonutChart.tsx
			LineChart.tsx
			RadialProgress.tsx
			Sparkline.tsx
		ActivityFeed.tsx
		KpiCard.tsx
		ProjectsTable.tsx
		Sidebar.tsx
		TopBar.tsx
		TransactionsTable.tsx
	data/
		mockData.ts
	views/
		AnalyticsView.tsx
		DashboardView.tsx
		ProjectsView.tsx
		SettingsView.tsx
		TeamView.tsx
		WalletView.tsx
	App.tsx
	index.css
	main.tsx
index.html
package.json
tailwind.config.js
vite.config.ts
```

## Run Locally

```bash
git clone https://github.com/Ravenick/northwind-dashboard.git
cd northwind-dashboard
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

Create a production build with:

```bash
npm run build
```

Run the available checks with:

```bash
npm run typecheck
npm run lint
```

## Author

Nelson Emmanuel | Ravenick
