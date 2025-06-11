import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ticket, TicketContextType, TicketComment } from '../types';
import { useAuth } from './AuthContext';

const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Mock tickets for demo purposes
const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Computer won\'t start',
    description: 'My computer is not turning on when I press the power button. I\'ve checked the power cable and it seems to be connected properly.',
    category: 'hardware',
    priority: 'high',
    status: 'in-progress',
    userId: '2',
    assignedTo: '1',
    createdAt: new Date('2024-01-20T10:00:00'),
    updatedAt: new Date('2024-01-20T14:30:00'),
    comments: [
      {
        id: '1',
        ticketId: '1',
        userId: '1',
        userName: 'Admin User',
        content: 'I\'ve assigned this ticket to myself. Can you please check if the power LED on the computer is lighting up?',
        isInternal: false,
        createdAt: new Date('2024-01-20T14:30:00')
      }
    ]
  },
  {
    id: '2',
    title: 'Email not working',
    description: 'I cannot send or receive emails. Getting error message "Connection timeout".',
    category: 'email',
    priority: 'medium',
    status: 'open',
    userId: '2',
    createdAt: new Date('2024-01-21T09:15:00'),
    updatedAt: new Date('2024-01-21T09:15:00'),
    comments: []
  }
];

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load tickets from localStorage or use mock data
    const storedTickets = localStorage.getItem('servicedesk_tickets');
    if (storedTickets) {
      try {
        const parsedTickets = JSON.parse(storedTickets).map((ticket: any) => ({
          ...ticket,
          createdAt: new Date(ticket.createdAt),
          updatedAt: new Date(ticket.updatedAt),
          resolvedAt: ticket.resolvedAt ? new Date(ticket.resolvedAt) : undefined,
          comments: ticket.comments.map((comment: any) => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          }))
        }));
        setTickets(parsedTickets);
      } catch (error) {
        console.error('Error parsing stored tickets:', error);
        setTickets(mockTickets);
      }
    } else {
      setTickets(mockTickets);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save tickets to localStorage whenever tickets change
    if (!loading) {
      localStorage.setItem('servicedesk_tickets', JSON.stringify(tickets));
    }
  }, [tickets, loading]);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'comments'>) => {
    if (!user) return;

    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: []
    };

    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date() }
          : ticket
      )
    );
  };

  const addComment = (ticketId: string, content: string, isInternal = false) => {
    if (!user) return;

    const newComment: TicketComment = {
      id: Date.now().toString(),
      ticketId,
      userId: user.id,
      userName: user.name,
      content,
      isInternal,
      createdAt: new Date()
    };

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              comments: [...ticket.comments, newComment],
              updatedAt: new Date()
            }
          : ticket
      )
    );
  };

  const getUserTickets = (userId: string) => {
    return tickets.filter(ticket => ticket.userId === userId);
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      createTicket,
      updateTicket,
      addComment,
      getUserTickets,
      getTicketById,
      loading
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};