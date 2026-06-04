'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

import { QrTitleColumn, qrActionsColumnStyle, qrDataTableProps } from '@/features/qr/components/qrListUi';
import { getQrBooks, getQrGroups } from '@/features/qr/services/qrService';
import type { QrBook, QrGroup } from '@/features/qr/types';

export default function QrBooksList() {
    const router = useRouter();
    const toast = useRef<Toast>(null);

    const [rows, setRows] = useState<QrBook[]>([]);
    const [groups, setGroups] = useState<QrGroup[]>([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState('');
    const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);
    const [groupFilter, setGroupFilter] = useState('');

    const loadBooks = useCallback(async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = {};
            if (keyword.trim()) params.book_code = keyword.trim();
            if (groupFilter) params.book_group = groupFilter;
            const data = await getQrBooks(params);
            setRows(data);
        } catch (e: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: e?.message || 'Tidak bisa memuat buku QR'
            });
        } finally {
            setLoading(false);
        }
    }, [keyword, groupFilter]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const groupData = await getQrGroups();
                setGroups(groupData);
            } catch {
                /* optional */
            }
        };
        loadGroups();
        loadBooks();
    }, [loadBooks]);

    const searchKeyword = async (event: AutoCompleteCompleteEvent) => {
        const query = `${event.query || ''}`.trim();
        if (!query || query.length < 2) {
            setKeywordSuggestions([]);
            return;
        }
        try {
            const data = await getQrBooks({ book_code: query });
            setKeywordSuggestions(
                data
                    .map((entry) => entry.book_code)
                    .filter((t): t is string => typeof t === 'string' && t.trim().length > 0)
                    .slice(0, 10)
            );
        } catch {
            setKeywordSuggestions([]);
        }
    };

    const titleBody = (row: QrBook) => (
        <QrTitleColumn
            title={row.book_title}
            code={row.book_code}
            image={row.book_image}
            codeLabel="Code"
            fallbackTitle="Untitled Book"
        />
    );

    const seriesBody = (row: QrBook) => (
        <Tag value={row.book_has_series ? 'Yes' : 'No'} severity={row.book_has_series ? 'success' : 'info'} />
    );

    return (
        <div className="card">
            <Toast ref={toast} />

            <Toolbar start={<h5 className="m-0">QR Books</h5>} className="mb-4" />

            <div className="grid mb-3">
                <div className="col-12 md:col-6">
                    <AutoComplete
                        value={keyword}
                        suggestions={keywordSuggestions}
                        completeMethod={searchKeyword}
                        onChange={(e) => setKeyword(e.value || '')}
                        placeholder="Search book code"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Dropdown
                        value={groupFilter}
                        onChange={(e) => setGroupFilter(e.value || '')}
                        options={[
                            { group_name: 'All Groups', group_code: '' },
                            ...groups
                        ]}
                        optionLabel="group_name"
                        optionValue="group_code"
                        placeholder="Filter group"
                        className="w-full"
                    />
                </div>
            </div>

            <DataTable
                value={rows}
                loading={loading}
                emptyMessage="Belum ada buku."
                {...qrDataTableProps}
            >
                <Column header="Title" body={titleBody} style={{ minWidth: '250px' }} />
                <Column field="group_name" header="Group" style={{ minWidth: '150px' }} />
                <Column header="Series" body={seriesBody} style={{ minWidth: '100px' }} />
                <Column
                    header="Actions"
                    frozen
                    alignFrozen="right"
                    style={qrActionsColumnStyle}
                    body={(row: QrBook) => (
                        <div className="flex items-center justify-content-end gap-2">
                            <Button
                                icon="pi pi-eye"
                                text
                                tooltip="View Detail"
                                onClick={() =>
                                    router.push(`/qr/books/view/${encodeURIComponent(row.book_code || '')}`)
                                }
                                disabled={!row.book_code}
                            />
                            <Button
                                icon="pi pi-qrcode"
                                text
                                severity="secondary"
                                tooltip="View Contents"
                                onClick={() =>
                                    router.push(`/qr/contents?content_book=${encodeURIComponent(row.book_code || '')}`)
                                }
                                disabled={!row.book_code}
                            />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
}
