'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CreateArticleForm from '@/features/articles/components/CreateArticleForm';
import { createArticle } from '@/features/articles/services/articleService';
import type { Article } from '@/features/articles/types';

export default function CreateArticle() {
  const [form, setForm] = useState<Partial<Article>>({
    article_status: 'DRAFT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const toast = useRef<Toast>(null);

  // Check if user has entered any data into the form
  const hasFormData = useCallback(() => {
    if (isSubmitted) return false;
    return !!(
      form.article_title?.toString().trim() ||
      form.article_description?.toString().trim() ||
      form.article_author?.toString().trim() ||
      form.article_content?.toString().trim() ||
      form.article_source?.toString().trim() ||
      form.article_source_url?.toString().trim() ||
      form.article_image
    );
  }, [form, isSubmitted]);

  // Handle browser back/close with beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasFormData()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasFormData]);

  // Intercept in-app navigation via popstate (browser back button within SPA)
  useEffect(() => {
    const handlePopState = () => {
      if (hasFormData()) {
        // Push the current state back so user stays on this page
        window.history.pushState(null, '', window.location.href);
        setPendingNavigation('/articles');
        setShowDraftDialog(true);
      }
    };

    // Push current state so we can detect popstate
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [hasFormData]);

  const onChange = (key: keyof Article, value: string | string[] | File) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const saveDraft = async () => {
    try {
      setLoading(true);
      const payload: Partial<Article> = { ...form, article_status: 'DRAFT' };
      await createArticle(payload);
      toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Artikel disimpan sebagai draft' });
      setIsSubmitted(true);
      setShowDraftDialog(false);
      setTimeout(() => {
        router.push(pendingNavigation || '/articles');
      }, 500);
    } catch (e: any) {
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: e?.message || 'Gagal menyimpan draft'
      });
      setShowDraftDialog(false);
    } finally {
      setLoading(false);
    }
  };

  const discardAndNavigate = () => {
    setIsSubmitted(true); // Prevent further prompts
    setShowDraftDialog(false);
    router.push(pendingNavigation || '/articles');
  };

  const cancelNavigation = () => {
    setShowDraftDialog(false);
    setPendingNavigation(null);
  };

  // Public method to trigger the draft dialog from outside (e.g. back button in form)
  const handleBackNavigation = () => {
    if (hasFormData()) {
      setPendingNavigation('/articles');
      setShowDraftDialog(true);
    } else {
      router.push('/articles');
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const title = form.article_title as string | undefined;
      const description = form.article_description as string | undefined;
      const author = form.article_author as string | undefined;
      const image = form.article_image;

      if (!title?.trim()) {
        toast.current?.show({ severity: 'warn', summary: 'Validasi', detail: 'Judul artikel wajib diisi' });
        return;
      }
      if (!description?.trim()) {
        toast.current?.show({ severity: 'warn', summary: 'Validasi', detail: 'Deskripsi artikel wajib diisi' });
        return;
      }
      if (!author?.trim()) {
        toast.current?.show({ severity: 'warn', summary: 'Validasi', detail: 'Author artikel wajib diisi' });
        return;
      }
      if (!image) {
        toast.current?.show({ severity: 'warn', summary: 'Validasi', detail: 'Gambar artikel wajib diunggah' });
        return;
      }

      const payload: Partial<Article> = { ...form };
      await createArticle(payload);
      setIsSubmitted(true);
      toast.current?.show({ severity: 'success', summary: 'Berhasil', detail: 'Artikel berhasil dibuat' });
      router.push('/articles');
    } catch (e: any) {
      const errorMessage = e?.message || 'Tidak bisa membuat artikel';
      setError(new Error(errorMessage));
      toast.current?.show({
        severity: 'error',
        summary: 'Gagal',
        detail: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !showDraftDialog) {
    return <div className="card">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <Toast ref={toast} />
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-4xl text-red-500 mb-3" />
          <p className="text-red-600">Gagal membuat artikel: {error.message}</p>
        </div>
      </div>
    );
  }

  const draftDialogFooter = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Tidak, Buang"
        icon="pi pi-times"
        severity="danger"
        text
        onClick={discardAndNavigate}
      />
      <Button
        label="Batal"
        icon="pi pi-arrow-left"
        severity="secondary"
        text
        onClick={cancelNavigation}
      />
      <Button
        label="Ya, Simpan Draft"
        icon="pi pi-save"
        onClick={saveDraft}
        loading={loading}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />

      <Dialog
        header="Simpan sebagai Draft?"
        visible={showDraftDialog}
        onHide={cancelNavigation}
        style={{ width: '450px' }}
        footer={draftDialogFooter}
        modal
        closable={false}
      >
        <div className="flex align-items-center gap-3">
          <i className="pi pi-exclamation-triangle text-4xl text-yellow-500" />
          <p className="m-0">
            Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin menyimpan artikel ini sebagai draft?
          </p>
        </div>
      </Dialog>

      <div className="mb-3">
        <Button
          label="Kembali ke Articles"
          icon="pi pi-arrow-left"
          text
          onClick={handleBackNavigation}
        />
      </div>

      <CreateArticleForm
        value={form}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
        submitLabel="Create Article"
      />
    </>
  );
}
