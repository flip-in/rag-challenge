'use server'

import { Post } from "@prisma/client"
import prisma from "@/lib/db"
import { excerpts } from "@/lib/data"

export async function getMessage(input: string){
  if (input === 'hello') {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: 'I can help',
      annotations: [
        {
          id: 1,
          excerpts: [
          excerpts[0],
          ]
        },
        {
          id: 2,
          excerpts: [
            {
              content: 'excerpt 3',
              weight: 3.5
            },
            {
              content: 'excerpt 4',
              weight: 4
            }
          ]
        }
      ],
  
    }
  } else {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: 'I found this',
      annotations: [
        {
          id: 3,
          excerpts: [
            {
              content: 'This is a source',
              weight: 0.5
            },
            {
              content: 'This is another source',
              weight: 0.5
            }
          ]
        },
        {
          id: 4,
          excerpts: [
            {
              content: 'This is a source',
              weight: 0.5
            },
            {
              content: 'This is another source',
              weight: 0.5
            }
          ],
          
        }
      ],
  
    }
  }
}

export async function getPostById(id: number): Promise<Post | null>{
  const post = await prisma.post.findUnique({
    where: {
      id: id
    }
  })

  return post
}

