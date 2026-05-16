'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

import { getProducts, getBrands, getMerchants } from '@/features/store/services/storeService';
import type { Product, ProductVariant, StoreBrand, StoreMerchant } from '@/features/store/types';

export default function ProductsList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [brands, setBrands] = useState<StoreBrand[]>([]);
    const [merchants, setMerchants] = useState<StoreMerchant[]>([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [merchantFilter, setMerchantFilter] = useState('');
    const [detailProduct, setDetailProduct] = useState<Product | null>(null);

    const toast = useRef<Toast>(null);

    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = {};
            if (keyword.trim()) params.keyword = keyword.trim();
            if (brandFilter) params.product_brand = brandFilter;
            if (merchantFilter) params.product_merchant = merchantFilter;
            const data = await getProducts(params);
            setProducts(data);
        } catch (err: any) {
            toast.current?.show({ severity: 'error', summary: 'Gagal', detail: err?.message || 'Gagal memuat produk' });
        } finally {
            setLoading(false);
        }
    }, [keyword, brandFilter, merchantFilter]);

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [b, m] = await Promise.all([
                    getBrands({ limit: 100 }),
                    getMerchants({ limit: 100 })
                ]);
                setBrands(b);
                setMerchants(m);
            } catch { /* silent */ }
        };
        loadFilters();
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // ─── Body renderers ───────────────────────────────────────────────────────

    const imageBody = (row: Product) => {
        const src = typeof row.product_image === 'string' && row.product_image.trim()
            ? row.product_image
            : '/no-image.png';
        return (
            <div className="flex-shrink-0 shadow-2 border-round overflow-hidden" style={{ width: '56px', height: '56px' }}>
                <Image
                    src={src}
                    alt={row.product_name}
                    width="56"
                    height="56"
                    preview
                    imageClassName="object-cover w-full h-full"
                    className="block"
                />
            </div>
        );
    };

    const nameBody = (row: Product) => (
        <div className="flex flex-column gap-1">
            <span
                className="font-bold text-900 text-sm line-height-2 overflow-hidden text-overflow-ellipsis white-space-nowrap"
                style={{ maxWidth: '260px' }}
                title={row.product_name}
            >
                {row.product_name || '-'}
            </span>
            <small className="text-500 font-mono" style={{ fontSize: '10px' }}>
                {row.product_code}
            </small>
        </div>
    );

    const priceBody = (row: Product) => {
        const min = row.product_price_min ?? 0;
        const max = row.product_price_max ?? 0;
        const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
        return (
            <span className="font-semibold text-primary">
                {min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`}
            </span>
        );
    };

    const badgeBody = (row: Product) => {
        const badge = (row.product_badge || '').toUpperCase();
        const severity =
            badge === 'NEW' ? 'success' :
            badge === 'SOLD' ? 'warning' :
            'info';
        return badge ? <Tag value={badge} severity={severity} /> : <span className="text-400">-</span>;
    };

    const variantBody = (row: Product) => {
        const count = row.variant_mstr_fk?.length ?? 0;
        return (
            <Button
                label={`${count} varian`}
                icon="pi pi-list"
                text
                size="small"
                onClick={() => setDetailProduct(row)}
                disabled={count === 0}
            />
        );
    };

    // ─── Variant detail dialog ────────────────────────────────────────────────

    const variantDialogFooter = (
        <Button label="Tutup" icon="pi pi-times" onClick={() => setDetailProduct(null)} />
    );

    return (
        <div className="card">
            <Toast ref={toast} />

            {/* Variant detail dialog */}
            <Dialog
                header={`Varian: ${detailProduct?.product_name ?? ''}`}
                visible={!!detailProduct}
                onHide={() => setDetailProduct(null)}
                style={{ width: '760px' }}
                footer={variantDialogFooter}
                modal
            >
                {detailProduct && (
                    <DataTable
                        value={detailProduct.variant_mstr_fk ?? []}
                        emptyMessage="Tidak ada varian."
                        size="small"
                        scrollable
                        scrollHeight="400px"
                    >
                        <Column
                            header="Gambar"
                            body={(v: ProductVariant) => {
                                const src = v.variant_image || '/no-image.png';
                                return (
                                    <Image src={src} alt={v.variant_name} width="48" height="48" preview
                                        imageClassName="object-cover border-round" className="block" />
                                );
                            }}
                            style={{ width: '70px' }}
                        />
                        <Column field="variant_name" header="Nama Varian" style={{ minWidth: '140px' }} />
                        <Column field="variant_sku" header="SKU" style={{ minWidth: '120px' }}
                            body={(v: ProductVariant) => <span className="font-mono text-sm">{v.variant_sku || '-'}</span>}
                        />
                        <Column header="Harga"
                            body={(v: ProductVariant) => (
                                <span className="font-semibold text-primary">
                                    Rp {(v.variant_price ?? 0).toLocaleString('id-ID')}
                                </span>
                            )}
                            style={{ minWidth: '120px' }}
                        />
                        <Column field="variant_stock" header="Stok" style={{ minWidth: '70px' }} />
                        <Column field="variant_weight" header="Berat (g)" style={{ minWidth: '80px' }} />
                        <Column header="Status"
                            body={(v: ProductVariant) => (
                                <Tag value={v.variant_sold ? 'Sold' : 'Available'}
                                    severity={v.variant_sold ? 'warning' : 'success'} />
                            )}
                            style={{ minWidth: '90px' }}
                        />
                    </DataTable>
                )}
            </Dialog>

            <Toolbar
                start={<h5 className="m-0">Products</h5>}
                end={
                    <Button
                        icon="pi pi-refresh"
                        label="Refresh"
                        outlined
                        onClick={loadProducts}
                        loading={loading}
                    />
                }
                className="mb-4"
            />

            {/* Filters */}
            <div className="grid mb-3">
                <div className="col-12 md:col-5">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search" />
                        <InputText
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cari nama / kode produk..."
                            className="w-full"
                            onKeyDown={(e) => e.key === 'Enter' && loadProducts()}
                        />
                    </span>
                </div>
                <div className="col-12 md:col-3">
                    <Dropdown
                        value={brandFilter}
                        options={[{ brand_name: 'Semua Brand', brand_code: '' }, ...brands]}
                        optionLabel="brand_name"
                        optionValue="brand_code"
                        onChange={(e) => setBrandFilter(e.value || '')}
                        placeholder="Filter Brand"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-3">
                    <Dropdown
                        value={merchantFilter}
                        options={[{ merchant_name: 'Semua Merchant', merchant_code: '' }, ...merchants]}
                        optionLabel="merchant_name"
                        optionValue="merchant_code"
                        onChange={(e) => setMerchantFilter(e.value || '')}
                        placeholder="Filter Merchant"
                        className="w-full"
                    />
                </div>
                <div className="col-12 md:col-1 flex align-items-center">
                    <Button
                        icon="pi pi-search"
                        onClick={loadProducts}
                        tooltip="Cari"
                        className="w-full"
                    />
                </div>
            </div>

            <DataTable
                value={products}
                loading={loading}
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                scrollable
                scrollHeight="flex"
                responsiveLayout="scroll"
                emptyMessage="Belum ada produk."
                dataKey="product_code"
            >
                <Column header="Gambar" body={imageBody} style={{ width: '76px' }} />
                <Column header="Produk" body={nameBody} style={{ minWidth: '240px' }} />
                <Column field="brand_name" header="Brand" style={{ minWidth: '130px' }} />
                <Column field="merchant_name" header="Merchant" style={{ minWidth: '110px' }} />
                <Column field="merchant_city" header="Kota" style={{ minWidth: '120px' }} />
                <Column header="Harga" body={priceBody} style={{ minWidth: '160px' }} />
                <Column header="Badge" body={badgeBody} style={{ minWidth: '90px' }} />
                <Column header="Varian" body={variantBody} style={{ minWidth: '110px' }} />
            </DataTable>
        </div>
    );
}
