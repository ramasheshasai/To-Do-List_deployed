import React, { useState } from 'react';
import { Check, X, Edit2, Save, AlertCircle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!editText.trim()) {
      setError('Task cannot be empty');
      return;
    }

    if (editText.length > 200) {
      setError('Task must be less than 200 characters');
      return;
    }

    const success = onUpdate(todo.id, editText);
    if (success) {
      setIsEditing(false);
      setError('');
    } else {
      setError('Failed to update task');
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
    setError('');
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const priorityDots = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'
  };

  return (
    <div className={`group bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/20 transition-all duration-300 hover:shadow-lg ${todo.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Priority indicator */}
        <div className={`w-3 h-3 rounded-full mt-2 ${priorityDots[todo.priority]} flex-shrink-0`}></div>
        
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center mt-1 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => {
                    setEditText(e.target.value);
                    setError('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={200}
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {editText.length}/200
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className={`text-gray-800 break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[todo.priority]}`}>
                  {todo.priority}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(todo.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                title="Delete"
              >
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};