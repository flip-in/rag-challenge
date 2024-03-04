'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import styles from '@/components/ui/dialog.module.css';
import { useEffect, useState } from 'react';
import { getPostById } from '@/actions/actions';
import { Post } from '@prisma/client';
import parse from 'html-react-parser';
import { Annotation } from '@/lib/types';

type ArticleModalProps = {
  params: { id: string };
  searchParams: Annotation;
};

const ArticleModal = ({ params, searchParams }: ArticleModalProps) => {
  // console.log(params);
  console.log(searchParams);
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
            {post.content && parse(post.content)}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
