import { getArticleById } from '@/actions/actions';
import ContentBlock from '@/components/content-block';
import H1 from '@/components/h1';
import { Excerpt } from '@/lib/types';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';
import ArticleContent from '@/components/article-content';

type PageProps = {
  params: { id: string };
  searchParams: { excerpts: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = +params.id;
  const article = await getArticleById(id);

  return {
    title: article.title + ' | IntelInsight',
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const excerpts = JSON.parse(searchParams.excerpts || '[]') as Excerpt[];
  const article = await getArticleById(+params.id);

  return (
    <main className='my-16'>
      <ContentBlock className='min-h-[80vh] md:p-12 p-4 bg-neutral-50'>
        <H1 className='capitalize'>{article.title}</H1>
        <p className='mt-2'>{article.author}</p>
        <div className='mt-8'>
          <Suspense fallback={<Loading />} key={params.id}>
            <ArticleContent content={article.content} excerpts={excerpts} />
          </Suspense>
        </div>
      </ContentBlock>
    </main>
  );
}
