import { getPostById } from '@/actions/actions';
import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';
import { Excerpt } from '@/lib/types';
import { Metadata } from 'next';
import { ArticleContentProps } from '../../@modal/(.)article/[id]/page';
import { Suspense, useMemo } from 'react';
import Loading from './loading';
import { highlightText } from '@/lib/utils';
import parse from 'html-react-parser';
import styles from '@/components/ui/dialog.module.css';

type PageProps = {
  params: { id: string };
  searchParams: { excerpts: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = +params.id;
  const post = await getPostById(id);

  return {
    title: post.title + ' | IntelInsight',
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const excerpts = JSON.parse(searchParams.excerpts || '[]') as Excerpt[];
  const post = await getPostById(+params.id);

  return (
    <main className='my-16'>
      <ContentBlock className='min-h-[80vh] p-12'>
        <H1 className='capitalize'>{post.title}</H1>
        <p className='mt-2'>{post.author}</p>
        <div className='mt-8'>
          <Suspense fallback={<Loading />}>
            <ArticleContent content={post.content} excerpts={excerpts} />
            {excerpts.length > 1 && (
              <div className='float-right'>
                <Legend />
              </div>
            )}
          </Suspense>
        </div>
      </ContentBlock>
    </main>
  );
}

function ArticleContent({ content, excerpts }: ArticleContentProps) {
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

function Legend() {
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
