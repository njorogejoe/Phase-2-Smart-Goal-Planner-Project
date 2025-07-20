import React from 'react';
import { Target, DollarSign, Calendar, CheckCircle } from 'lucide-react';

const Overview = ({ totalGoals, totalSaved, completedGoals }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center">
          <Target className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Goals</p>
            <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Saved</p>
            <p className="text-2xl font-bold text-gray-900">${totalSaved.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-900">{totalGoals - completedGoals}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;