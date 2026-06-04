'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

import { QrTitleColumn, qrActionsColumnStyle, qrDataTableProps } from '@/features/qr/components/qrListUi';
import { getQrBooks, getQrContentPlaylist, getQrSeries } from '@/features/qr/services/qrService';
import type { QrBook, QrContent, QrSeries } from '@/features/qr/types';

export default function QrPlaylistList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useRef<Toast>(null);

    const initialBook = searchParams.get('content_book') || '';
    const initialSeries = searchParams.get('content_series') || '';
    const initialQrcode = searchParams.get('content_qrcode') || '';

    const [rows, setRows] = useState<QrContent[]>([]);
    const [books, setBooks] = useState<QrBook[]>([]);
    const [seriesOptions, setSeriesOptions] = useState<QrSeries[]>([]);
    const [loading, setLoading] = useState(false);

    const [bookFilter, setBookFilter] = useState(initialBook);
    const [seriesFilter, setSeriesFilter] = useState(initialSeries);
    const [qrcodeFilter, setQrcodeFilter] = useState(initialQrcode);

    const loadPlaylist = useCallback(async () => {
        if (!bookFilter) {
            setRows([]);
            return;
        }
        try {
            setLoading(true);
            const result = await getQrContentPlaylist({
                content_book: bookFilter,
                content_series: seriesFilter || undefined,
                content_qrcode: qrcodeFilter || undefined
            });
            setRows(result.data as QrContent[]);
        } catch (e: any) {
            setRows([]);
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: e?.message || 'Tidak bisa memuat playlist'
            });
        } finally {
            setLoading(false);
        }
    }, [bookFilter, seriesFilter, qrcodeFilter]);

    useEffect(() => {
        const init = async () => {
            try {
                const bookData = await getQrBooks();
                setBooks(bookData);
                setBookFilter((current) => current || bookData[0]?.book_code || '');
            } catch {
                /* optional */
            }
        };
        init();
    }, []);

    useEffect(() => {
        const loadSeriesForBook = async () => {
            if (!bookFilter) {
                setSeriesOptions([]);
                setSeriesFilter('');
                return;
            }
            try {
                const data = await getQrSeries({ series_book: bookFilter });
                setSeriesOptions(data);
                setSeriesFilter((current) =>
                    current && data.some((s) => s.series_code === current) ? current : ''
                );
            } catch {
                setSeriesOptions([]);
            }
        };
        loadSeriesForBook();
    }, [bookFilter]);

    useEffect(() => {
        if (bookFilter) {
            loadPlaylist();
        }
    }, [bookFilter, seriesFilter, qrcodeFilter, loadPlaylist]);

    const titleBody = (row: QrContent) => (
        <QrTitleColumn
            title={row.content_title || row.book_title}
            code={row.content_qrcode}
            image={row.content_image}
            codeLabel="QR"
            fallbackTitle="Playlist Item"
        />
    );

    const typeBody = (row: QrContent) => {
        const type = `${row.content_type || ''}`.toUpperCase();
        return <Tag value={type || '-'} severity={type === 'HTML' ? 'info' : 'warning'} />;
    };

    const seriesBody = (row: QrContent) => (
        <span>{row.content_series || row.series_title || '-'}</span>
    );

    return (
        <div className="card">
            <Toast ref={toast} />

            <Toolbar start={<h5 className="m-0">QR Content Playlist</h5>} className="mb-4" />

            <div className="grid mb-3">
                <div className="col-12 md:col-4">
                    <Dropdown
                        value={bookFilter}
                        options={books}
                        optionLabel="book_title"
                        optionValue="book_code"
                        onChange={(e) => setBookFilter(e.value || '')}
                        placeholder="Filter book"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <Dropdown
                        value={seriesFilter}
                        options={[{ series_caption: 'All Series', series_code: '' }, ...seriesOptions]}
                        optionLabel="series_caption"
                        optionValue="series_code"
                        onChange={(e) => setSeriesFilter(e.value || '')}
                        placeholder="Filter series (opsional)"
                        showClear
                        disabled={!bookFilter}
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-4">
                    <InputText
                        value={qrcodeFilter}
                        onChange={(e) => setQrcodeFilter(e.target.value)}
                        placeholder="Filter content_qrcode (opsional)"
                        className="w-full"
                    />
                </div>
            </div>

            {!bookFilter ? (
                <p className="text-500 m-0">Pilih buku untuk memuat playlist.</p>
            ) : (
                <DataTable
                    value={rows}
                    loading={loading}
                    emptyMessage="Playlist kosong atau tidak ditemukan."
                    {...qrDataTableProps}
                >
                    <Column header="Title" body={titleBody} style={{ minWidth: '250px' }} />
                    <Column field="content_book" header="Book" style={{ minWidth: '140px' }} />
                    <Column header="Series" body={seriesBody} style={{ minWidth: '140px' }} />
                    <Column header="Type" body={typeBody} style={{ minWidth: '100px' }} />
                    <Column field="content_sequence" header="Seq" style={{ minWidth: '80px' }} />
                    <Column
                        header="Actions"
                        frozen
                        alignFrozen="right"
                        style={qrActionsColumnStyle}
                        body={(row: QrContent) => (
                            <div className="flex items-center justify-content-end gap-2">
                                <Button
                                    icon="pi pi-eye"
                                    text
                                    tooltip="View Detail"
                                    onClick={() =>
                                        router.push(
                                            `/qr/contents/view/${encodeURIComponent(row.content_uuid || '')}?content_book=${encodeURIComponent(row.content_book || bookFilter)}`
                                        )
                                    }
                                    disabled={!row.content_uuid}
                                />
                            </div>
                        )}
                    />
                </DataTable>
            )}
        </div>
    );
}
