import React from 'react';
import { Filter, ArrowUpDown, Trash2 } from 'lucide-react';
import { FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  sortBy: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sortBy: SortType) => void;
  onClearCompleted: () => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
  onClearCompleted,
  stats
}) => {
  const filterButtons = [
    { key: 'all' as FilterType, label: 'All', count: stats.total },
    { key: 'active' as FilterType, label: 'Active', count: stats.active },
    { key: 'completed' as FilterType, label: 'Completed', count: stats.completed }
  ];

  const sortOptions = [
    { key: 'date' as SortType, label: 'Date Added' },
    { key: 'alphabetical' as SortType, label: 'Alphabetical' },
    { key: 'priority' as SortType, label: 'Priority' }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 space-y-4">
      {/* Stats */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Statistics</h3>
        <div className="flex justify-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter size={16} />
          Filter Tasks
        </div>
        <div className="flex gap-2">
          {filterButtons.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ArrowUpDown size={16} />
          Sort By
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {sortOptions.map(({ key, label }) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear Completed */}
      {stats.completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
        >
          <Trash2 size={16} />
          Clear Completed ({stats.completed})
        </button>
      )}
    </div>
  );
};