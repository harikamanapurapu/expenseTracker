import React, { useState, useEffect } from "react";

const CreateExpenses = ({ addExpense, setShowCreateexpenseForm, editedExpense, setEditedExpense, updateExpense }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Health");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Check if there's an editedExpense provided and populate the form fields
    if (editedExpense) {
      setName(editedExpense.name);
      setDate(editedExpense.date);
      setCategory(editedExpense.category);
      setDescription(editedExpense.description);
      setAmount(editedExpense.amount.toString());
    } else {
      // If there's no editedExpense, reset the form fields to empty when creating a new expense
      setName("");
      setDate("");
      setCategory("Health");
      setDescription("");
      setAmount("");
    }
  }, [editedExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = {
      id: editedExpense ? editedExpense.id : Date.now(), // Set an id for new expenses
      name,
      date,
      category,
      description,
      amount: parseInt(amount),
      updatedAt: "", // You can set the updated timestamp here if needed
      createdBy: "me", // For simplicity, assuming it's always the current user
    };

    if (editedExpense) {
      // Update existing expense
      updateExpense(updatedExpense);
    } else {
      // Add new expense
      addExpense(updatedExpense);
    }
    setShowCreateexpenseForm(false);
    // Clear form fields after submission
    setName("");
    setDate("");
    setCategory("Health");
    setDescription("");
    setAmount("");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4">Create Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-1">Name:</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={140}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Date of Expense:</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Category:</label>
          <select
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Health">Health</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Books">Books</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Description:</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Amount:</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          Create Expense
        </button>
      </form>
    </div>
  );
};

export default CreateExpenses;
