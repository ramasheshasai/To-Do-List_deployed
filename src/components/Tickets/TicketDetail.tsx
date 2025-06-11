import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Clock, User, Tag, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../contexts/TicketContext';
import { TicketStatus, TicketPriority } from '../../types';

export const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTicketById, updateTicket, addComment } = useTickets();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticket = id ? getTicketById(id) : undefined;

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket not found</h2>
        <p className="text-gray-600 mb-4">The ticket you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tickets')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Tickets
        </button>
      </div>
    );
  }

  const handleStatusChange = (newStatus: TicketStatus) => {
    updateTicket(ticket.id, { 
      status: newStatus,
      ...(newStatus === 'resolved' && { resolvedAt: new Date() })
    });
  };

  const handlePriorityChange = (newPriority: TicketPriority) => {
    updateTicket(ticket.id, { priority: newPriority });
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    addComment(ticket.id, newComment.trim());
    setNewComment('');
    setIsSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isOwner = user?.id === ticket.userId;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/tickets')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticket #{ticket.id}</h1>
          <p className="text-gray-600">Created {new Date(ticket.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{ticket.title}</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Comments ({ticket.comments.length})
            </h3>

            <div className="space-y-4 mb-6">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{comment.userName}</span>
                      {comment.isInternal && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Internal
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                {isAdmin ? (
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ')}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                {isAdmin ? (
                  <select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-gray-400" />
                  <span className="text-gray-900 capitalize">{ticket.category}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-900">{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {ticket.resolvedAt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resolved</label>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-gray-900">{new Date(ticket.resolvedAt).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          {isAdmin && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {ticket.status === 'open' && (
                  <button
                    onClick={() => handleStatusChange('in-progress')}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Start Working
                  </button>
                )}
                {ticket.status === 'in-progress' && (
                  <button
                    onClick={() => handleStatusChange('resolved')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
                {ticket.status === 'resolved' && (
                  <button
                    onClick={() => handleStatusChange('closed')}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close Ticket
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};