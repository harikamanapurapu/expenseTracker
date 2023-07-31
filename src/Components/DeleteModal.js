import React from "react";

const DeleteModal = ({ setShowDeletePrompt, confirmDeleteExpense, expenseToDelete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Are you sure you want to delete?</h1>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => {
              setShowDeletePrompt(false);
            }}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => {
              confirmDeleteExpense(expenseToDelete);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
