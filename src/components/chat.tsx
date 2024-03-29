'use client';

import { Message, useChat } from 'ai/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import H1 from './h1';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { getMessage } from '@/actions/actions';
import { sleep } from '@/lib/utils';
import { Response } from '@/lib/types';
import React from 'react';
import Annotations from './annotations';
import { Textarea } from './ui/textarea';
import { IoIosSend } from 'react-icons/io';

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
  const [mockInput, setMockInput] = useState(
    'What can you tell me about the effect of AI on space travel?'
  );
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
      <H1 className='md:m-4 mx-4 my-2 text-lg md:text-2xl '>
        Use the assistant to search your archives
      </H1>
      <ul className='bg-white h-3/4 md:m-4 mx-2 p-4 flex flex-col-reverse overflow-y-auto scrollbar'>
        {mockMessages.toReversed().map((m, index) => {
          // {messages.toReversed().map((m, index) => {
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

      <form
        onSubmit={handleMockSubmit}
        // onSubmit={handleSubmit}
        className='flex flex-col m-4 space-y-4'
      >
        <Label>Say something...</Label>
        <div className='flex gap-x-2 md:gap-x-4'>
          <Textarea
            required
            value={mockInput}
            // value={input}
            onChange={(e) => setMockInput(e.target.value)}
            // onChange={handleInputChange}
            placeholder='Try asking about layoffs or space travel..'
            className='bg-white !text-base'
          />
          <Button
            type='submit'
            className='self-center md:self-end h-10 w-12 p-0 md:px-8 md:h-9 rounded-full md:rounded-lg'
          >
            <span className='hidden md:block'>Send</span>
            <IoIosSend className='md:hidden' size={16} />
          </Button>
        </div>
      </form>
    </section>
  );
}
