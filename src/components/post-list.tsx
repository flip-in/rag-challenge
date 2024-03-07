import { Post } from '@prisma/client';
import { Annotation } from '@/lib/types';
import Link from 'next/link';

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      <ul className='bg-white border-b border-light my-4 md:my-0'>
        {posts.map((post) => {
          return (
            <li key={post.id} className='flex w-full cursor-pointer'>
              <Link
                href={`/app/dashboard/article/${post.id}`}
                scroll={false}
                className='text-left w-full'
              >
                <div className=' p-4 border-b border-light hover:bg-zinc-100'>
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
