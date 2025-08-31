
const Expense = require("../models/Expense");
const xlsx = require('xlsx');

// Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, catagory, amount, date } = req.body;

    // Validation: check for missing fields
    if (!catagory || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      catagory,
      amount,
      date: new Date(date),
    });

    await newExpense.save();

    res.status(200).json(newExpense);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Expense
exports.getAllExpense = async (req, res) => {

    const  userId=req.user.id;
    try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Expense source
exports.deleteExpense = async (req, res) => {
     
  

  try {
    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Expense in excel
exports.downloadExpenseExcel = async (req, res) => {
const userId = req.user.id;

  try {
    // Fetch all income entries of the logged-in user
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expense.map((item) => ({
      Catagory: item.catagory,
      Amount: item.amount,
      Date: item.date,
    }));

    // Create a new workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Append worksheet to workbook
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Write file to disk
    
    xlsx.writeFile(wb, 'expense_details.xlsx');

    // Send file to client for download
    res.download('expense_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

};
