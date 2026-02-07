
export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  status: 'Enrolled' | 'Graduated' | 'Pending';
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dogs: Dog[];
  token?: string; // Stream Auth Token
  lastBillingDate?: string;
  subscriptionPlan?: string;
}

export interface TrainingService {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  details: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
