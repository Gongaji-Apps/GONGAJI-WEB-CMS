'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTablePageEvent } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

import { QrTitleColumn, qrActionsColumnStyle, qrDataTableProps } from '@/features/qr/components/qrListUi';
import { getQrBooks, getQrContents } from '@/features/qr/services/qrService';
import type { QrBook, QrContent } from '@/features/qr/types';

const ROWS_PER_PAGE = 100;

export default function QrContentsList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toast = useRef<Toast>(null);

    const initialBook = searchParams.get('content_book') || '';

    const [rows, setRows] = useState<QrContent[]>([]);
    const [books, setBooks] = useState<QrBook[]>([]);
    const [loading, setLoading] = useState(true);

    const [bookFilter, setBookFilter] = useState(initialBook);
    const [qrcodeFilter, setQrcodeFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const loadContents = useCallback(async (targetPage: number, bookCode: string, qrcode: string) => {
        try {
            setLoading(true);
            const params: Record<string, string | number> = { page: targetPage };
            if (bookCode) params.content_book = bookCode;
            if (qrcode.trim()) params.content_qrcode = qrcode.trim();

            const result = await getQrContents(params);
            setRows(result.data);
            setTotalRecords(result.dataTotal ?? result.data.length);
            setPage(result.pagination?.current ?? targetPage);
        } catch (e: any) {
            setRows([]);
            setTotalRecords(0);
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: e?.message || 'Tidak bisa memuat konten QR'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                const bookData = await getQrBooks();
                setBooks(bookData);
            } catch (e: any) {
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Filter buku',
                    detail: e?.message || 'Daftar buku tidak dimuat; menampilkan semua konten.'
                });
            }
        };
        init();
    }, []);

    useEffect(() => {
        loadContents(1, bookFilter, qrcodeFilter);
    }, [bookFilter, qrcodeFilter, loadContents]);

    const onPage = (event: DataTablePageEvent) => {
        const nextPage = (event.page ?? 0) + 1;
        loadContents(nextPage, bookFilter, qrcodeFilter);
    };

    const titleBody = (row: QrContent) => (
        <QrTitleColumn
            title={row.content_title || row.book_title}
            code={row.content_qrcode}
            image={row.content_image}
            codeLabel="QR"
            fallbackTitle="Untitled Content"
        />
    );

    const typeBody = (row: QrContent) => {
        const type = `${row.content_type || ''}`.toUpperCase();
        const severity = type === 'HTML' ? 'info' : 'warning';
        return <Tag value={type || '-'} severity={severity} />;
    };

    return (
        <div className="card">
            <Toast ref={toast} />

            <Toolbar start={<h5 className="m-0">QR Contents</h5>} className="mb-4" />

            <div className="grid mb-3">
                <div className="col-12 md:col-6">
                    <Dropdown
                        value={bookFilter}
                        options={[{ book_title: 'Semua buku', book_code: '' }, ...books]}
                        optionLabel="book_title"
                        optionValue="book_code"
                        onChange={(e) => {
                            setBookFilter(e.value ?? '');
                            setPage(1);
                        }}
                        placeholder="Filter book (opsional)"
                        showClear
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-6">
                    <InputText
                        value={qrcodeFilter}
                        onChange={(e) => setQrcodeFilter(e.target.value)}
                        placeholder="Search qrcode file"
                        className="w-full"
                    />
                </div>
            </div>

            <DataTable
                {...qrDataTableProps}
                value={rows}
                loading={loading}
                lazy
                paginator
                rows={ROWS_PER_PAGE}
                first={(page - 1) * ROWS_PER_PAGE}
                totalRecords={totalRecords}
                onPage={onPage}
                emptyMessage="Belum ada konten."
            >
                    <Column header="Title" body={titleBody} style={{ minWidth: '250px' }} />
                    <Column field="content_book" header="Book" style={{ minWidth: '140px' }} />
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
        </div>
    );
}
