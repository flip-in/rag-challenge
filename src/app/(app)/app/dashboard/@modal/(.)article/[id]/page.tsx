'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn, highlightText } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import styles from '@/components/ui/dialog.module.css';
import { useEffect, useState } from 'react';
import { getPostById } from '@/actions/actions';
import { Post } from '@prisma/client';
import parse from 'html-react-parser';
import { Excerpt } from '@/lib/types';

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

  console.log(excerpts);

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'max-h-screen md:max-h-[70vh] scrollbar overflow-y-scroll md:overflow-y-auto max-w-full md:max-w-[70%] ',
          styles
        )}
      >
        <DialogHeader>
          <DialogTitle>{post ? post.title : 'title'}</DialogTitle>
          <DialogDescription asChild>
            <p>{post ? post.author : 'author'}</p>
          </DialogDescription>
        </DialogHeader>
        {post && (
          <div className={styles.postContent}>
            {excerpts
              ? parse(highlightText(post.content, excerpts))
              : parse(post.content)}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
