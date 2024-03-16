import { getArticleById } from '@/actions/actions';
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
  const article = await getArticleById(id);

  return <ArticleDialog article={article} excerpts={excerpts} />;
}
