import React, { useState, useEffect } from 'react';
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";
import { LuCalendar, LuTrendingDown, LuFilter, LuDownload } from "react-icons/lu";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('30days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [data]);

  // Calculate total expenses for the period
  const totalExpenses = chartData.reduce((sum, item) => sum + item.amount, 0);
  
  // Find the day with highest spending
  const highestSpendingDay = chartData.length > 0 
    ? chartData.reduce((max, item) => item.amount > max.amount ? item : max, chartData[0])
    : null;

  const filterOptions = [
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' },
    { id: '90days', label: '90 Days' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuTrendingDown className="text-red-500" />
            Spending Trends
          </h2>
          <p className="text-sm text-gray-500 mt-1">Last 30 days expense analysis</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Filter Options */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {filterOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  activeFilter === option.id
                    ? 'bg-white text-red-600 shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {/* Export Button */}
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
            <LuDownload className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <LuCalendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">
            ₹{totalExpenses.toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 mt-1">Last 30 days</p>
        </div>
        
        {highestSpendingDay && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <LuTrendingDown className="w-4 h-4 text-red-600" />
              <span className="text-xs font-medium text-red-700">Peak Spending</span>
            </div>
            <p className="text-lg font-bold text-red-800">
              ₹{highestSpendingDay.amount.toLocaleString()}
            </p>
            <p className="text-xs text-red-600 mt-1 capitalize">
              {highestSpendingDay.catagory || highestSpendingDay.month}
            </p>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          <>
            <CustomBarChart 
              data={chartData} 
              title="Daily Expenses"
              subtitle="Last 30 days spending pattern"
            />
            
            {/* Insights */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Spending Insights</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="text-gray-600">Average daily spending</p>
                    <p className="font-semibold text-gray-800">
                      ₹{Math.round(totalExpenses / chartData.length).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-gray-600">Days tracked</p>
                    <p className="font-semibold text-gray-800">
                      {chartData.length} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-80 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuTrendingDown className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No spending data</h3>
            <p className="text-sm text-gray-500">Start tracking your expenses to see insights</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {chartData.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
            View detailed report
            <LuTrendingDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;