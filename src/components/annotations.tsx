import queryString from 'query-string';
import { getArticleById } from '@/actions/actions';
import { Annotation } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type AnnotationsProps = {
  sources: Annotation[];
};

export default function Annotations({ sources }: AnnotationsProps) {
  return (
    <div className='ml-auto text-right'>
      <p className='text-sm mt-4'>Sources: </p>
      <ul className='text-sm mt-2'>
        {sources.map((source, index) => {
          return (
            <li
              key={index}
              className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
            >
              <Annotation source={source} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type AnnotationProps = {
  source: Annotation;
};

function Annotation({ source }: AnnotationProps) {
  const [title, setTitle] = useState('');

  const createQueryString = useCallback((obj: Record<string, any>) => {
    return queryString.stringify({
      excerpts: JSON.stringify(obj.excerpts),
    });
  }, []);

  useEffect(() => {
    getArticleById(source.id).then((article) => {
      setTitle(article.title);
    });
  }, [source.id]);

  return (
    <Link
      href={{
        pathname: `/app/dashboard/article/${source.id}`,
        query: createQueryString(source),
      }}
      prefetch
      scroll={false}
    >
      {title}
    </Link>
  );
}
