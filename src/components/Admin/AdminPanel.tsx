import React, { useState } from 'react';
import { Users, Ticket, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useTickets } from '../../contexts/TicketContext';
import { useAuth } from '../../contexts/AuthContext';

export const AdminPanel: React.FC = () => {
  const { tickets } = useTickets();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    critical: tickets.filter(t => t.priority === 'critical').length,
    avgResolutionTime: '2.5 hours' // Mock data
  };

  const recentTickets = tickets
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  const categoryStats = tickets.reduce((acc, ticket) => {
    acc[ticket.category] = (acc[ticket.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all support tickets</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Ticket size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Clock size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-xl">
              <TrendingUp size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgResolutionTime}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Clock size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Tickets</h2>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">#{ticket.id} - {ticket.title}</h3>
                  <p className="text-sm text-gray-600 truncate">{ticket.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500 capitalize">{ticket.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('-', ' ')}
                  </span>
                  <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tickets by Category</h2>
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};