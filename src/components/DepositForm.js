import React, { useState } from 'react';

const DepositForm = ({ onDeposit, goals }) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedGoalId, setSelectedGoalId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (depositAmount && selectedGoalId) {
      onDeposit(selectedGoalId, parseFloat(depositAmount));
      setDepositAmount('');
      setSelectedGoalId('');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
      <h3 className="text-lg font-semibold mb-4">Make a Deposit</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select goal</option>
            {goals.map(goal => (
              <option key={goal.id} value={goal.id}>{goal.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!depositAmount || !selectedGoalId}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Make Deposit
        </button>
      </div>
    </div>
  );
};

export default DepositForm;