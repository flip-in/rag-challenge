'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn, highlightText } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import styles from '@/components/ui/dialog.module.css';
import { Suspense, useEffect, useState } from 'react';
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
  console.log(searchParams);
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
          'max-h-screen min-h-screen md:min-h-[70vh] md:max-h-[70vh] scrollbar overflow-y-scroll md:overflow-y-auto max-w-full md:max-w-[70%] ',
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

function ArticleContent({ content, excerpts }: ArticleContentProps) {
  return (
    <div className={styles.postContent}>
      {excerpts ? parse(highlightText(content, excerpts)) : parse(content)}
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
