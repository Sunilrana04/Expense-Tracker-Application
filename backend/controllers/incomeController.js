
const Income = require("../models/Income");
const xlsx = require('xlsx');

// Add income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();

    res.status(200).json(newIncome);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All income
exports.getAllIncome = async (req, res) => {

    const  userId=req.user.id;
    try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income source
exports.deleteIncome = async (req, res) => {
     
  

  try {
    await Income.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Income in excel
exports.downloadIncomeExcel = async (req, res) => {
const userId = req.user.id;

  try {
    // Fetch all income entries of the logged-in user
    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    // Create a new workbook and worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Append worksheet to workbook
    xlsx.utils.book_append_sheet(wb, ws, "Income");

    // Write file to disk
    
    xlsx.writeFile(wb, 'income_details.xlsx');

    // Send file to client for download
    res.download('income_details.xlsx');
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

};
