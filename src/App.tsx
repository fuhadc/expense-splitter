import { useState, useEffect } from 'react';
import { Home, PlusCircle, BarChart3 } from 'lucide-react';
import type { Expense, Screen } from './types';
import { loadExpenses, addExpense, updateExpense, deleteExpense } from './utils/storage';
import { HomeScreen } from './components/HomeScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { ExpenseModal } from './components/ExpenseModal';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Load expenses on mount
  useEffect(() => {
    const loaded = loadExpenses();
    setExpenses(loaded);
  }, []);

  const handleAddExpense = (date: string) => {
    setSelectedDate(date);
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedDate(expense.date);
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleSaveExpense = (expense: Expense) => {
    if (editingExpense) {
      const updated = updateExpense(expense);
      setExpenses(updated);
    } else {
      const updated = addExpense(expense);
      setExpenses(updated);
    }
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    const updated = deleteExpense(id);
    setExpenses(updated);
  };

  const handleOpenAddModal = () => {
    const today = new Date().toISOString().split('T')[0];
    handleAddExpense(today);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Desktop Header */}
      <header className="hidden md:block bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Expense Splitter</h1>
                <p className="text-sm text-gray-600">Track & split expenses with ease</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  currentScreen === 'home'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-all"
              >
                <PlusCircle className="w-5 h-5" />
                Add
              </button>
              <button
                onClick={() => setCurrentScreen('summary')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  currentScreen === 'summary'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Summary
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Expense Splitter</h1>
            <p className="text-sm opacity-90">
              {currentScreen === 'home' ? 'Home' : currentScreen === 'summary' ? 'Summary' : 'Add'}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {currentScreen === 'home' && (
          <HomeScreen
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
        {currentScreen === 'summary' && <SummaryScreen expenses={expenses} />}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 gap-1 px-2 py-2">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${
              currentScreen === 'home'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className={`w-6 h-6 ${currentScreen === 'home' ? 'stroke-[2.5]' : ''}`} />
            <span className={`text-xs mt-1 ${currentScreen === 'home' ? 'font-semibold' : ''}`}>
              Home
            </span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex flex-col items-center justify-center py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
          >
            <div className="w-12 h-12 -mt-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <PlusCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs mt-1">Add</span>
          </button>

          <button
            onClick={() => setCurrentScreen('summary')}
            className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${
              currentScreen === 'summary'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className={`w-6 h-6 ${currentScreen === 'summary' ? 'stroke-[2.5]' : ''}`} />
            <span className={`text-xs mt-1 ${currentScreen === 'summary' ? 'font-semibold' : ''}`}>
              Summary
            </span>
          </button>
        </div>
      </nav>

      {/* Expense Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleSaveExpense}
        selectedDate={selectedDate}
        editExpense={editingExpense}
      />
    </div>
  );
}

export default App;
