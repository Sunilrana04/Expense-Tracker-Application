import React, { useEffect, useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Model from '../../components/layouts/Model';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { FiPlus, FiDownload, FiRefreshCw } from 'react-icons/fi';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // ✅ Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    setRefreshing(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log('Something went wrong. Please try again.', error);
      toast.error('Failed to load expense data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { catagory, amount, date, icon } = expense;

    // Validation
    if (!catagory.trim()) {
      toast.error('Category is required');
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0');
      return;
    }

    if (!date) {
      toast.error('Date is required');
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        catagory,
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success('Expense added successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error adding Expense',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to add expense');
    }
  };

  // ✅ Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success('Expense deleted successfully');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error deleting expense:',
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || 'Failed to delete expense');
    }
  };

  // ✅ Download Handler
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Expense report downloaded successfully');
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Expense Management</h1>
            <p className="text-gray-600 mt-1">Track and manage your expenses</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={fetchExpenseDetails}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700 disabled:opacity-50"
            >
              <FiRefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
            
            <button
              onClick={handleDownloadExpenseDetails}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-gray-700"
            >
              <FiDownload className="h-4 w-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
            
            <button
              onClick={() => setOpenAddExpenseModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-white"
            >
              <FiPlus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Expense</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Expense Overview Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Expense Overview</h2>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          {/* Expense List Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">All Expenses</h2>
              <p className="text-sm text-gray-600">{expenseData.length} expenses found</p>
            </div>
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
              loading={loading}
            />
          </div>
        </div>

        {/* Add Expense Modal */}
        <Model
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add New Expense"
          size="max-w-md"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Model>

        {/* Delete Confirmation Modal */}
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Confirm Deletion"
          size="max-w-md"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense? This action cannot be undone."
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Model>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-3">
              <FiRefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-gray-700 font-medium">Loading expense data...</span>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Expense;