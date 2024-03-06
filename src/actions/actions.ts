'use server'

import { Post } from "@prisma/client"
import prisma from "@/lib/db"
import { notFound } from "next/navigation"

export async function getMessage(input: string){
  if (input.includes('space')) {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: `Recent advancements in technology, particularly in artificial intelligence, have propelled space exploration and knowledge acquisition to unprecedented heights. \n\nAI's ability to analyze vast amounts of data from space-based instruments like telescopes and satellites has revolutionized our understanding of the universe. Not only can AI systems process information at a faster rate than humans, but they can also identify patterns and make predictions that were once unimaginable. \n\nDespite the challenges, such as the significant costs associated with space missions and the need for international collaboration, AI presents an opportunity to augment human capabilities and push the boundaries of exploration further. \n\nEmbracing AI in space exploration opens new frontiers for discovery and innovation, marking an exciting era in our quest to explore the final frontier.`,
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
  } else if (input.includes('layoffs')) {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: `Hello! I'm here to help you understand the complexities of layoffs. Layoffs are a challenging process for both employees and companies alike. Understanding the causes and consequences is crucial in making informed decisions. Common causes include shifts in company strategy or economic downturns, leading to decreased demand for products or services.\n\nThe impact of layoffs is significant, affecting employees, companies, and communities. Employees often face financial insecurity and loss of benefits, while companies may experience decreased productivity and morale among remaining staff. This can ripple out to the wider community, increasing unemployment and reducing economic activity.\n\nHowever, it's important to explore alternatives to layoffs whenever possible. Options like reducing work hours or offering early retirement packages can mitigate the negative effects on employees and benefit the company in the long run.\n\nIn conclusion, layoffs should be approached with caution, and understanding their causes and consequences is key. By considering alternatives and making informed decisions, companies can navigate these difficult situations with greater sensitivity and care.
      `,
      annotations: [
        {
          id: 5,
          excerpts: [
            { content: "studies have shown that poor mental health can have a significant impact on productivity", weight: 3 },
            { content: "Individuals who struggle with mental health issues such as anxiety and depression often have difficulty focusing", weight: 4 },
            {  content: "Creating a supportive and inclusive workplace can go a long way in promoting good mental health", weight: 5 },
            { content: "Employers play a key role in promoting mental health in the workplace", weight: 5 },
            { content: "It is also important to break the stigma surrounding mental health", weight: 4 },
          ]
        },
        {
          id: 11,
          excerpts: [
            { content: "The sudden loss of a job can cause feelings of stress, anxiety, and depression", weight: 4 },
            { content: "Losing a job can cause a great deal of stress and anxiety", weight: 4 },
            { content: "The process of layoffs can be emotionally challenging for both the employees who are let go, as well as those who remain with the company", weight: 3 },
            { content: "The loss of a job can be a significant blow to one's self-esteem", weight: 5 },
            { content: "It's important for companies to consider the impact of layoffs on employee mental health", weight: 5 },
            { content: "Additionally, the process of layoffs can be emotionally challenging for both the employees who are let go, as well as those who remain with the company", weight: 2 },
            { content: "They may feel guilty for keeping their jobs, or worry about the future of the company and their own job security", weight: 1 },
          ],
        },
        {

          id: 12,
          excerpts: [
            { content: "It is important to understand the causes and consequences of layoffs", weight: 5 },
            { content: "Some common causes include a decrease in demand for the company's products or services", weight: 4 },
            { content: "Layoffs can have a significant impact on the affected employees, as well as the company and the wider community", weight: 5 },
            { content: "Companies may also experience a loss of productivity and morale among remaining employees", weight: 4 },
            { content: "It is important to consider alternatives to layoffs", weight: 5 },
          ],
        },
      ],
  
    }
  } else {
    return {
      id: new Date().getTime().toString(),
      role: 'assistant',
      content: 'I hope I was helpful to you. If you have any other questions, feel free to ask.',
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

