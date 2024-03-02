import { Post } from '@prisma/client'

// export type PostEssentials = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>

type Response = {
  role: string,
  content: string,
  sources?: Source[]
}

export type Source = {
  id: number,
  excerpts: [
    {
      content: string,
      weight: number
    }
  ]
}