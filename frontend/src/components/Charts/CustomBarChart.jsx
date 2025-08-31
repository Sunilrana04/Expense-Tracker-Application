import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";

const CustomBarChart = ({ data, title = "Financial Overview", subtitle = "Monthly data visualization" }) => {
  // Generate gradient colors for bars
  const getBarColor = (index) => {
    const colors = [
      'url(#gradientPurple)', 
      'url(#gradientBlue)', 
      'url(#gradientGreen)',
      'url(#gradientOrange)',
      'url(#gradientPink)',
      'url(#gradientTeal)'
    ];
    return colors[index % colors.length];
  };

  // Custom tooltip with modern design
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0].payload;
      const label = dataItem.catagory || dataItem.month || dataItem.source || 'Item';
      
      return (
        <div className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <p className="text-sm font-semibold text-gray-800">{label}</p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{payload[0].value.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">amount</span>
          </div>
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
          {payload.value.length > 10 ? payload.value.substring(0, 8) + '...' : payload.value}
        </text>
      </g>
    );
  };

  // Custom bar label
  const renderCustomBarLabel = ({ x, y, width, value }) => {
    if (value > 0) {
      return (
        <text 
          x={x + width / 2} 
          y={y - 5} 
          fill="#4B5563" 
          textAnchor="middle" 
          className="text-xs font-medium"
        >
          ₹{value.toLocaleString()}
        </text>
      );
    }
    return null;
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
        {/* SVG Gradients Definition */}
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="gradientPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="gradientGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="gradientOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="gradientPink" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="gradientTeal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>
        </svg>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#F3F4F6" 
              vertical={false} 
            />
            
            <XAxis
              dataKey={
                data.length > 0
                  ? (data[0].catagory ? "catagory" : data[0].month ? "month" : "source")
                  : "catagory"
              }
              tick={<CustomAxisTick />}
              stroke="#E5E7EB"
            />
            
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              stroke="#E5E7EB"
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F9FAFB' }} />
            
            <Bar
              dataKey="amount"
              radius={[6, 6, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={getBarColor(index)} 
                  strokeWidth={0}
                />
              ))}
              <LabelList dataKey="amount" content={renderCustomBarLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Chart footer */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <span>Financial Data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBarChart;