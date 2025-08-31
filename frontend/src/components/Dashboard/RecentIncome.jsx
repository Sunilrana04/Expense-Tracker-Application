import React, { useState } from "react";
import { LuArrowRight, LuTrendingUp, LuPlus, LuCalendar, LuFilter } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentIncome = ({ transactions, onSeeMore, onAddIncome }) => {
  const [activeFilter, setActiveFilter] = useState("recent");
  
  // Calculate total income
  const totalIncome = transactions?.reduce((sum, income) => sum + income.amount, 0) || 0;
  
  // Filter transactions based on active filter
  const filteredTransactions = transactions?.filter(income => {
    const incomeDate = moment(income.date);
    const now = moment();
    
    switch (activeFilter) {
      case "today":
        return incomeDate.isSame(now, 'day');
      case "week":
        return incomeDate.isSame(now, 'week');
      case "month":
        return incomeDate.isSame(now, 'month');
      default:
        return true;
    }
  }).slice(0, 5) || [];

  const filterOptions = [
    { id: "recent", label: "Recent" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" }
  ];

  // Get top income source
  const topIncomeSource = transactions?.length > 0 
    ? transactions.reduce((max, income) => income.amount > max.amount ? income : max, transactions[0])
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuTrendingUp className="text-green-500" />
            Recent Income
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: <span className="font-medium text-green-600">₹{totalIncome.toLocaleString()}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {onAddIncome && (
            <button
              onClick={onAddIncome}
              className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
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

      {/* Filter Options */}
      <div className="flex items-center gap-2 mb-6">
        <LuFilter className="w-4 h-4 text-gray-400" />
        <div className="flex bg-gray-100 rounded-lg p-1">
          {filterOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                activeFilter === option.id
                  ? 'bg-white text-green-600 shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Income Statistics */}
      {transactions?.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 font-medium">Total Transactions</p>
            <p className="text-lg font-bold text-blue-800">{transactions.length}</p>
          </div>
          {topIncomeSource && (
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <p className="text-xs text-purple-600 font-medium">Top Source</p>
              <p className="text-sm font-bold text-purple-800 truncate">{topIncomeSource.source}</p>
              <p className="text-xs text-purple-600">₹{topIncomeSource.amount.toLocaleString()}</p>
            </div>
          )}
        </div>
      )}

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((income, index) => (
            <div
              key={income._id}
              className="transform transition-all duration-200 hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TransactionInfoCard
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("MMM Do, YYYY")}
                amount={income.amount}
                type="income"
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <LuTrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              No {activeFilter !== "recent" ? activeFilter : ""} income found
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {activeFilter !== "recent" ? "Try viewing all income or add a new one" : "Add your first income to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              Showing {filteredTransactions.length} of {transactions?.length || 0} transactions
            </span>
            <span className="font-medium text-green-600">
              ₹{filteredTransactions.reduce((sum, income) => sum + income.amount, 0).toLocaleString()} total
            </span>
          </div>
        </div>
      )}

      {/* Quick Insights */}
      {transactions?.length >= 3 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
          <p className="text-xs font-medium text-green-700 mb-1">💰 Income Insight</p>
          <p className="text-sm text-green-800">
            You've received income from {new Set(transactions.map(t => t.source)).size} different sources
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentIncome;