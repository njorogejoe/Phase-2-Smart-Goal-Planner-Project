import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Target } from 'lucide-react';
import Overview from './Overview';
import GoalForm from './GoalForm';
import DepositForm from './DepositForm';
import GoalList from './GoalList';

const SmartGoalPlanner = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  
  const initialGoals = [
    {
      id: "1",
      name: "Travel Fund - Japan",
      targetAmount: 5000,
      savedAmount: 3200,
      category: "Travel",
      deadline: "2025-12-31",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 10000,
      savedAmount: 7500,
      category: "Emergency",
      deadline: "2026-06-30",
      createdAt: "2023-05-01"
    },
    {
      id: "3",
      name: "New Laptop",
      targetAmount: 1500,
      savedAmount: 1500,
      category: "Electronics",
      deadline: "2024-07-20",
      createdAt: "2024-03-10"
    },
    {
      id: "4",
      name: "Down Payment - House",
      targetAmount: 50000,
      savedAmount: 12000,
      category: "Real Estate",
      deadline: "2027-12-31",
      createdAt: "2024-02-01"
    },
    {
      id: "5",
      name: "Car Maintenance",
      targetAmount: 800,
      savedAmount: 600,
      category: "Vehicle",
      deadline: "2025-09-15",
      createdAt: "2024-06-01"
    },
    {
      id: "6",
      name: "Education Fund",
      targetAmount: 20000,
      savedAmount: 5000,
      category: "Education",
      deadline: "2028-01-01",
      createdAt: "2024-04-20"
    },
    {
      id: "7",
      name: "Holiday Gifts",
      targetAmount: 1000,
      savedAmount: 200,
      category: "Shopping",
      deadline: "2024-08-10",
      createdAt: "2024-07-01"
    },
    {
      id: "8",
      name: "New Phone",
      targetAmount: 1200,
      savedAmount: 0,
      category: "Electronics",
      deadline: "2025-01-31",
      createdAt: "2024-07-10"
    }
  ];

  const initialGoalsRef = useRef(initialGoals);

  // Fetch goals from json-server or fallback to initialGoals
  const fetchGoals = useCallback(async () => {
  try {
    setLoading(true);
    const res = await fetch('http://localhost:3000/goals'); // API fetch
    if (!res.ok) throw new Error('API response not OK');
    const data = await res.json();
    setGoals(data);
  } catch (error) {
    console.error('Error fetching goals, using fallback:', error);
    setGoals(initialGoalsRef.current); // fallback to static ref
  } finally {
    setLoading(false);
  }
}, []); 


 useEffect(() => {
  fetchGoals();
}, [fetchGoals]); 

  const createGoal = async (goalData) => {
    const newGoal = {
      ...goalData,
      id: Date.now().toString(),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    try {
      const res = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });
      if (!res.ok) throw new Error('Failed to create goal');
      const savedGoal = await res.json();
      setGoals(prev => [...prev, savedGoal]);
    } catch (error) {
      console.error('Error creating goal, adding locally:', error);
      setGoals(prev => [...prev, newGoal]); 
    }
  };

  const updateGoal = async (id, updates) => {
    try {
      const res = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Failed to update goal');
      const updatedGoal = await res.json();
      setGoals(prev => prev.map(goal =>
        goal.id === id ? updatedGoal : goal
      ));
    } catch (error) {
      console.error('Error updating goal, updating locally:', error);
      setGoals(prev => prev.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      ));
    }
  };

  const deleteGoal = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete goal');
      setGoals(prev => prev.filter(goal => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal, removing locally:', error);
      setGoals(prev => prev.filter(goal => goal.id !== id));
    }
  };

  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      updateGoal(goalId, {
        savedAmount: goal.savedAmount + amount
      });
    }
  };

  // Overview calculations
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Goal Planner</h1>
          <p className="text-gray-600">Track and manage your financial savings goals</p>
        </div>

        {/* Overview */}
        <Overview
          totalGoals={totalGoals}
          totalSaved={totalSaved}
          completedGoals={completedGoals}
        />

        {/* Add Goal Button */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Goal
          </button>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <GoalForm
            onAddGoal={createGoal}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Make Deposit */}
        <DepositForm
          onDeposit={handleDeposit}
          goals={goals.filter(goal => goal.savedAmount < goal.targetAmount)}
        />

        {/* Goals List */}
        <GoalList
          goals={goals}
          onUpdateGoal={updateGoal}
          onDeleteGoal={deleteGoal}
          editingGoal={editingGoal}
          setEditingGoal={setEditingGoal}
        />

        {goals.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first savings goal</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus className="h-4 w-4" />
              Add Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartGoalPlanner;
