import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { LuTrendingUp, LuCalendar, LuInfo } from "react-icons/lu";
import { MdPieChart } from "react-icons/md"; // ✅ Fixed import

const COLORS = ["#8B5CF6", "#10B981", "#EF4444", "#3B82F6", "#F59E0B", "#EC4899"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [activeView, setActiveView] = useState('chart');
  const [selectedSource, setSelectedSource] = useState(null);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
      percentage: totalIncome > 0 ? Math.round((item.amount / totalIncome) * 100) : 0
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data, totalIncome]);

  // Get top income sources for list view
  const topSources = [...chartData].sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <LuTrendingUp className="text-green-500" />
            Income Sources
          </h2>
          <p className="text-sm text-gray-500 mt-1">Last 60 days analysis</p>
        </div>
        
        <div className="flex items-center gap-1 text-gray-400">
          <LuInfo className="w-4 h-4" />
          <span className="text-xs">Updated</span>
        </div>
      </div>

      {/* Total Income Summary */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Total Income</p>
            <p className="text-2xl font-bold text-green-800">
              ₹{totalIncome?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <LuCalendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-xs text-green-600 mt-2">Last 60 days performance</p>
      </div>

      {/* View Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveView('chart')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
            activeView === 'chart'
              ? 'bg-white text-green-600 shadow-sm font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MdPieChart className="w-4 h-4" /> {/* ✅ Fixed icon */}
          Chart View
        </button>
        <button
          onClick={() => setActiveView('list')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
            activeView === 'list'
              ? 'bg-white text-green-600 shadow-sm font-medium'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <LuTrendingUp className="w-4 h-4" />
          List View
        </button>
      </div>

      {/* Content based on active view */}
      {activeView === 'chart' ? (
        /* Chart View */
        <div className="relative">
          <CustomPieChart
            data={chartData}
            label="Total"
            totalAmount={`₹${totalIncome?.toLocaleString() || '0'}`}
            showTextAnchor
            colors={COLORS}
            title="Income Distribution"
          />
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {topSources.length > 0 ? (
            topSources.map((source, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedSource === index
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSource(selectedSource === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{source.name}</p>
                    <p className="text-xs text-gray-500">{source.percentage}% of total</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-green-700">
                  ₹{source.amount.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <LuTrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">No income data available</p>
            </div>
          )}
        </div>
      )}

      {/* Insights Section */}
      {chartData.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Income Insights</h4>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            {/* Top Source */}
            {topSources.length > 0 && (
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-blue-600">Top Source</span>
                <span className="font-medium text-blue-800">{topSources[0].name}</span>
              </div>
            )}
            
            {/* Source Count */}
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
              <span className="text-purple-600">Income Sources</span>
              <span className="font-medium text-purple-800">{chartData.length}</span>
            </div>
            
            {/* Average per Source */}
            {totalIncome > 0 && (
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-green-600">Avg per Source</span>
                <span className="font-medium text-green-800">
                  ₹{Math.round(totalIncome / chartData.length).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-green-600 font-semibold">{chartData.length}</div>
          <div className="text-gray-600">Sources</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-blue-600 font-semibold">
            {topSources.length > 0 ? topSources[0].percentage : 0}%
          </div>
          <div className="text-gray-600">Top Source</div>
        </div>
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;
