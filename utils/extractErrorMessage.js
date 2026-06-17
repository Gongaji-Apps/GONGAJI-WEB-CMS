export const extractErrorMessage = (error, serviceLabel = 'server') => {
    if (error && error.isAxiosError) {
        if (!error.response) {
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                return `Gagal terhubung ke layanan ${serviceLabel}. Pastikan sudah login dan muat ulang halaman.`;
            }
            return error.message || 'Gagal terhubung ke server';
        }
        const data = error.response.data;
        const fromBody =
            typeof data === 'object' && data?.message
                ? data.message
                : typeof data === 'string'
                  ? data
                  : null;
        return fromBody || error.message || 'Terjadi kesalahan dari server';
    }
    return error?.message || 'Terjadi kesalahan pada server.';
};
