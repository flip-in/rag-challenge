import { getPostById } from '@/actions/actions';
import { Excerpt } from '@/lib/types';
import ArticleDialog from '@/components/article-dialog';

type ArticleModalProps = {
  params: { id: string };
  searchParams: { excerpts: string };
};

export default async function ArticleModal({
  params,
  searchParams,
}: ArticleModalProps) {
  const excerpts = JSON.parse(searchParams.excerpts || '[]') as Excerpt[];
  const id = +params.id;
  const post = await getPostById(id);

  return <ArticleDialog post={post} excerpts={excerpts} />;
}
