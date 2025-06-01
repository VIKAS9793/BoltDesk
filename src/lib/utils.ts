import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function generateAvatarFallback(name: string): string {
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
  return initials.substring(0, 2);
}

export function getRandomGreeting(): string {
  const greetings = [
    "Welcome back!",
    "Great to see you!",
    "Hello again!",
    "Glad you're here!",
    "Ready to create?"
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}