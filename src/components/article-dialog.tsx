'use client';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Article } from '@prisma/client';
import { Excerpt } from '@/lib/types';
import ArticleHeader from './article-header';
import ArticleContent from './article-content';
import Skeleton from './skeleton';
import { cn } from '@/lib/utils';

type ArticleDialogProps = {
  article: Article;
  excerpts: Excerpt[];
};

export default function ArticleDialog({
  article,
  excerpts,
}: ArticleDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'max-h-[90vh] min-h-[90vh] md:min-h-[65%] md:max-h-[65%] max-w-full md:max-w-[70vw] 2xl:max-w-[50%] scrollbar overflow-y-scroll md:overflow-y-auto '
        )}
      >
        {article ? (
          <>
            <ArticleHeader title={article.title} author={article.author} />
            <ArticleContent content={article.content} excerpts={excerpts} />
          </>
        ) : (
          <Loading />
        )}
      </DialogContent>
    </Dialog>
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
