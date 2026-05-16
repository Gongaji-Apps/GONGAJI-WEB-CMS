'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Image } from 'primereact/image';


import { archiveArticle, changeArticleStatus, deleteArticle, getArticleCategories, getArticles, unarchiveArticle } from '@/features/articles/services/articleService';
import type { Article, ArticleCategory } from '@/features/articles/types';

const statusOptions = [
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Review', value: 'REVIEW' },
    { label: 'Published', value: 'PUBLISHED' }
];

export default function ArticlesList() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<ArticleCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [changingStatusUuid, setChangingStatusUuid] = useState<string | null>(null);

    const router = useRouter();
    const toast = useRef<Toast>(null);

    const loadArticles = useCallback(async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = { overview: 'TRUE' };

            if (keyword.trim()) params.keyword = keyword.trim();
            if (statusFilter) params.article_status = statusFilter;
            if (categoryFilter) params.category_uuid = categoryFilter;

            const data = await getArticles(params);
            setArticles(data);
        } finally {
            setLoading(false);
        }
    }, [keyword, statusFilter, categoryFilter]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getArticleCategories({ limit: 100, pagination: 1 });
            setCategories(data);
        };

        loadCategories();
        loadArticles();
    }, [loadArticles]);

    const onArchive = (articleUuid: string, articleSlug: string) => {
        confirmDialog({
            message: 'Arsipkan artikel ini?',
            header: 'Konfirmasi',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                await archiveArticle(articleUuid, articleSlug);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Artikel diarsipkan'
                });
                loadArticles();
            }
        });
    };

    const onDeletePermanent = (articleUuid: string) => {
        confirmDialog({
            message: 'Hapus artikel ini secara permanen? Tindakan ini tidak dapat dibatalkan.',
            header: 'Konfirmasi Hapus Permanen',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await deleteArticle(articleUuid);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Berhasil',
                        detail: 'Artikel berhasil dihapus permanen'
                    });
                    loadArticles();
                } catch (error: any) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Gagal',
                        detail: error?.message || 'Gagal menghapus artikel'
                    });
                }
            }
        });
    };

    const onUnarchive = async (articleUuid: string) => {
        try {
            await unarchiveArticle(articleUuid);
            toast.current?.show({
                severity: 'success',
                summary: 'Berhasil',
                detail: 'Artikel dikembalikan'
            });
            loadArticles();
        } catch (error: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: error?.message || 'Gagal mengembalikan artikel'
            });
        }
    };

    const onChangeStatus = async (articleUuid: string, newStatus: string, currentStatus: string) => {
        if (newStatus === currentStatus) return;

        confirmDialog({
            message: `Ubah status artikel menjadi "${newStatus}"?`,
            header: 'Konfirmasi Ubah Status',
            icon: 'pi pi-info-circle',
            accept: async () => {
                try {
                    setChangingStatusUuid(articleUuid);
                    await changeArticleStatus(articleUuid, newStatus);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Berhasil',
                        detail: `Status artikel berhasil diubah ke ${newStatus}`
                    });
                    loadArticles();
                } catch (error: any) {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Gagal',
                        detail: error?.message || 'Gagal mengubah status artikel'
                    });
                } finally {
                    setChangingStatusUuid(null);
                }
            }
        });
    };

    const statusBody = (row: Article) => {
        const currentStatus = (row.article_status || 'DRAFT').toUpperCase();
        const isArchived = currentStatus === 'ARCHIVED';
        const isPublished = currentStatus === 'PUBLISHED';
        const isChanging = changingStatusUuid === row.article_uuid;

        // Archived → static tag
        if (isArchived) {
            return <Tag value="ARCHIVED" severity="danger" />;
        }

        // Published → static tag (no going back)
        if (isPublished) {
            return <Tag value="PUBLISHED" severity="success" />;
        }

        // Determine allowed next status based on current
        // DRAFT → can only go to REVIEW
        // REVIEW → can only go to PUBLISHED
        const allowedOptions =
            currentStatus === 'DRAFT'
                ? [
                    { label: 'Draft', value: 'DRAFT' },
                    { label: 'Review', value: 'REVIEW' }
                ]
                : currentStatus === 'REVIEW'
                    ? [
                        { label: 'Review', value: 'REVIEW' },
                        { label: 'Published', value: 'PUBLISHED' }
                    ]
                    : statusOptions;

        return (
            <div className="flex align-items-center gap-2">
                <Dropdown
                    value={currentStatus}
                    options={allowedOptions}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => onChangeStatus(row.article_uuid || '', e.value, currentStatus)}
                    disabled={isChanging || !row.article_uuid}
                    className="w-full"
                    style={{ minWidth: '130px' }}
                    itemTemplate={(option) => {
                        const severity =
                            option.value === 'PUBLISHED'
                                ? 'success'
                                : option.value === 'REVIEW'
                                    ? 'warning'
                                    : 'info';
                        return <Tag value={option.label} severity={severity} />;
                    }}
                    valueTemplate={(option) => {
                        if (!option) return null;
                        const severity =
                            option.value === 'PUBLISHED'
                                ? 'success'
                                : option.value === 'REVIEW'
                                    ? 'warning'
                                    : 'info';
                        return <Tag value={option.label} severity={severity} />;
                    }}
                />
                {isChanging && <i className="pi pi-spin pi-spinner text-primary" />}
            </div>
        );
    };

    const titleBody = (row: Article) => {
        // Penanganan image source
        const imageSrc =
            typeof row.article_image === 'string' && row.article_image.trim() !== ''
                ? row.article_image
                : '/no-image.png';

        return (
            <div className="flex align-items-center gap-3 py-2">
                {/* Bagian Gambar dengan Fitur Preview & Shadow */}
                <div className="flex-shrink-0 shadow-2 border-round overflow-hidden" style={{ width: '60px', height: '60px' }}>
                    <Image
                        src={imageSrc}
                        alt={row.article_title}
                        width="60"
                        height="60"
                        preview // Memungkinkan gambar diklik untuk diperbesar
                        imageClassName="object-cover w-full h-full" // Menjaga rasio gambar tetap bagus
                        className="block"
                    />
                </div>

                {/* Bagian Teks (Judul & Slug) */}
                <div className="flex flex-column gap-1 overflow-hidden">
                    {/* Judul Artikel: Tebal, Hitam, dan titik-titik jika kepanjangan */}
                    <div
                        className="font-bold text-900 text-base line-height-2 overflow-hidden text-overflow-ellipsis white-space-nowrap"
                        style={{ maxWidth: '280px' }}
                        title={row.article_title} // Munculkan teks asli saat kursor menempel
                    >
                        {row.article_title || 'Untitled Article'}
                    </div>

                    {/* Slug Artikel: Dibuat seperti badge kecil agar lebih rapi */}
                    <div className="flex align-items-center gap-2">
                        <span
                            className="text-xs px-2 py-1 border-round-sm surface-200 text-600 font-medium tracking-tight"
                            style={{ fontSize: '10px', textTransform: 'uppercase' }}
                        >
                            Slug
                        </span>
                        <small
                            className="text-500 font-mono overflow-hidden text-overflow-ellipsis white-space-nowrap"
                            style={{ maxWidth: '200px' }}
                        >
                            /{row.article_slug || '-'}
                        </small>
                    </div>
                </div>
            </div>
        );
    };

    const article_tag = (row: Article) => (
        <span>{Number(row.article_date || 0).toLocaleString('id-ID')}</span>
    );

    const dateBody = (row: Article) => (
        <span>{Number(row.article_date || 0).toLocaleString('id-ID')}</span>
    );

    const viewsBody = (row: Article) => (
        <span>{Number(row.article_total_view || 0).toLocaleString('id-ID')}</span>
    );

    const likesBody = (row: Article) => (
        <span>{Number(row.article_total_like || 0).toLocaleString('id-ID')}</span>
    );

    const searchKeyword = async (event: AutoCompleteCompleteEvent) => {
        const query = `${event.query || ''}`.trim();
        if (!query || query.length < 2) {
            setKeywordSuggestions([]);
            return;
        }

        try {
            const data = await getArticles({
                overview: 'FALSE',
                keyword: query,
                type_search: 'FIND',
                limit: 10,
                preload_status: 'TRUE'
            });
            setKeywordSuggestions(
                data
                    .map((entry) => entry.article_title)
                    .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
                    .slice(0, 10)
            );
        } catch {
            setKeywordSuggestions([]);
        }
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <ConfirmDialog />

            <Toolbar
                start={<h5 className="m-0">Articles</h5>}
                end={
                    <Button
                        label="Create Article"
                        icon="pi pi-plus"
                        onClick={() => router.push('/articles/create')}
                    />
                }
                className="mb-4"
            />

            <div className="grid mb-3">
                <div className="col-12 md:col-6">
                    <AutoComplete
                        value={keyword}
                        suggestions={keywordSuggestions}
                        completeMethod={searchKeyword}
                        onChange={(e) => setKeyword(e.value || '')}
                        placeholder="Search title/keyword"
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <Dropdown
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.value || '')}
                        options={[
                            { label: 'All Status', value: '' },
                            { label: 'Draft', value: 'DRAFT' },
                            { label: 'Review', value: 'REVIEW' },
                            { label: 'Published', value: 'PUBLISHED' },
                            { label: 'Archived', value: 'ARCHIVED' }
                        ]}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Filter status"
                        className="w-full"
                    />
                </div>

                <div className="col-12 md:col-3">
                    <Dropdown
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.value || '')}
                        options={[{ category_name: 'All Categories', category_uuid: '' }, ...categories]}
                        optionLabel="category_name"
                        optionValue="category_uuid"
                        placeholder="Filter category"
                        className="w-full"
                    />
                </div>
            </div>

            <DataTable
                value={articles}
                loading={loading}
                paginator
                rows={10}
                scrollable
                scrollHeight="flex"
                responsiveLayout="scroll"
                emptyMessage="Belum ada artikel."
            >

                <Column header="Title" body={titleBody} style={{ minWidth: '250px' }} />
                <Column field="article_author" header="Author" style={{ minWidth: '150px' }} />
                <Column header="Status" body={statusBody} style={{ minWidth: '160px' }} />
                <Column field="article_date" body={dateBody} header="Date" style={{ minWidth: '150px' }} />
                <Column field="article_category" body={categoryFilter} header="Category" style={{ minWidth: '150px' }} />
                <Column field="article_tag" body={tagFilter} header="Tag" style={{ minWidth: '150px' }} />
                <Column header="Views" body={viewsBody} style={{ minWidth: '100px' }} />
                <Column header="Likes" body={likesBody} style={{ minWidth: '100px' }} />

                <Column
                    header="Actions"
                    frozen
                    alignFrozen="right"
                    style={{ minWidth: '150px' }}
                    body={(row: Article) => {
                        const isArchived = (row.article_status || '').toUpperCase() === 'ARCHIVED';

                        return (
                            <div className="flex items-center justify-content-end gap-2">
                                <Button
                                    icon="pi pi-eye"
                                    text
                                    tooltip="View Detail"
                                    onClick={() => router.push(`/articles/article_view/${row.article_slug}`)}
                                />

                                {isArchived ? (
                                    <>
                                        <Button
                                            icon="pi pi-undo"
                                            text
                                            severity="success"
                                            tooltip="Restore / Unarchive"
                                            onClick={() => onUnarchive(row.article_uuid || '')}
                                            disabled={!row.article_uuid}
                                        />
                                        <Button
                                            icon="pi pi-trash"
                                            text
                                            severity="danger"
                                            tooltip="Delete Permanently"
                                            onClick={() => onDeletePermanent(row.article_uuid || '')}
                                            disabled={!row.article_uuid}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            icon="pi pi-pencil"
                                            text
                                            tooltip="Edit Article"
                                            onClick={() => router.push(`/articles/edit/${row.article_slug}`)}
                                        />
                                        <Button
                                            icon="pi pi-inbox"
                                            text
                                            severity="warning"
                                            tooltip="Archive"
                                            onClick={() => onArchive(row.article_uuid || '', row.article_slug || '')}
                                            disabled={!row.article_uuid}
                                        />
                                    </>
                                )}
                            </div>
                        );
                    }}
                />
            </DataTable>
        </div>
    );
}
