'use client';

import { getPostById } from '@/actions/actions';
import { Annotation } from '@/lib/types';
import { Post } from '@prisma/client';
import { createContext, useState } from 'react';

type TSourceContext = {
  sources: Post[] | null;
};

export const SourceContext = createContext<TSourceContext | null>(null);

type SourceContextProviderProps = {
  children: React.ReactNode;
};

export default function SourceContextProvider({
  children,
}: SourceContextProviderProps) {
  //state
  const [sources, setSources] = useState<Post[] | null>(null);

  //derived state

  //handlers

  return (
    <SourceContext.Provider value={{ sources }}>
      {children}
    </SourceContext.Provider>
  );
}
