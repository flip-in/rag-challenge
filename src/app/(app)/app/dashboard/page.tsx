import Branding from '@/components/branding';
import Chat from '@/components/chat';
import ContentBlock from '@/components/content-block';
import PostList from '@/components/post-list';
import prisma from '@/lib/db';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Post } from '@prisma/client';

export default async function Page() {
  const posts = await prisma.post.findMany({});

  return (
    <main className=''>
      <div className='flex justify-between items-center text-white md:py-8 pt-4 pb-10'>
        <Branding />
      </div>
      <div className='md:grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:h-[70vh]'>
        <div className='md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative md:h-[70vh]'>
          <ContentBlock className='scrollbar overflow-y-auto'>
            <div className='hidden md:block'>
              <PostList posts={posts} />
            </div>
            <div className='flex flex-col overflow-y-scroll'>
              <PostSheet posts={posts} />
            </div>
          </ContentBlock>
        </div>

        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full flex '>
          <ContentBlock className='h-[70vh] md:h-full'>
            <Chat />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}

function PostSheet({ posts }: { posts: Post[] }) {
  return (
    <Sheet>
      <SheetTrigger className='md:hidden' asChild>
        <button
          role='button'
          aria-label='Open post list'
          className='fixed h-7 w-8 flex items-center justify-end bg-neutral-200/80 left-0 top-[105px] pr-2 text-xl rounded-r-lg animate-bounce'
        >
          {'>'}
        </button>
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto pt-4'>
        <PostList posts={posts} />
      </SheetContent>
    </Sheet>
  );
}
