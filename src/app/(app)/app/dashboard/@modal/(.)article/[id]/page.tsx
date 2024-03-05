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

const ArticleModal = ({ params, searchParams }: ArticleModalProps) => {
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
          'max-h-screen min-h-screen md:min-h-[70vh] md:max-h-[70vh] scrollbar overflow-y-scroll md:overflow-y-auto max-w-full md:max-w-[70%] lg:max-w-[60%] ',
          styles
        )}
      >
        {post ? (
          <ArticleHeader title={post.title} author={post.author} />
        ) : (
          <Loading />
        )}
        {post ? (
          <ArticleContent content={post.content} excerpts={excerpts} />
        ) : (
          <Loading />
        )}
        {excerpts.length > 1 && (
          <DialogFooter>
            <Legend />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;

type ArticleHeaderProps = {
  title: string;
  author: string;
};

function ArticleHeader({ title, author }: ArticleHeaderProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription asChild>
          <p>{author}</p>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}

type ArticleContentProps = {
  content: string;
  excerpts: Excerpt[];
};

export function ArticleContent({ content, excerpts }: ArticleContentProps) {
  const highLightedText = useMemo(
    () => highlightText(content, excerpts),
    [content, excerpts]
  );

  return (
    <div className={styles.postContent}>
      {excerpts ? parse(highLightedText) : parse(content)}
    </div>
  );
}

export function Legend() {
  return (
    <div>
      <p className='text-sm'>Legend:</p>
      <ul className='text-xs'>
        <li className='bg-yellow-100 px-2 font-light'>Low Weight</li>
        <li className='bg-yellow-500/40 px-2 font-medium'>Medium Weight</li>
        <li className='bg-red-300 px-2 font-semibold'>Heavy Weight</li>
      </ul>
    </div>
  );
}

function Loading() {
  return (
    <div className='flex flex-col items-center gap-y-4 pt-28'>
      <Skeleton className='h-4 w-2/3 bg-neutral-400' />
      <Skeleton className='h-4 w-2/3 bg-neutral-400' />
      <Skeleton className='h-4 w-2/3 bg-neutral-400' />
    </div>
  );
}
