import React from 'react';
import { Calendar, AlertTriangle, CheckCircle, Trash2, Edit2, Save, X } from 'lucide-react';

const GoalCard = ({ 
  goal, 
  editingGoal, 
  setEditingGoal, 
  onUpdateGoal, 
  onDeleteGoal,
  handleEditGoal,
  handleSaveEdit 
}) => {
  
  // Helper functions
  const getProgressPercentage = (saved, target) => {
    return Math.min((saved / target) * 100, 100);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (deadline, savedAmount, targetAmount) => {
    return getDaysRemaining(deadline) < 0 && savedAmount < targetAmount;
  };

  const isNearDeadline = (deadline, savedAmount, targetAmount) => {
    const daysRemaining = getDaysRemaining(deadline);
    return daysRemaining <= 30 && daysRemaining >= 0 && savedAmount < targetAmount;
  };

  const progressPercentage = getProgressPercentage(goal.savedAmount, goal.targetAmount);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const isComplete = goal.savedAmount >= goal.targetAmount;
  const nearDeadline = isNearDeadline(goal.deadline, goal.savedAmount, goal.targetAmount);
  const overdue = isOverdue(goal.deadline, goal.savedAmount, goal.targetAmount);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      {/* Goal Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {editingGoal && editingGoal.id === goal.id ? (
            <input
              type="text"
              value={editingGoal.name}
              onChange={(e) => setEditingGoal({...editingGoal, name: e.target.value})}
              className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            />
          ) : (
            <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
          )}
          <p className="text-sm text-gray-600">{goal.category}</p>
        </div>
        <div className="flex gap-2 ml-2">
          {editingGoal && editingGoal.id === goal.id ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="text-green-600 hover:text-green-700"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={() => setEditingGoal(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEditGoal(goal)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteGoal(goal.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      {isComplete && (
        <div className="flex items-center gap-2 mb-3 text-green-600">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Goal Completed!</span>
        </div>
      )}
      {overdue && (
        <div className="flex items-center gap-2 mb-3 text-red-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Overdue</span>
        </div>
      )}
      {nearDeadline && (
        <div className="flex items-center gap-2 mb-3 text-orange-600">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-medium">Deadline approaching</span>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>${goal.savedAmount.toLocaleString()} saved</span>
          <span>${goal.targetAmount.toLocaleString()} target</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              isComplete 
                ? 'bg-green-500' 
                : overdue 
                  ? 'bg-red-500' 
                  : nearDeadline 
                    ? 'bg-orange-500' 
                    : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{progressPercentage.toFixed(1)}% complete</span>
          <span>${(goal.targetAmount - goal.savedAmount).toLocaleString()} remaining</span>
        </div>
      </div>

      {/* Deadline */}
      <div className="text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
        </div>
        <div className="mt-1">
          {daysRemaining > 0 ? (
            <span>{daysRemaining} days remaining</span>
          ) : daysRemaining === 0 ? (
            <span className="text-orange-600 font-medium">Due today</span>
          ) : (
            <span className="text-red-600 font-medium">{Math.abs(daysRemaining)} days overdue</span>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editingGoal && editingGoal.id === goal.id && (
        <div className="mt-4 pt-4 border-t space-y-3">
          <input
            type="number"
            value={editingGoal.targetAmount}
            onChange={(e) => setEditingGoal({...editingGoal, targetAmount: parseFloat(e.target.value) || 0})}
            placeholder="Target amount"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={editingGoal.category}
            onChange={(e) => setEditingGoal({...editingGoal, category: e.target.value})}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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
            value={editingGoal.deadline}
            onChange={(e) => setEditingGoal({...editingGoal, deadline: e.target.value})}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default GoalCard;