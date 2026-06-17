export type QrPagination = {
    current?: number;
    next?: number | null;
    total?: number;
    last?: boolean;
};

export type QrListResult<T> = {
    data: T[];
    dataTotal?: number;
    pagination?: QrPagination;
};

export type QrGroup = {
    group_code?: string;
    group_name?: string;
    [key: string]: unknown;
};

export type QrBook = {
    book_code?: string;
    book_group?: string;
    book_title?: string;
    book_description?: string;
    book_buy_direct?: string | null;
    group_name?: string;
    book_image?: string;
    book_has_series?: boolean;
    series_mstr_fk?: unknown[];
    [key: string]: unknown;
};

export type QrSeries = {
    series_code?: string;
    series_book?: string;
    series_title?: string;
    series_caption?: string | null;
    series_description?: string | null;
    series_image?: string;
    [key: string]: unknown;
};

export type QrContentPlaylistParams = {
    content_book: string;
    content_series?: string;
    content_qrcode?: string;
};

export type QrContent = {
    content_uuid?: string;
    content_book?: string;
    content_series?: string | null;
    content_qrcode?: string;
    content_type?: string;
    content_value?: string;
    content_multi_category?: boolean;
    content_multi_language?: boolean;
    content_sequence?: number;
    book_group?: string;
    book_title?: string;
    series_title?: string | null;
    content_title?: string;
    content_caption?: string;
    content_image?: string;
    content_details?: unknown[];
    content_detail_fk?: unknown[];
    [key: string]: unknown;
};
