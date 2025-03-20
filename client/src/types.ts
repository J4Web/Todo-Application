export type Priority = "High" | "Medium" | "Low";

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  tags: string[];
  mentions: string[];
  notes: string[];
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
}

// Mock users for mentions/tags
export const MOCK_USERS: User[] = [
  {
    id: "1",
    username: "sarah",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    id: "2",
    username: "mike",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
  },
  {
    id: "3",
    username: "alex",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
  },
  {
    id: "4",
    username: "emma",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
  },
  {
    id: "5",
    username: "james",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100",
  },
];
