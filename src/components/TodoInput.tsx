import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (text: string, priority: 'low' | 'medium' | 'high') => boolean;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a task');
      return;
    }

    if (text.length > 200) {
      setError('Task must be less than 200 characters');
      return;
    }

    const success = onAdd(text, priority);
    if (success) {
      setText('');
      setPriority('medium');
      setError('');
    } else {
      setError('Failed to add task');
    }
  };

  const priorityColors = {
    low: 'border-green-300 bg-green-50 text-green-700',
    medium: 'border-yellow-300 bg-yellow-50 text-yellow-700',
    high: 'border-red-300 bg-red-50 text-red-700'
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError('');
              }}
              placeholder="Add a new task..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-500"
              maxLength={200}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              {text.length}/200
            </div>
          </div>
          
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className={`px-3 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ${priorityColors[priority]}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};