'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

import { getQrContentByUuid } from '@/features/qr/services/qrService';
import type { QrContent } from '@/features/qr/types';

export default function QrContentView() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const contentUuid = decodeURIComponent(`${params?.content_uuid || ''}`);
    const contentBook = searchParams.get('content_book') || '';

    const [content, setContent] = useState<QrContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const backUrl = contentBook
        ? `/qr/contents?content_book=${encodeURIComponent(contentBook)}`
        : '/qr/contents';

    useEffect(() => {
        if (!contentUuid) return;

        const load = async () => {
            try {
                setLoading(true);
                const data = await getQrContentByUuid(contentUuid, {
                    ...(contentBook ? { content_book: contentBook } : {})
                });
                if (!data) {
                    setNotFound(true);
                    setContent(null);
                } else {
                    setContent(data);
                    setNotFound(false);
                }
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [contentUuid, contentBook]);

    if (loading) {
        return (
            <div className="card">
                <div className="flex align-items-center gap-2 mb-4">
                    <Skeleton width="6rem" height="2rem" />
                </div>
                <Skeleton width="100%" height="320px" className="mb-4 border-round-xl" />
                <Skeleton width="60%" height="2.2rem" className="mb-2" />
                <Skeleton width="30%" height="1rem" className="mb-4" />
                <Skeleton width="100%" height="1rem" className="mb-2" />
                <Skeleton width="80%" height="1rem" />
            </div>
        );
    }

    if (notFound || !content) {
        return (
            <div className="card flex flex-column align-items-center justify-content-center py-8 gap-3">
                <i className="pi pi-qrcode text-6xl text-400" />
                <h4 className="m-0 text-700">Konten tidak ditemukan</h4>
                <p className="text-500 m-0">
                    UUID: <code>{contentUuid}</code>
                </p>
                <Button
                    label="Kembali ke Daftar Konten"
                    icon="pi pi-arrow-left"
                    outlined
                    onClick={() => router.push(backUrl)}
                />
            </div>
        );
    }

    const imageSrc = content.content_image?.trim() ? content.content_image : '/no-image.png';
    const isHtml = `${content.content_type || ''}`.toUpperCase() === 'HTML';

    return (
        <div className="card">
            <Toolbar
                start={<Button label="Kembali" icon="pi pi-arrow-left" text onClick={() => router.push(backUrl)} />}
                className="mb-4"
            />

            <div
                className="w-full border-round-xl overflow-hidden mb-4"
                style={{ maxHeight: '380px', background: 'var(--surface-100)' }}
            >
                <img
                    src={imageSrc}
                    alt={content.content_title || 'content'}
                    style={{
                        width: '100%',
                        height: '380px',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                    onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/no-image.png';
                    }}
                />
            </div>

            <div className="flex align-items-center gap-2 flex-wrap mb-3">
                <Tag value={(content.content_type || '-').toUpperCase()} severity="info" />
                <Tag
                    value={content.content_book || '-'}
                    icon="pi pi-book"
                    style={{ background: 'var(--surface-400)', color: 'var(--surface-0)' }}
                />
                {content.content_qrcode ? (
                    <Tag value={content.content_qrcode} icon="pi pi-qrcode" severity="info" />
                ) : null}
            </div>

            <h2 className="m-0 mb-2 line-height-3" style={{ fontSize: '1.75rem' }}>
                {content.content_title || content.book_title || '-'}
            </h2>

            <small className="text-500 block mb-4 font-mono">{content.content_uuid || '-'}</small>

            <Divider />

            <div className="grid mb-4">
                <div className="col-12 md:col-4">
                    <div className="flex flex-column gap-1">
                        <span className="text-500 text-sm">Buku</span>
                        <span className="font-medium">
                            <i className="pi pi-book mr-1 text-400" />
                            {content.book_title || content.content_book || '-'}
                        </span>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className="flex flex-column gap-1">
                        <span className="text-500 text-sm">QR File</span>
                        <span className="font-medium font-mono text-sm">
                            <i className="pi pi-qrcode mr-1 text-400" />
                            {content.content_qrcode || '-'}
                        </span>
                    </div>
                </div>
                <div className="col-12 md:col-4">
                    <div className="flex flex-column gap-1">
                        <span className="text-500 text-sm">Urutan</span>
                        <span className="font-medium">
                            <i className="pi pi-sort-numeric-down mr-1 text-400" />
                            {content.content_sequence ?? 0}
                        </span>
                    </div>
                </div>
            </div>

            {content.content_caption && content.content_caption !== '-' ? (
                <>
                    <Divider />
                    <p className="text-600 line-height-3 m-0 mb-4">{content.content_caption}</p>
                </>
            ) : null}

            <Divider />

            {isHtml && content.content_value ? (
                <div
                    className="article-body line-height-3"
                    style={{ fontSize: '1rem', color: 'var(--text-color)' }}
                    dangerouslySetInnerHTML={{ __html: content.content_value }}
                />
            ) : content.content_value ? (
                <pre className="surface-100 border-round p-3 overflow-auto white-space-pre-wrap m-0">
                    {content.content_value}
                </pre>
            ) : (
                <p className="text-500 font-italic m-0">Tidak ada konten.</p>
            )}
        </div>
    );
}
