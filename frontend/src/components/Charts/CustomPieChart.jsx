import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Custom Tooltip with modern design
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = ((data.amount / data.total) * 100).toFixed(1);
    
    return (
      <div className="bg-white shadow-xl rounded-xl p-4 border border-gray-100 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: payload[0].color }}
          ></div>
          <p className="text-sm font-semibold text-gray-800">{data.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-bold text-gray-900">
            ${data.amount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            {percentage}% of total
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Legend with improved design
const CustomLegend = ({ payload, onHover, hoveredIndex }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          className="flex items-center gap-2 p-2 rounded-lg transition-all duration-200"
          style={{
            backgroundColor: hoveredIndex === index ? `${entry.color}15` : 'transparent',
            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
          }}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
        >
          <div
            className="w-4 h-4 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
          <span className="text-xs text-gray-500">
            ({((entry.payload.amount / entry.payload.total) * 100).toFixed(1)}%)
          </span>
        </div>
      ))}
    </div>
  );
};

const CustomPieChart = ({
  data,
  label = "Total",
  totalAmount,
  colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"],
  showTextAnchor = true,
  title = "Distribution Overview"
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-80">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Calculate total if not provided
  const calculatedTotal = totalAmount || data.reduce((sum, item) => sum + item.amount, 0);
  
  // Enhance data with total for percentage calculations
  const enhancedData = data.map(item => ({
    ...item,
    total: calculatedTotal
  }));

  const onPieEnter = (_, index) => {
    setHoveredIndex(index);
  };

  const onPieLeave = () => {
    setHoveredIndex(null);
  };

  const onPieClick = (_, index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {showTextAnchor && (
          <p className="text-sm text-gray-500">Breakdown by category</p>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <defs>
            {colors.map((color, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={enhancedData}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={hoveredIndex !== null ? 110 : 100}
            innerRadius={70}
            labelLine={false}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            onClick={onPieClick}
            animationDuration={500}
            startAngle={90}
            endAngle={-270}
          >
            {enhancedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index % colors.length})`}
                stroke="#FFFFFF"
                strokeWidth={2}
                opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                style={{
                  filter: hoveredIndex === index ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.15))' : 'none',
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          {showTextAnchor && (
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-center"
            >
              <tspan x="50%" dy="-0.5em" className="text-sm font-medium text-gray-600">
                {label}
              </tspan>
              <tspan x="50%" dy="1.2em" className="text-xl font-bold text-gray-800">
                ${calculatedTotal.toLocaleString()}
              </tspan>
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <Legend 
        content={<CustomLegend payload={enhancedData.map((item, index) => ({
          value: item.name,
          color: colors[index % colors.length],
          payload: item
        }))} onHover={setHoveredIndex} hoveredIndex={hoveredIndex} />} 
      />

      {/* Summary */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {enhancedData.length} categories • Total: ${calculatedTotal.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CustomPieChart;