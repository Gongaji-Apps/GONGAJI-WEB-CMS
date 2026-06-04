'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

import { getQrBookByCode } from '@/features/qr/services/qrService';
import type { QrBook } from '@/features/qr/types';

export default function QrBookView() {
    const params = useParams();
    const router = useRouter();
    const bookCode = decodeURIComponent(`${params?.book_code || ''}`);

    const [book, setBook] = useState<QrBook | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!bookCode) return;

        const load = async () => {
            try {
                setLoading(true);
                const data = await getQrBookByCode(bookCode);
                if (!data) {
                    setNotFound(true);
                    setBook(null);
                } else {
                    setBook(data);
                    setNotFound(false);
                }
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [bookCode]);

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

    if (notFound || !book) {
        return (
            <div className="card flex flex-column align-items-center justify-content-center py-8 gap-3">
                <i className="pi pi-book text-6xl text-400" />
                <h4 className="m-0 text-700">Buku tidak ditemukan</h4>
                <p className="text-500 m-0">
                    Code: <code>{bookCode}</code>
                </p>
                <Button
                    label="Kembali ke Daftar Buku"
                    icon="pi pi-arrow-left"
                    outlined
                    onClick={() => router.push('/qr/books')}
                />
            </div>
        );
    }

    const imageSrc = book.book_image?.trim() ? book.book_image : '/no-image.png';

    return (
        <div className="card">
            <Toolbar
                start={
                    <Button label="Kembali" icon="pi pi-arrow-left" text onClick={() => router.back()} />
                }
                end={
                    <Button
                        label="Lihat Konten"
                        icon="pi pi-qrcode"
                        outlined
                        onClick={() =>
                            router.push(`/qr/contents?content_book=${encodeURIComponent(book.book_code || '')}`)
                        }
                    />
                }
                className="mb-4"
            />

            <div
                className="w-full border-round-xl overflow-hidden mb-4"
                style={{ maxHeight: '380px', background: 'var(--surface-100)' }}
            >
                <img
                    src={imageSrc}
                    alt={book.book_title}
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
                <Tag value={book.group_name || book.book_group || '-'} icon="pi pi-tags" />
                <Tag
                    value={book.book_has_series ? 'Has Series' : 'No Series'}
                    severity={book.book_has_series ? 'success' : 'info'}
                />
            </div>

            <h2 className="m-0 mb-2 line-height-3" style={{ fontSize: '1.75rem' }}>
                {book.book_title || '-'}
            </h2>

            <small className="text-500 block mb-4 font-mono">{book.book_code || '-'}</small>

            <Divider />

            <div className="grid mb-4">
                <div className="col-12 md:col-6">
                    <div className="flex flex-column gap-1">
                        <span className="text-500 text-sm">Grup</span>
                        <span className="font-medium">
                            <i className="pi pi-folder mr-1 text-400" />
                            {book.group_name || book.book_group || '-'}
                        </span>
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="flex flex-column gap-1">
                        <span className="text-500 text-sm">Series</span>
                        <span className="font-medium">
                            <i className="pi pi-clone mr-1 text-400" />
                            {book.book_has_series ? 'Ya' : 'Tidak'}
                        </span>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="line-height-3" style={{ fontSize: '1rem', color: 'var(--text-color)' }}>
                {book.book_description?.trim() ? (
                    <p className="m-0">{book.book_description}</p>
                ) : (
                    <p className="text-500 font-italic m-0">Belum ada deskripsi.</p>
                )}
                {book.book_buy_direct ? (
                    <p className="mt-3 mb-0">
                        <span className="font-semibold">Beli langsung: </span>
                        <a href={book.book_buy_direct} target="_blank" rel="noreferrer">
                            {book.book_buy_direct}
                        </a>
                    </p>
                ) : null}
            </div>
        </div>
    );
}
