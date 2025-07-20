// Utility functions for the Smart Goal Planner

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Calculate progress percentage
export const getProgressPercentage = (saved, target) => {
  return Math.min((saved / target) * 100, 100);
};

// Calculate days remaining
export const getDaysRemaining = (deadline) => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Check if goal is overdue
export const isOverdue = (deadline, savedAmount, targetAmount) => {
  return getDaysRemaining(deadline) < 0 && savedAmount < targetAmount;
};

// Check if goal is near deadline
export const isNearDeadline = (deadline, savedAmount, targetAmount) => {
  const daysRemaining = getDaysRemaining(deadline);
  return daysRemaining <= 30 && daysRemaining >= 0 && savedAmount < targetAmount;
};

// Format date for display
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Validate goal data
export const validateGoal = (goalData) => {
  const errors = {};
  
  if (!goalData.name || goalData.name.trim() === '') {
    errors.name = 'Goal name is required';
  }
  
  if (!goalData.targetAmount || goalData.targetAmount <= 0) {
    errors.targetAmount = 'Target amount must be greater than 0';
  }
  
  if (!goalData.category) {
    errors.category = 'Category is required';
  }
  
  if (!goalData.deadline) {
    errors.deadline = 'Deadline is required';
  } else {
    const deadlineDate = new Date(goalData.deadline);
    const today = new Date();
    if (deadlineDate <= today) {
      errors.deadline = 'Deadline must be in the future';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Calculate monthly savings needed
export const calculateMonthlySavingsNeeded = (remaining, deadline) => {
  const daysRemaining = getDaysRemaining(deadline);
  if (daysRemaining <= 0) return remaining;
  
  const monthsRemaining = Math.max(1, daysRemaining / 30);
  return remaining / monthsRemaining;
};

// Get goal status
export const getGoalStatus = (goal) => {
  const { savedAmount, targetAmount, deadline } = goal;
  
  if (savedAmount >= targetAmount) {
    return { status: 'completed', color: 'green' };
  }
  
  if (isOverdue(deadline, savedAmount, targetAmount)) {
    return { status: 'overdue', color: 'red' };
  }
  
  if (isNearDeadline(deadline, savedAmount, targetAmount)) {
    return { status: 'near-deadline', color: 'orange' };
  }
  
  return { status: 'on-track', color: 'blue' };
};