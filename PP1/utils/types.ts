export type Option = {
  id: number;
  name: string;
  color: string;
};

export type Tag = { name: string; color: string; id: number };

export type Rating = { upvotes: number; downvotes: number };

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

export interface Comment {
  id: number;
  user: User;
  content: string;
  numUpvotes: number;
  numDownvotes: number;
  Comments: { id: number }[];
  replies: Comment[];
}

export interface ReportType {
  id: string;
  message: string;
}

export interface BlogType {
  id: number;
  title: string;
  content: string;
  author: { id: number; firstName: string; lastName: string };
  tags: { id: number; name: string; color: string }[];
  numUpvotes: number;
  numDownvotes: number;
  Templates: { id: number; title: string; languageId: number }[];
}
