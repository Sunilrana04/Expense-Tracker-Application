import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';

import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import InfoCard from '../../components/Cards/InfoCard';
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from '../../utils/helper';
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import { FiRefreshCw } from "react-icons/fi";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
        console.log("✅ Dashboard Data:", response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50"
          >
            <FiRefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <InfoCard
            icon={<IoMdCard className="h-6 w-6" />}
            label="Total Balance"
            value={`₹${addThousandsSeparator(dashboardData?.totalBalance || 0)}`}
            color="from-blue-500 to-blue-600"
            loading={loading}
          />

          <InfoCard
            icon={<LuWalletMinimal className="h-6 w-6" />}
            label="Total Income"
            value={`₹${addThousandsSeparator(dashboardData?.totalIncome || 0)}`}
            color="from-green-500 to-green-600"
            loading={loading}
          />

          <InfoCard
            icon={<LuHandCoins className="h-6 w-6" />}
            label="Total Expense"
            value={`₹${addThousandsSeparator(dashboardData?.totalExpense || 0)}`}
            color="from-red-500 to-red-600"
            loading={loading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Finance Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Overview</h2>
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                <button 
                  onClick={() => navigate("/expense")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
            </div>

            {/* Recent Income */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Income</h2>
                <button 
                  onClick={() => navigate("/income")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All
                </button>
              </div>
              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Income with Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Income Overview</h2>
              <RecentIncomeWithChart
                data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
                totalIncome={dashboardData?.totalIncome || 0}
              />
            </div>

            {/* Last 30 Days Expenses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expenses</h2>
              <Last30DaysExpenses
                data={dashboardData?.last30DaysExpense?.transactions || []}
              />
            </div>

            {/* Expense Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Expense Breakdown</h2>
                <button 
                  onClick={() => navigate("/expense")}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
              </div>
              <ExpenseTransactions
                transactions={dashboardData?.last30DaysExpense?.transactions || []}
                onSeeMore={() => navigate("/expense")}
              />
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
              <FiRefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-gray-700 font-medium">Loading dashboard data...</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;