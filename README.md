# 💰 Expense Splitter & Tracker

A beautiful, mobile-first expense tracking and splitting app built with React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

- **📅 Calendar View**: Monthly calendar with expense indicators
- **👥 Two-Person Splitting**: Track expenses between Person A and Person B
- **💳 Expense Types**: Support for both individual and shared expenses
- **📊 Analytics Dashboard**: 
  - Balance calculation showing who owes whom
  - Pie chart for spending distribution
  - Bar chart for monthly trends (last 6 months)
  - Quick stats overview
- **💾 Data Persistence**: All data stored in localStorage
- **📱 Responsive Design**: Beautiful UI on mobile and desktop
- **🎨 Modern UI**: Gradient backgrounds, smooth animations, and polished interactions
- **📥 Export**: Download expenses as JSON

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

### Adding an Expense

1. **From Calendar**: 
   - Navigate to the Home screen
   - Tap any date on the calendar
   - Click the + button
   - Fill in the expense details

2. **From Navigation**:
   - Click the "Add" button in the navigation
   - Fill in the expense details

### Expense Details

- **Title**: Name of the expense (e.g., "Groceries", "Dinner")
- **Amount**: Cost in dollars (e.g., 45.99)
- **Paid By**: Choose Person A or Person B
- **Type**: 
  - **Shared**: Cost split equally between both people
  - **Individual**: Personal expense for one person only
- **Note**: Optional description

### Viewing Summary

Navigate to the Summary screen to see:

- **Balance Status**: Shows who owes whom and how much
- **Total Spending**: Individual and shared expense totals
- **Charts**: Visual representation of spending patterns
- **Quick Stats**: Overview of all expenses

### Settling Up

1. Go to Summary screen
2. Click "Settle Up" button
3. Confirm the settlement

## 🏗️ Project Structure

```
expense-splitter/
├── src/
│   ├── components/
│   │   ├── ExpenseModal.tsx      # Add/Edit expense form
│   │   ├── ExpenseCard.tsx       # Individual expense display
│   │   ├── HomeScreen.tsx        # Calendar + expense list
│   │   └── SummaryScreen.tsx     # Analytics dashboard
│   ├── utils/
│   │   ├── storage.ts            # localStorage utilities
│   │   └── calculations.ts       # Balance & chart calculations
│   ├── types.ts                  # TypeScript interfaces
│   ├── App.tsx                   # Main app with navigation
│   ├── main.tsx                  # React entry point
│   └── index.css                 # Global styles + animations
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **react-calendar** - Calendar component
- **recharts** - Charts and analytics
- **lucide-react** - Beautiful icons
- **uuid** - Unique ID generation

## 💡 Key Features Explained

### Balance Calculation

For shared expenses, the app calculates how much each person should contribute (50/50 split) and determines who owes whom based on who paid for what.

### Data Storage

All expenses are stored in browser's localStorage under the key "expenses". Data persists across sessions and survives page refreshes.

### Responsive Design

- **Mobile**: Bottom navigation bar with centered floating + button
- **Desktop**: Top header with horizontal navigation
- All components adapt beautifully to different screen sizes

## 🎨 Design Highlights

- Gradient backgrounds (blue → purple → pink)
- Smooth animations and transitions
- Color-coded users (Person A: Blue, Person B: Purple)
- Type badges (Shared: Green, Individual: Orange)
- Custom calendar styling with expense indicators
- Modern card-based layout
- Custom scrollbars

## 📱 Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## 🔒 Privacy

All data is stored locally in your browser. No data is sent to any server or third party.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Built with ❤️ using React + TypeScript + Tailwind CSS
