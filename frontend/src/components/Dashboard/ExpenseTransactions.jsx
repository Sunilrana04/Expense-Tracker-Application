import { LuArrowRight, LuTrendingDown, LuPlus } from "react-icons/lu";
import moment from "moment";
import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore, onAddExpense }) => {
  // Calculate total expenses
  const totalExpenses = transactions?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
  
  // Get recent expenses (last 5)
  const recentExpenses = transactions?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuTrendingDown className="text-red-500" />
            Recent Expenses
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-medium text-red-600">₹{totalExpenses.toLocaleString()}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {onAddExpense && (
            <button
              onClick={onAddExpense}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <LuPlus className="w-4 h-4" />
              Add
            </button>
          )}
          
          <button
            onClick={onSeeMore}
            className="flex items-center gap-1 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors group text-sm font-medium"
          >
            View All
            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, index) => (
            <div
              key={expense._id}
              className="transform transition-all duration-200 hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TransactionInfoCard
                title={expense.catagory}
                icon={expense.icon}
                date={moment(expense.date).format("MMM Do, YYYY")}
                amount={expense.amount}
                type="expense"
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <LuTrendingDown className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">No expenses recorded yet</p>
            <p className="text-gray-400 text-xs mt-1">Add your first expense to get started</p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {recentExpenses.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Showing {recentExpenses.length} of {transactions?.length || 0} expenses</span>
            <span className="font-medium text-red-600">
              ₹{recentExpenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString()} total
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTransactions;