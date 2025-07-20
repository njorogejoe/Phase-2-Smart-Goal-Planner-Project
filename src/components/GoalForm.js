import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const GoalForm = ({ onAddGoal, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.targetAmount && formData.category && formData.deadline) {
      const goalData = {
        name: formData.name,
        targetAmount: parseFloat(formData.targetAmount),
        category: formData.category,
        deadline: formData.deadline
      };
      onAddGoal(goalData);
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
      <h3 className="text-lg font-semibold mb-4">Add New Goal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Goal name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Target amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
          min="0"
          step="0.01"
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Electronics">Electronics</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Home">Home</option>
          <option value="Retirement">Retirement</option>
        </select>
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 col-span-full">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-500 transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalForm;