import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Ticket } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTickets } from '../../contexts/TicketContext';
import { TicketStatus, TicketPriority, TicketCategory } from '../../types';

export const TicketList: React.FC = () => {
  const { user } = useAuth();
  const { tickets, getUserTickets } = useTickets();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | 'all'>('all');

  const userTickets = user ? getUserTickets(user.id) : [];
  const allTickets = user?.role === 'admin' ? tickets : userTickets;

  const filteredTickets = allTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

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
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.role === 'admin' ? 'All Tickets' : 'My Tickets'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'admin' 
              ? 'Manage and track all support tickets'
              : 'Track your support requests and their status'
            }
          </p>
        </div>
        <Link
          to="/create-ticket"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          New Ticket
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as TicketCategory | 'all')}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="access">Access</option>
            <option value="email">Email</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
                ? 'No tickets match your filters'
                : 'No tickets found'
              }
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all'
                ? 'Try adjusting your search criteria'
                : 'Create your first support ticket to get started'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && categoryFilter === 'all' && (
              <Link
                to="/create-ticket"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Create Ticket
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <Link
                key={ticket.id}
                to={`/tickets/${ticket.id}`}
                className="block p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {ticket.title}
                      </h3>
                      <span className="text-sm text-gray-500">#{ticket.id}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {ticket.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="capitalize">{ticket.category}</span>
                      <span>•</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {ticket.comments.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{ticket.comments.length} comment{ticket.comments.length !== 1 ? 's' : ''}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};