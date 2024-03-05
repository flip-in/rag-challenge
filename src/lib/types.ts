import { Post } from '@prisma/client'

// export type PostEssentials = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

export type Response = {
  id: string;
  role: string;
  content: string;
  annotations?: Annotation[];
}

export type Annotation = {
  id: number;
  excerpts: Excerpt[];
}

export type Excerpt = {
  content: string,
  weight: number
}