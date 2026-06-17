import api from '@/utils/api';
import { API_BASE_QR, API_BASE_QR_BOOK } from '@/utils/constants';
import { extractErrorMessage } from '@/utils/extractErrorMessage';

const withQrVersion = (version = 'V3', extra = {}) => ({
    headers: {
        Version: version,
        ...extra
    }
});

const qrError = (error) => extractErrorMessage(error, 'QR');

const asArray = (payload) => (Array.isArray(payload) ? payload : []);

const parseListResponse = (response) => {
    const body = response?.data;
    if (!body?.status) {
        throw new Error(body?.message || 'Permintaan gagal diproses');
    }
    return {
        data: asArray(body.data),
        dataTotal: body.data_total,
        pagination: body.pagination
    };
};

const normalizePlaylistData = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
        const nested = payload.playlist ?? payload.items ?? payload.contents ?? payload.content;
        if (Array.isArray(nested)) return nested;
        return [payload];
    }
    return [];
};

const parsePlaylistResponse = (response) => {
    const body = response?.data;
    if (!body?.status) {
        throw new Error(body?.message || 'Permintaan gagal diproses');
    }
    const data = normalizePlaylistData(body.data);
    return {
        data,
        dataTotal: body.data_total ?? data.length,
        pagination: body.pagination,
        raw: body.data
    };
};

const buildPlaylistParams = ({ content_book, content_series, content_qrcode } = {}) => {
    const book = `${content_book || ''}`.trim();
    if (!book) {
        throw new Error('content_book wajib diisi');
    }
    const params = { content_book: book };
    const series = `${content_series || ''}`.trim();
    const qrcode = `${content_qrcode || ''}`.trim();
    if (series) params.content_series = series;
    if (qrcode) params.content_qrcode = qrcode;
    return params;
};

const qrGet = async (path, params = {}) => {
    try {
        const response = await api.get(`${API_BASE_QR}${path}`, {
            ...withQrVersion('V3'),
            params
        });
        return parseListResponse(response);
    } catch (error) {
        throw new Error(qrError(error));
    }
};

export const getQrGroups = async (params = {}) => {
    const result = await qrGet('/v1/group/get', params);
    return result.data;
};

export const getQrBooks = async (params = {}) => {
    const result = await qrGet('/v1/book/get', params);
    return result.data;
};

export const getQrBookByCode = async (bookCode) => {
    const code = `${bookCode || ''}`.trim();
    if (!code) return null;
    const books = await getQrBooks({ book_code: code });
    return books.find((item) => item.book_code === code) || books[0] || null;
};

export const getQrSeries = async (params = {}) => {
    const result = await qrGet('/v1/series/get', params);
    return result.data;
};

export const getQrContents = async (params = {}) => {
    return qrGet('/v1/content/get', params);
};

export const getQrContentPlaylist = async (params = {}) => {
    try {
        const response = await api.get(`${API_BASE_QR_BOOK}/v1/content/get-playlist`, {
            ...withQrVersion('V3'),
            params: buildPlaylistParams(params)
        });
        return parsePlaylistResponse(response);
    } catch (error) {
        throw new Error(qrError(error));
    }
};

export const getQrContentByUuid = async (contentUuid, params = {}) => {
    const uuid = `${contentUuid || ''}`.trim();
    if (!uuid) return null;

    const direct = await getQrContents({ content_uuid: uuid, ...params });
    const found = direct.data.find((item) => item.content_uuid === uuid);
    if (found) return found;

    const bookCode = `${params.content_book || ''}`.trim();
    if (!bookCode) return null;

    let page = 1;
    const maxPages = direct.pagination?.total || 20;

    while (page <= maxPages) {
        const batch = await getQrContents({ content_book: bookCode, page, ...params });
        const match = batch.data.find((item) => item.content_uuid === uuid);
        if (match) return match;
        if (batch.pagination?.last) break;
        page = batch.pagination?.next || page + 1;
    }

    return null;
};
