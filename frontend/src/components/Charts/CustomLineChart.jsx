import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

const CustomLineChart = ({ data, title = "Financial Trend", subtitle = "Monthly performance overview" }) => {
  
  // Custom tooltip with modern design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      const label = dataItem.category || dataItem.month || 'Period';
      
      return (
        <div className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <p className="text-sm font-semibold text-gray-800">{label}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ${payload[0].value.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">amount</span>
          </div>
          {payload.length > 1 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">Comparison data available</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom axis tick
  const CustomAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle" 
          fill="#6B7280"
          className="text-xs font-medium"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Calculate min and max for better YAxis scaling
  const getYAxisDomain = () => {
    const values = data.map(item => item.amount);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return [min * 0.8, max * 1.2];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Chart container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <defs>
              {/* Main gradient */}
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.1} />
              </linearGradient>
              
              {/* Secondary gradient for depth */}
              <linearGradient id="incomeGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#5B21B6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#F3F4F6" 
              vertical={false} 
            />
            
            <XAxis
              dataKey="month"
              tick={<CustomAxisTick />}
              stroke="#E5E7EB"
              axisLine={false}
            />
            
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              stroke="#E5E7EB"
              axisLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={getYAxisDomain()}
            />
            
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ 
                stroke: '#8B5CF6', 
                strokeWidth: 1, 
                strokeDasharray: '3 3' 
              }} 
            />
            
            {/* Main area with gradient */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="url(#incomeGradientDark)"
              strokeWidth={3}
              fill="url(#incomeGradient)"
              activeDot={{ 
                r: 6, 
                fill: '#8B5CF6', 
                stroke: '#FFFFFF', 
                strokeWidth: 2,
                style: { filter: 'drop-shadow(0px 2px 4px rgba(139, 92, 246, 0.3))' }
              }}
              dot={{ 
                r: 3, 
                fill: '#8B5CF6', 
                stroke: '#FFFFFF', 
                strokeWidth: 1 
              }}
            />
            
            {/* Additional line for depth */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="transparent"
              fill="url(#incomeGradientDark)"
              strokeWidth={0}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Chart footer with stats */}
        {data.length > 0 && (
          <div className="flex justify-between items-center mt-4 px-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-indigo-600"></div>
              <span>Trend Line</span>
            </div>
            
            <div className="text-xs text-gray-500">
              {data.length} periods shown
            </div>
          </div>
        )}
      </div>

      {/* Performance indicators */}
      {data.length > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Lowest</p>
              <p className="text-lg font-semibold text-gray-800">
                ${Math.min(...data.map(item => item.amount)).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Highest</p>
              <p className="text-lg font-semibold text-gray-800">
                ${Math.max(...data.map(item => item.amount)).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomLineChart;