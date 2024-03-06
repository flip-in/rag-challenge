import queryString from 'query-string';
import { getPostById } from '@/actions/actions';
import { Annotation } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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
  const router = useRouter();
  const [title, setTitle] = useState('');

  const createQueryString = useCallback((obj: Record<string, any>) => {
    return queryString.stringify({
      excerpts: JSON.stringify(obj.excerpts),
    });
  }, []);

  const handleClick = () => {
    const newQueryString = createQueryString(source);
    router.push(`/app/dashboard/article/${source.id}?` + newQueryString, {
      scroll: false,
    });
  };

  useEffect(() => {
    getPostById(source.id).then((post) => {
      setTitle(post ? post.title : 'No title');
    });
  }, [source.id]);

  return (
    <div className='cursor-pointer' onClick={handleClick}>
      {title}
    </div>
  );
}
