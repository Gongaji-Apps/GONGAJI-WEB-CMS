'use client';

import { Image } from 'primereact/image';

type QrTitleColumnProps = {
    title?: string;
    code?: string;
    image?: string;
    codeLabel?: string;
    fallbackTitle?: string;
};

export function QrTitleColumn({
    title,
    code,
    image,
    codeLabel = 'Code',
    fallbackTitle = 'Untitled'
}: QrTitleColumnProps) {
    const imageSrc = typeof image === 'string' && image.trim() !== '' ? image : '/no-image.png';
    const displayTitle = title?.trim() || fallbackTitle;

    return (
        <div className="flex align-items-center gap-3 py-2">
            <div className="flex-shrink-0 shadow-2 border-round overflow-hidden" style={{ width: '60px', height: '60px' }}>
                <Image
                    src={imageSrc}
                    alt={displayTitle}
                    width="60"
                    height="60"
                    preview
                    imageClassName="object-cover w-full h-full"
                    className="block"
                />
            </div>
            <div className="flex flex-column gap-1 overflow-hidden">
                <div
                    className="font-bold text-900 text-base line-height-2 overflow-hidden text-overflow-ellipsis white-space-nowrap"
                    style={{ maxWidth: '280px' }}
                    title={displayTitle}
                >
                    {displayTitle}
                </div>
                <div className="flex align-items-center gap-2">
                    <span
                        className="text-xs px-2 py-1 border-round-sm surface-200 text-600 font-medium tracking-tight"
                        style={{ fontSize: '10px', textTransform: 'uppercase' }}
                    >
                        {codeLabel}
                    </span>
                    <small
                        className="text-500 font-mono overflow-hidden text-overflow-ellipsis white-space-nowrap"
                        style={{ maxWidth: '200px' }}
                        title={code}
                    >
                        {code || '-'}
                    </small>
                </div>
            </div>
        </div>
    );
}

export const qrDataTableProps = {
    paginator: true,
    rows: 10,
    scrollable: true,
    scrollHeight: 'flex' as const,
    responsiveLayout: 'scroll' as const
};

export const qrActionsColumnStyle = { minWidth: '150px' };
