export type Option = {
  id: number;
  name: string;
  color: string;
};

export type Tag = { name: string; color: string; id: number };

export type Rating = { upvotes: number; downvotes: number };

export type SortBy = "upvotes" | "downvotes" | "controversial";

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
  isFlagged: boolean;
  owned?: boolean;
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
  isFlagged: boolean;
  owned?: boolean;
}

export interface Template {
  id: number;
  title: string;
  language: { id: number; name: string };
  code: string;
  explanation: string;
  author: { id: number; firstName: string; lastName: string };
  tags: { id: number; name: string; color: string }[];
  Blogs: { id: number; title: string }[];
  isFlagged: boolean;
  owned?: boolean;
}
