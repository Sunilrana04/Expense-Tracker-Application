import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {

  const getTypeStyles = () => {
    if (type === "income") {
      return {
        bg: "bg-green-500/5",
        text: "text-green-700",
        border: "border-green-200",
        icon: <LuTrendingUp size={16} className="text-green-600" />
      };
    } else {
      return {
        bg: "bg-red-500/5",
        text: "text-red-700",
        border: "border-red-200",
        icon: <LuTrendingDown size={16} className="text-red-600" />
      };
    }
  };

  const styles = getTypeStyles();

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`group relative flex items-center p-4 rounded-2xl ${styles.bg} border ${styles.border} transition-all duration-300 hover:shadow-lg`}>
      
      {/* Type indicator bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${type === 'income' ? 'bg-green-400' : 'bg-red-400'}`}></div>
      
      <div className="flex items-center justify-between w-full pl-3">
        {/* Left Content */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl ${type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} group-hover:scale-110 transition-transform duration-300`}>
            {icon ? (
              <img src={icon} alt={title} className="w-5 h-5 object-contain" />
            ) : (
              <LuUtensils size={18} />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {title}
            </p>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              {formatDate(date)}
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex items-center gap-3 ml-4">
          {/* Amount */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white ${styles.text} font-semibold text-sm shadow-sm`}>
            {styles.icon}
            <span>{type === "income" ? "+" : "-"} ₹{amount}</span>
          </div>

          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
              aria-label="Delete transaction"
            >
              <LuTrash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;