import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, AlertCircle } from 'lucide-react';
import { useTickets } from '../../contexts/TicketContext';
import { TicketCategory, TicketPriority } from '../../types';

export const CreateTicket: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other' as TicketCategory,
    priority: 'medium' as TicketPriority
  });
  const [error, setError] = useState('');
  const { createTicket } = useTickets();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    createTicket({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      priority: formData.priority,
      status: 'open'
    });

    navigate('/tickets');
  };

  const categories = [
    { value: 'hardware', label: 'Hardware Issues' },
    { value: 'software', label: 'Software Problems' },
    { value: 'network', label: 'Network & Connectivity' },
    { value: 'access', label: 'Access & Permissions' },
    { value: 'email', label: 'Email Issues' },
    { value: 'other', label: 'Other' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', description: 'Minor issue, can wait' },
    { value: 'medium', label: 'Medium', description: 'Normal priority' },
    { value: 'high', label: 'High', description: 'Important, needs attention' },
    { value: 'critical', label: 'Critical', description: 'Urgent, blocking work' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'border-green-300 bg-green-50';
      case 'medium': return 'border-yellow-300 bg-yellow-50';
      case 'high': return 'border-orange-300 bg-orange-50';
      case 'critical': return 'border-red-300 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Ticket</h1>
          <p className="text-gray-600">
            Describe your issue or request and we'll help you resolve it quickly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Issue Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Brief description of your issue"
              maxLength={100}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.title.length}/100
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Priority Level *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {priorities.map(priority => (
                <label
                  key={priority.value}
                  className={`relative flex cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                    formData.priority === priority.value
                      ? getPriorityColor(priority.value) + ' border-opacity-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={formData.priority === priority.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {priority.label}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {priority.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Please provide as much detail as possible about your issue, including:
• What you were trying to do
• What happened instead
• Any error messages you saw
• Steps to reproduce the problem"
              maxLength={1000}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {formData.description.length}/1000
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Send size={20} />
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};