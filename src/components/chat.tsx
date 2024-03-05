'use client';

import { Message, useChat } from 'ai/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import H1 from './h1';
import parse from 'html-react-parser';
import { useState } from 'react';
import { getMessage } from '@/actions/actions';
import { sleep } from '@/lib/utils';
import { Response } from '@/lib/types';
import React from 'react';
import Annotations from './annotations';

export default function Chat() {
  // const { messages, input, handleInputChange, handleSubmit, setMessages } =
  //   useChat({
  //     api: '/api/openai',
  //     initialMessages: [
  //       {
  //         id: '1',
  //         role: 'assistant',
  //         content: 'Hello, how can I help you today?',
  //       },
  //     ],
  //   });
  const [mockInput, setMockInput] = useState('');
  const [mockMessages, setMockMessages] = useState<Response[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello, how can I help you today?',
    },
  ]);

  const handleMockSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMockMessages((prev) => [
      ...prev,
      { id: new Date().getTime().toString(), role: 'user', content: mockInput },
    ]);
    setMockInput('');
    const newMessage: Response = await getMessage(mockInput);
    await sleep(2000).then(() => {
      setMockMessages((prev) => [...prev, newMessage]);
    });
  };

  return (
    <section className='flex flex-col h-full w-full justify-between'>
      <H1 className='m-4'>Search the knowledge base for writing prompts</H1>
      <ul className='bg-white h-3/4 m-4 p-4 flex flex-col-reverse overflow-y-auto scrollbar'>
        {mockMessages.toReversed().map((m, index) => {
          const text = m.content;
          const formattedMessage = text.replace(/(?:\r\n|\r|\n)/g, '<br>');

          return (
            <React.Fragment key={index}>
              <li className='mt-4 flex flex-col'>
                <div>
                  <span className='font-semibold'>
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                  </span>
                  {parse(formattedMessage)}
                </div>
                {m.annotations && <Annotations sources={m.annotations} />}
              </li>
            </React.Fragment>
          );
        })}
      </ul>

      <form onSubmit={handleMockSubmit} className='flex flex-col m-4 space-y-4'>
        <Label>Say something...</Label>
        <div className='flex gap-x-4'>
          <Input
            value={mockInput}
            onChange={(e) => setMockInput(e.target.value)}
            placeholder='Type here...'
            className='bg-white'
          />
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </section>
  );
}
