import React from 'react';

const InfoCard = ({ icon, label, value, color, loading = false }) => {
  return (
    <div className="group relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Subtle background accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 opacity-5 ${color} rounded-full -translate-y-1/3 translate-x-1/3`}></div>
      
      <div className="flex items-center gap-5">
        {/* Icon container with modern gradient */}
        <div
          className={`flex-shrink-0 w-14 h-14 flex items-center justify-center text-2xl text-white rounded-xl ${color} shadow-lg group-hover:scale-105 transition-transform duration-300`}
        >
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h6 className="text-sm font-medium text-gray-500 mb-1.5 tracking-wide uppercase">
            {label}
          </h6>
          
          {loading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          ) : (
            <span className="text-2xl font-bold text-gray-800 truncate block">
             {value}
            </span>
          )}
        </div>
      </div>
      
      {/* Subtle hover effect line */}
      <div className={`absolute bottom-0 left-0 w-0 h-1 ${color} group-hover:w-full transition-all duration-500 rounded-full`}></div>
    </div>
  );
};

export default InfoCard;