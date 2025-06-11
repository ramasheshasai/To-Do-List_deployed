export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  department?: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  userId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  comments: TicketComment[];
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  userName: string;
  content: string;
  isInternal: boolean;
  createdAt: Date;
}

export type TicketCategory = 
  | 'hardware'
  | 'software'
  | 'network'
  | 'access'
  | 'email'
  | 'other';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type TicketStatus = 
  | 'open'
  | 'in-progress'
  | 'pending'
  | 'resolved'
  | 'closed';

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, department?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface TicketContextType {
  tickets: Ticket[];
  createTicket: (ticket: Omit<Ticket, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'comments'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  addComment: (ticketId: string, content: string, isInternal?: boolean) => void;
  getUserTickets: (userId: string) => Ticket[];
  getTicketById: (id: string) => Ticket | undefined;
  loading: boolean;
}