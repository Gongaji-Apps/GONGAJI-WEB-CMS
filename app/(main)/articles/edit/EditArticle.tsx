'use client';
import { useRef, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import ArticleForm from '@/features/articles/components/ArticleForm';
import { useArticleBySlug, useUpdateArticle } from '@/features/articles/hooks/useArticle';
import type { Article } from '@/features/articles/types';

export default function EditArticle() {
  const params = useParams();
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [form, setForm] = useState<Partial<Article>>({});

  const slug = Array.isArray(params?.article_slug)
    ? params.article_slug[0]
    : params?.article_slug;

  // React Query dengan caching
  const { data: article, isLoading: loadingInitial, error } = useArticleBySlug(slug);
  const updateMutation = useUpdateArticle();

  // Sync form data ketika article data berubah
  useEffect(() => {
    if (article) {
      setForm(article);
    }
  }, [article]);

  const onChange = (key: keyof Article, value: string | string[] | File) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    try {
      const articleUuid = form.article_uuid as string | undefined;
      if (!articleUuid) {
        toast.current?.show({ severity: 'error', summary: 'Gagal', detail: 'UUID artikel tidak ditemukan' });
        return;
      }

      await updateMutation.mutateAsync({ articleUuid, data: form });
      toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Artikel berhasil diupdate' });
      router.push('/articles');
    } catch (e: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: e?.message || 'Tidak bisa update artikel'
      });
    }
  };

  if (loadingInitial) {
    return <div className="card">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <Toast ref={toast} />
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-4xl text-red-500 mb-3" />
          <p className="text-red-600">Gagal memuat artikel: {(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast ref={toast} />
      <ArticleForm
        value={form}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={updateMutation.isPending}
        submitLabel="Update Article"
      />
    </>
  );
}
