import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ArticleHeaderProps = {
  title: string;
  author: string;
};

export default function ArticleHeader({ title, author }: ArticleHeaderProps) {
  return (
    <DialogHeader className='mt-2 mb-6 text-left'>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription asChild>
        <p>{author}</p>
      </DialogDescription>
    </DialogHeader>
  );
}
