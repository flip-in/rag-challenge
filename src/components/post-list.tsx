'use client';

import { Post } from '@prisma/client';
import styles from '@/components/ui/dialog.module.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { Annotation } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PostListProps = {
  posts: Post[];
  sourceArticle: Annotation;
};

export default function PostList({ posts, sourceArticle }: PostListProps) {
  return (
    <>
      <ul className='bg-white border-b border-light'>
        {posts.map((post) => {
          return (
            <li key={post.id} className='flex w-full cursor-pointer'>
              {/* <PostListItem post={post} sourceArticle={sourceArticle} /> */}
              <Link href={`/app/dashboard/article/${post.id}`} scroll={false}>
                <div className=' p-4 border-b border-light hover:bg-zinc-100 text-left w-full'>
                  <h2 className='text-md'>{post.title}</h2>
                  <p className='text-sm'>{post.author}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

// function PostListItem({ post, sourceArticle }: { post: Post }) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   useEffect(() => {
//     if (sourceArticle.id) {
//       setIsDialogOpen(true);
//     }
//   }, [sourceArticle.id]);
//   console.log('sourceArticle.id', sourceArticle.id);
//   console.log('post.id', post.id);
//   console.log('isDialogOpen', isDialogOpen);

//   return (
//     <>
//       <div
//         onClick={() => setIsDialogOpen(true)}
//         key={post.id}
//         className=' p-4 border-b border-light hover:bg-zinc-100 text-left w-full'
//       >
//         <h2 className='text-md'>{post.title}</h2>
//         <p className='text-sm'>{post.author}</p>
//       </div>
//       <MyDialog
//         post={post}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//       />
//     </>
//   );
// }

// function MyDialog({ post, open, onOpenChange }) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         className={cn(
//           'max-h-screen md:max-h-[70vh] scrollbar overflow-y-scroll md:overflow-y-auto max-w-full md:max-w-[70%] ',
//           styles
//         )}
//       >
//         <DialogHeader>
//           <DialogTitle>{post.title}</DialogTitle>
//           <DialogDescription asChild>
//             <p>{post.author}</p>
//           </DialogDescription>
//         </DialogHeader>
//         <div className={styles.postContent}>
//           {post.content && parse(post.content)}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
