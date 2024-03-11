import { Excerpt } from '@/lib/types';
import { highlightText } from '@/lib/utils';
import { useMemo } from 'react';
import { DialogFooter } from '@/components/ui/dialog';
import parse from 'html-react-parser';
import styles from '@/components/styles/article-content.module.css';

type ArticleContentProps = {
  content: string;
  excerpts: Excerpt[];
};

export default function ArticleContent({
  content,
  excerpts,
}: ArticleContentProps) {
  const highLightedText = useMemo(
    () => highlightText(content, excerpts),
    [content, excerpts]
  );

  return (
    <>
      <div className={styles.articleContent}>
        {excerpts ? parse(highLightedText) : parse(content)}
      </div>
      {excerpts.length > 1 && (
        <DialogFooter>
          <Legend />
        </DialogFooter>
      )}
    </>
  );
}

function Legend() {
  return (
    <div className='mt-6 ml-auto'>
      <p className='text-sm'>Legend:</p>
      <ul className='text-xs'>
        <li className='bg-yellow-100 px-2 font-light'>Low Weight</li>
        <li className='bg-yellow-500/40 px-2 font-medium'>Medium Weight</li>
        <li className='bg-red-300 px-2 font-semibold'>Heavy Weight</li>
      </ul>
    </div>
  );
}
