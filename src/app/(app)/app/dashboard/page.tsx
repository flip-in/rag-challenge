import Branding from '@/components/branding';
import Chat from '@/components/chat';
import ContentBlock from '@/components/content-block';
import PostList from '@/components/post-list';
import prisma from '@/lib/db';
import { Annotation } from '@/lib/types';

type PageProps = {
  searchParams: Annotation;
};

export default async function Page({ searchParams }: PageProps) {
  const posts = await prisma.post.findMany({});

  return (
    <main>
      <div className='flex justify-between items-center text-white py-8'>
        <Branding />
      </div>
      <div className='md:grid md:grid-cols-3 grid-rows-[45px_300px_500px] md:grid-rows-[45px_1fr] gap-4 md:h-[70vh]'>
        <div className='md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 relative'>
          <ContentBlock className='scrollbar overflow-y-auto md:h-[70vh]'>
            <PostList posts={posts} sourceArticle={searchParams} />
          </ContentBlock>
        </div>

        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'>
          <ContentBlock>
            <Chat />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
