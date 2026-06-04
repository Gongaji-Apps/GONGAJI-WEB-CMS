'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

import { QrTitleColumn, qrDataTableProps } from '@/features/qr/components/qrListUi';
import { getQrBooks, getQrSeries } from '@/features/qr/services/qrService';
import type { QrBook, QrSeries } from '@/features/qr/types';

export default function QrSeriesList() {
    const toast = useRef<Toast>(null);

    const [rows, setRows] = useState<QrSeries[]>([]);
    const [books, setBooks] = useState<QrBook[]>([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState('');
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const [bookFilter, setBookFilter] = useState('');

    const loadSeries = useCallback(async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = {};
            if (keyword.trim()) params.series_code = keyword.trim();
            if (bookFilter) params.series_book = bookFilter;
            const data = await getQrSeries(params);
            setRows(data);
        } catch (e: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: e?.message || 'Tidak bisa memuat series QR'
            });
        } finally {
            setLoading(false);
        }
    }, [keyword, bookFilter]);

    useEffect(() => {
        const init = async () => {
            try {
                const bookData = await getQrBooks();
                setBooks(bookData);
            } catch {
                /* optional */
            }
        };
        init();
        loadSeries();
    }, [loadSeries]);

    const searchKeyword = async (event: AutoCompleteCompleteEvent) => {
        const query = `${event.query || ''}`.trim();
        if (!query || query.length < 2) {
            setKeywordSuggestions([]);
            return;
        }
        try {
            const data = await getQrSeries({ series_code: query });
            setKeywordSuggestions(
                data
                    .map((entry) => entry.series_code)
                    .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
                    .slice(0, 10)
            );
        } catch {
            setKeywordSuggestions([]);
        }
    };

    const titleBody = (row: QrSeries) => (
        <QrTitleColumn
            title={row.series_caption || row.series_title}
            code={row.series_code}
            image={row.series_image}
            codeLabel="Series"
            fallbackTitle="Untitled Series"
        />
    );

    return (
        <div className="card">
            <Toast ref={toast} />

            <Toolbar start={<h5 className="m-0">QR Series</h5>} className="mb-4" />

            <div className="grid mb-3">
                <div className="col-12 md:col-6">
                    <AutoComplete
                        value={keyword}
                        suggestions={keywordSuggestions}
                        completeMethod={searchKeyword}
                        onChange={(e) => setKeyword(e.value || '')}
                        placeholder="Search series code"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Dropdown
                        value={bookFilter}
                        onChange={(e) => setBookFilter(e.value || '')}
                        options={[{ book_title: 'All Books', book_code: '' }, ...books]}
                        optionLabel="book_title"
                        optionValue="book_code"
                        placeholder="Filter book"
                        className="w-full"
                    />
                </div>
            </div>

            <DataTable value={rows} loading={loading} emptyMessage="Belum ada series." {...qrDataTableProps}>
                <Column header="Title" body={titleBody} style={{ minWidth: '250px' }} />
                <Column field="series_book" header="Book" style={{ minWidth: '150px' }} />
                <Column field="series_title" header="Volume" style={{ minWidth: '120px' }} />
            </DataTable>
        </div>
    );
}
