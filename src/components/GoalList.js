import React from 'react';
import GoalCard from './GoalCard';

const GoalList = ({ 
  goals, 
  onUpdateGoal, 
  onDeleteGoal, 
  editingGoal, 
  setEditingGoal 
}) => {
  
  const handleEditGoal = (goal) => {
    setEditingGoal({ ...goal });
  };

  const handleSaveEdit = () => {
    onUpdateGoal(editingGoal.id, editingGoal);
    setEditingGoal(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          editingGoal={editingGoal}
          setEditingGoal={setEditingGoal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          handleEditGoal={handleEditGoal}
          handleSaveEdit={handleSaveEdit}
        />
      ))}
    </div>
  );
};

export default GoalList;