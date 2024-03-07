'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn, highlightText } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import styles from '@/components/ui/dialog.module.css';
import { useEffect, useMemo, useState } from 'react';
import { getPostById } from '@/actions/actions';
import { Post } from '@prisma/client';
import parse from 'html-react-parser';
import { Excerpt } from '@/lib/types';
import Skeleton from '@/components/skeleton';

type ArticleModalProps = {
  params: { id: string };
  searchParams: { excerpts: string };
};

export default function ArticleModal({
  params,
  searchParams,
}: ArticleModalProps) {
  const excerpts = JSON.parse(searchParams.excerpts || '[]') as Excerpt[];
  const router = useRouter();
  const [post, setPost] = useState<Post | null>();

  useEffect(() => {
    getPostById(+params.id).then((post) => {
      setPost(post);
    });
  }, [params.id]);

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'max-h-[90vh] min-h-[90vh] md:min-h-[65%] md:max-h-[65%] max-w-full md:max-w-[70vw] 2xl:max-w-[50%] scrollbar overflow-y-scroll md:overflow-y-auto '
        )}
      >
        {post ? (
          <>
            <ArticleHeader title={post.title} author={post.author} />
            <ArticleContent content={post.content} excerpts={excerpts} />
          </>
        ) : (
          <Loading />
        )}
      </DialogContent>
    </Dialog>
  );
}

type ArticleHeaderProps = {
  title: string;
  author: string;
};

function ArticleHeader({ title, author }: ArticleHeaderProps) {
  return (
    <DialogHeader className='mt-2 mb-6 text-left'>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription asChild>
        <p>{author}</p>
      </DialogDescription>
    </DialogHeader>
  );
}

export type ArticleContentProps = {
  content: string;
  excerpts: Excerpt[];
};

function ArticleContent({ content, excerpts }: ArticleContentProps) {
  const highLightedText = useMemo(
    () => highlightText(content, excerpts),
    [content, excerpts]
  );

  return (
    <>
      <div className={styles.postContent}>
        {excerpts ? parse(highLightedText) : parse(content)}
      </div>
      {excerpts.length > 1 && (
        <DialogFooter>
          <Legend />
        </DialogFooter>
      )}
    </>
  );
}

function Legend() {
  return (
    <div className='mt-6 ml-auto'>
      <p className='text-sm'>Legend:</p>
      <ul className='text-xs'>
        <li className='bg-yellow-100 px-2 font-light'>Low Weight</li>
        <li className='bg-yellow-500/40 px-2 font-medium'>Medium Weight</li>
        <li className='bg-red-300 px-2 font-semibold'>Heavy Weight</li>
      </ul>
    </div>
  );
}

function LoadingContent() {
  return (
    <div className='flex flex-col gap-y-4'>
      <Skeleton className='h-6 w-1/2 mb-4' />
      <Skeleton className='h-4 w-full' />
      <Skeleton className='h-4 w-full ' />
      <Skeleton className='h-4 w-2/3' />
    </div>
  );
}

function LoadingHeader() {
  return (
    <div className='flex flex-col space-y-1.5 text-center sm:text-left my-2'>
      <Skeleton className='h-5 w-[300px]' />
      <Skeleton className='h-4 w-[200px]' />
    </div>
  );
}

function Loading() {
  return (
    <div className='grid'>
      <LoadingHeader />
      <div className='flex flex-col h-full mt-10 justify-evenly'>
        <div className='space-y-12 flex flex-col'>
          <LoadingContent />
          <LoadingContent />
          <LoadingContent />
        </div>
      </div>
    </div>
  );
}
