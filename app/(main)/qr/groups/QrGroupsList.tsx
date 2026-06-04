'use client';

import { useEffect, useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';

import { qrDataTableProps } from '@/features/qr/components/qrListUi';
import { getQrGroups } from '@/features/qr/services/qrService';
import type { QrGroup } from '@/features/qr/types';

export default function QrGroupsList() {
    const toast = useRef<Toast>(null);
    const [rows, setRows] = useState<QrGroup[]>([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await getQrGroups();
            setRows(data);
        } catch (e: any) {
            toast.current?.show({
                severity: 'error',
                summary: 'Gagal',
                detail: e?.message || 'Tidak bisa memuat grup QR'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="card">
            <Toast ref={toast} />
            <Toolbar start={<h5 className="m-0">QR Groups</h5>} className="mb-4" />
            <DataTable value={rows} loading={loading} emptyMessage="Belum ada grup." {...qrDataTableProps}>
                <Column field="group_code" header="Code" style={{ minWidth: '200px' }} />
                <Column field="group_name" header="Name" style={{ minWidth: '200px' }} />
            </DataTable>
        </div>
    );
}
