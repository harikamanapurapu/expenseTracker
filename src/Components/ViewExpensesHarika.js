import React, { useState } from "react";
import CreateExpenses from "./CreateExpensesHarika";
import { useEffect } from "react";
import DeleteModal from "./DeleteModal";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState(localStorage.expensesData ? JSON.parse(localStorage.expensesData) : []);
  const [editedExpense, setEditedExpense] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [showExpensePopup, setShowExpensePopup] = useState(false);

  const handleEditExpense = (expense) => {
    setEditedExpense(expense);
    setShowExpensePopup(true);
  };

  const handleCreateExpense = () => {
    setEditedExpense(null);
    setShowExpensePopup(true);
  };

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setFilteredExpenses([...filteredExpenses, newExpense]);
  };

  const updateExpense = (updatedExpense) => {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
  
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? { ...updatedExpense, updatedAt: formattedDate } : expense
    );
  
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  useEffect(() => {
    localStorage.setItem("expensesData", JSON.stringify(expenses));
  }, [expenses]);

  const handleDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setShowDeletePrompt(true);
  };

  const confirmDeleteExpense = (expenseToDelete) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseToDelete.id);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    localStorage.setItem("expensesData", JSON.stringify(updatedExpenses));
    setShowDeletePrompt(false);
  };

  const handleSearch = () => {
    const filtered = expenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExpenses(filtered);
  };

  const handleFilterByDate = () => {
    const filtered = expenses.filter((expense) => expense.date === filterDate);
    setFilteredExpenses(filtered);
  };

  const handleResetFilters = () => {
    setFilteredExpenses(expenses);
    setSearchQuery("");
    setFilterDate("");
  };

  return (
    <div className="p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Track Your Expenses</h2>
      <div className="mb-4">
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2"
          type="text"
          value={searchQuery}
          placeholder="Search by expense name"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 my-2 bg-blue-500 text-white font-bold rounded-md ml-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="mb-4">
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 w-1/2"
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button
          className="px-4 py-2 my-2 bg-blue-500 text-white font-bold rounded-md ml-4"
          onClick={handleFilterByDate}
        >
          Filter
        </button>
      </div>

      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md mb-4"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-200 text-center">Name</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Category</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Date of Expense</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Amount</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Updated at</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Created by</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.name}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.category}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.date}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.amount}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.updatedAt}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{expense.createdBy === "me" ? "me" : "User's Email"}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">
                  <button
                    className="px-2 py-1 mr-5 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => {
                      handleEditExpense(expense);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                    onClick={() => {
                      handleDeleteExpense(expense);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleCreateExpense}
        >
          Create Expense
        </button>
      </div>
      {showExpensePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CreateExpenses
              setShowCreateexpenseForm={setShowExpensePopup}
              addExpense={addExpense}
              updateExpense={updateExpense}
              editedExpense={editedExpense}
            />
          </div>
        </div>
      )}
      {showDeletePrompt && (
        <DeleteModal
          setShowDeletePrompt={setShowDeletePrompt}
          confirmDeleteExpense={confirmDeleteExpense}
          expenseToDelete={expenseToDelete}
        />
      )}
    </div>
  );
};

export default ViewExpenses;
