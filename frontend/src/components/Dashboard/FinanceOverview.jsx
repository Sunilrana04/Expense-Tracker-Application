import React, { useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { LuWallet, LuTrendingUp, LuTrendingDown, LuInfo } from "react-icons/lu";

const COLORS = ["#8B5CF6", "#10B981", "#EF4444"]; // Purple, Green, Red

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const [activeMetric, setActiveMetric] = useState("balance");
  
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense },
  ];

  // Calculate percentages
  const total = totalIncome + totalExpense;
  const incomePercentage = totalIncome > 0 ? Math.round((totalIncome / total) * 100) : 0;
  const expensePercentage = totalExpense > 0 ? Math.round((totalExpense / total) * 100) : 0;
  const netFlow = totalIncome - totalExpense;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuWallet className="text-purple-600" />
            Financial Overview
          </h2>
          <p className="text-sm text-gray-500 mt-1">Complete financial snapshot</p>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <LuInfo className="w-4 h-4" />
          <span className="text-xs">Updated</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div 
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeMetric === "balance" 
              ? "border-purple-300 bg-purple-50" 
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveMetric("balance")}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-xs font-medium text-gray-700">Balance</span>
          </div>
          <p className="text-lg font-bold text-gray-800 mt-1">₹{totalBalance.toLocaleString()}</p>
        </div>

        <div 
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeMetric === "income" 
              ? "border-green-300 bg-green-50" 
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveMetric("income")}
        >
          <div className="flex items-center gap-2">
            <LuTrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs font-medium text-gray-700">Income</span>
          </div>
          <p className="text-lg font-bold text-gray-800 mt-1">₹{totalIncome.toLocaleString()}</p>
        </div>

        <div 
          className={`p-3 rounded-lg border transition-all cursor-pointer ${
            activeMetric === "expense" 
              ? "border-red-300 bg-red-50" 
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
          onClick={() => setActiveMetric("expense")}
        >
          <div className="flex items-center gap-2">
            <LuTrendingDown className="w-3 h-3 text-red-500" />
            <span className="text-xs font-medium text-gray-700">Expenses</span>
          </div>
          <p className="text-lg font-bold text-gray-800 mt-1">₹{totalExpense.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <CustomPieChart
          data={balanceData}
          label="Total"
          totalAmount={`₹${totalBalance.toLocaleString()}`}
          colors={COLORS}
          showTextAnchor
          title="Financial Distribution"
        />
      </div>

      {/* Financial Insights */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Financial Insights</h4>
        
        <div className="space-y-3">
          {/* Income vs Expense Ratio */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">Income vs Expenses</span>
              <span className="text-xs font-medium text-gray-700">
                {incomePercentage}% / {expensePercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${incomePercentage}%` }}
              ></div>
              <div 
                className="bg-red-500 h-2 rounded-full -mt-2" 
                style={{ width: `${expensePercentage}%`, marginLeft: `${incomePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Net Cash Flow */}
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Net Cash Flow</span>
            <span className={`text-sm font-semibold ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netFlow >= 0 ? '+' : ''}₹{Math.abs(netFlow).toLocaleString()}
            </span>
          </div>

          {/* Savings Rate */}
          {totalIncome > 0 && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Savings Rate</span>
              <span className="text-sm font-semibold text-purple-600">
                {Math.round((netFlow / totalIncome) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-blue-600 font-semibold">₹{totalIncome.toLocaleString()}</div>
          <div className="text-gray-600">Total Income</div>
        </div>
        <div className="text-center p-2 bg-orange-50 rounded">
          <div className="text-orange-600 font-semibold">₹{totalExpense.toLocaleString()}</div>
          <div className="text-gray-600">Total Expenses</div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;