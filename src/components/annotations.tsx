import queryString from 'query-string';
import { getPostById } from '@/actions/actions';
import { Annotation } from '@/lib/types';
import { get } from 'http';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type AnnotationsProps = {
  sources: Annotation[];
};

export default function Annotations({ sources }: AnnotationsProps) {
  return (
    <>
      <p>Sources: </p>
      <ul>
        {sources.map((source, index) => {
          return (
            <li key={index}>
              <Annotation source={source} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

type AnnotationProps = {
  source: Annotation;
};

function Annotation({ source }: AnnotationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    getPostById(source.id).then((post) => {
      setTitle(post ? post.title : 'No title');
    });
  }, [source.id]);

  const createQueryString = useCallback(
    (obj: Record<string, any>) => {
      return queryString.stringify({
        excerpts: JSON.stringify(obj.excerpts),
      });
    },
    [searchParams]
  );

  const handleClick = () => {
    const newQueryString = createQueryString(source);
    router.push(`/app/dashboard/article/${source.id}?` + newQueryString, {
      scroll: false,
    });
  };

  return (
    <div className='cursor-pointer' onClick={handleClick}>
      {title}
    </div>
  );
}
