'use server'

import { Post } from "@prisma/client"
import prisma from "@/lib/db"
import { excerpts } from "@/lib/data"
import { notFound } from "next/navigation"
import { sleep } from "@/lib/utils"

export async function getMessage(input: string){
  if (input === 'hello') {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: "Recent advancements in technology, particularly in artificial intelligence, have propelled space exploration and knowledge acquisition to unprecedented heights. AI's ability to analyze vast amounts of data from space-based instruments like telescopes and satellites has revolutionized our understanding of the universe. Not only can AI systems process information at a faster rate than humans, but they can also identify patterns and make predictions that were once unimaginable. Despite the challenges, such as the significant costs associated with space missions and the need for international collaboration, AI presents an opportunity to augment human capabilities and push the boundaries of exploration further. Embracing AI in space exploration opens new frontiers for discovery and innovation, marking an exciting era in our quest to explore the final frontier.",
      annotations: [
        {
          id: 1,
          excerpts: [
            { content: "One of these areas is knowledge acquisition.", weight: 2 },
            { content: "Recent advancements in natural language processing and machine learning have allowed AI systems to process and understand vast amounts of information, including text, images, and videos.", weight: 5 },
            { content: "AI systems can acquire knowledge at a much faster rate than humans, and in some cases, they can even understand and retain that knowledge better.", weight: 4 },
            { content: "AI is not a replacement for human intelligence. Instead, it is a tool that can be used to augment and enhance human capabilities.", weight: 4 },
            { content: "By leveraging the power of AI to acquire knowledge, humans can free up time and resources to focus on other tasks, such as creativity and problem-solving.", weight: 5 },
            { content: "AI is eating humans for knowledge, but this is not something to be feared. Instead, it should be embraced as an opportunity to augment human capabilities and push the boundaries of what is possible.", weight: 5 },
          ]
        },
        {
          id: 2,
          excerpts: [
            { content: "Today, we have a variety of sophisticated spacecraft and technologies that allow us to study our solar system and beyond in greater detail than ever before.", weight: 4 },
            { content: "AI can be used to analyze vast amounts of data from space-based instruments, such as telescopes and satellites, and help identify patterns and make predictions that would be impossible for humans to discern.", weight: 5 },
            { content: "AI is also being used to develop new propulsion systems and space-based robots that could make space travel more efficient and sustainable.", weight: 3 },
            { content: "While the advancements in AI and technology are exciting, space exploration also comes with its own set of challenges.", weight: 4 },
            { content: "One of the biggest challenges is the cost. Space missions are extremely expensive and require significant funding from government agencies and private companies.", weight: 2 },
            { content: "Space exploration is a global endeavor and requires the cooperation of multiple countries and organizations to achieve success.", weight: 4 },
            { content: "Overall, space exploration is an exciting field with many opportunities for advancement, thanks in large part to the incorporation of AI and other technologies.", weight: 5 },
            
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
              weight: 1
            },
            {
              content: 'This is another source',
              weight: 2
            }
          ]
        },
        {
          id: 4,
          excerpts: [
            {
              content: 'This is a source',
              weight: 3
            },
            {
              content: 'This is another source',
              weight: 4
            }
          ],
          
        }
      ],
  
    }
  }
}

export async function getPostById(id: number): Promise<Post>{
  const post = await prisma.post.findUnique({
    where: {
      id: id
    }
  })
  if (!post) {
    return notFound()
  }

  return post
}

