import React, { useState } from "react";
import { LuArrowRight, LuFilter, LuCalendar, LuWallet, LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Filter transactions based on active filter
  const filteredTransactions = transactions?.filter(transaction => {
    if (activeFilter === "all") return true;
    return transaction.type === activeFilter;
  }) || [];

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    }
    return 0;
  });

  // Get recent transactions (last 5)
  const recentTransactions = sortedTransactions.slice(0, 5);

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const filterOptions = [
    { id: "all", label: "All", icon: LuWallet },
    { id: "income", label: "Income", icon: LuTrendingUp },
    { id: "expense", label: "Expense", icon: LuTrendingDown }
  ];

  const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "amount", label: "Highest Amount" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuWallet className="text-blue-500" />
            Recent Transactions
          </h2>
          <p className="text-sm text-gray-500 mt-1">Latest financial activities</p>
        </div>
        
        <button
          onClick={onSeeMore}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors group text-sm font-medium"
        >
          View All
          <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          <LuFilter className="w-4 h-4 text-gray-400" />
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filterOptions.map(option => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`flex items-center gap-2 px-3 py-1 text-xs rounded-md transition-colors ${
                    activeFilter === option.id
                      ? 'bg-white text-blue-600 shadow-sm font-medium'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <IconComponent className="w-3 h-3" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-1">
            <LuTrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-xs text-green-700 font-medium">Income</span>
          </div>
          <p className="text-lg font-bold text-green-800">
            ₹{totalIncome.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <div className="flex items-center gap-2 mb-1">
            <LuTrendingDown className="w-3 h-3 text-red-600" />
            <span className="text-xs text-red-700 font-medium">Expenses</span>
          </div>
          <p className="text-lg font-bold text-red-800">
            ₹{totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction, index) => (
            <div
              key={transaction._id}
              className="transform transition-all duration-200 hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TransactionInfoCard
                title={transaction.type === 'expense' ? transaction.catagory : transaction.source}
                icon={transaction.icon}
                date={moment(transaction.date).format("MMM Do, YYYY")}
                amount={transaction.amount}
                type={transaction.type}
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <LuWallet className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">
              No {activeFilter !== "all" ? activeFilter : ""} transactions found
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {activeFilter !== "all" ? "Try viewing all transactions" : "Add your first transaction to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      {recentTransactions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">
              Showing {recentTransactions.length} of {filteredTransactions.length} transactions
            </span>
            <span className="font-medium text-gray-700">
              Net: <span className={totalIncome - totalExpense >= 0 ? "text-green-600" : "text-red-600"}>
                {totalIncome - totalExpense >= 0 ? "+" : ""}₹{Math.abs(totalIncome - totalExpense).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {recentTransactions.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="text-blue-600 font-semibold">{recentTransactions.length}</div>
            <div className="text-gray-600">Transactions</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <div className="text-purple-600 font-semibold">
              {new Set(recentTransactions.map(t => t.type === 'expense' ? t.catagory : t.source)).size}
            </div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;