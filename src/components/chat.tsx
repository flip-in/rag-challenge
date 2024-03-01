'use client';

import { useChat } from 'ai/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import H1 from './h1';
import parse from 'html-react-parser';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello, how can I help you today?',
      },
    ],
  });
  console.log(messages);

  return (
    <section className='flex flex-col h-full w-full justify-between'>
      <H1 className='m-4'>Search the knowledge base for writing prompts</H1>
      <ul className='bg-white h-3/4 m-4 p-4 flex flex-col-reverse overflow-y-auto scrollbar'>
        {messages.toReversed().map((m, index) => {
          const text = m.content;
          const newText = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
          return (
            <>
              <li className='mt-4' key={index}>
                <span className='font-semibold'>
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                </span>
                {parse(newText)}
              </li>
            </>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit} className='flex flex-col m-4 space-y-4'>
        <Label>Say something...</Label>
        <div className='flex gap-x-4'>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder='Type here...'
          />
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </section>
  );
}
