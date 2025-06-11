import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <HelpCircle size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ServiceDesk Pro
              </h1>
              <p className="text-xs text-gray-500">IT Support Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          {user && (
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/tickets"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/tickets')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                My Tickets
              </Link>
              <Link
                to="/create-ticket"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/create-ticket')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                New Ticket
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell size={20} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.department}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Settings size={16} />
                    </button>
                    <button
                      onClick={logout}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};