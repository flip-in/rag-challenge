import { Article } from '@prisma/client';
import Link from 'next/link';

type ArticleListProps = {
  articles: Article[];
};

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <>
      <ul className='bg-white border-b border-light my-4 md:my-0'>
        {articles.map((article) => {
          return (
            <li key={article.id} className='flex w-full cursor-pointer'>
              <Link
                href={`/app/dashboard/article/${article.id}`}
                scroll={false}
                className='text-left w-full'
                prefetch
              >
                <div className=' p-4 border-b border-light hover:bg-zinc-100'>
                  <h2 className='text-md'>{article.title}</h2>
                  <p className='text-sm'>{article.author}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
