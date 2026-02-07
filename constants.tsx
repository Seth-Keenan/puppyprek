
import React from 'react';
import { TrainingService } from './types';

export const SERVICES: TrainingService[] = [
  {
    id: 'puppy-prek',
    title: 'Puppy Pre-K',
    description: 'Foundation training for puppies 8-16 weeks. Focuses on socialization and basic cues.',
    price: '$650/week',
    icon: '🐾',
    details: ['Socialization', 'Potty Training', 'Basic Obedience', 'Safe Play']
  },
  {
    id: 'private-lessons',
    title: 'Private Lessons',
    description: 'One-on-one sessions tailored to your dog\'s specific behavioral needs.',
    price: '$120/session',
    icon: '🎓',
    details: ['Custom Curriculum', 'In-home or Facility', 'Expert Trainer', 'Behavior Modification']
  },
  {
    id: 'board-train',
    title: 'Board & Train',
    description: 'Intensive immersion training program where your dog stays with us.',
    price: '$2,800/month',
    icon: '🏠',
    details: ['24/7 Supervision', 'Rapid Progress', 'Daily Reports', 'Transition Support']
  }
];

export const MOCK_USER = {
  id: 'user_123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://picsum.photos/seed/alex/200',
  dogs: [
    {
      id: 'dog_1',
      name: 'Cooper',
      breed: 'Golden Retriever',
      age: '4 months',
      status: 'Enrolled',
      image: 'https://picsum.photos/seed/cooper/400/300'
    },
    {
      id: 'dog_2',
      name: 'Luna',
      breed: 'French Bulldog',
      age: '2 years',
      status: 'Graduated',
      image: 'https://picsum.photos/seed/luna/400/300'
    }
  ]
};
