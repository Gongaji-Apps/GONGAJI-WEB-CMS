export type StoreAddress = {
    address_uuid?: string;
    address_user?: string;
    address_receiver_name?: string;
    address_receiver_telp?: string;
    address_label?: string;
    address_province?: string;
    address_city?: string;
    address_subdistrict?: string;
    address_description?: string;
    address_detail?: string;
    address_latitude?: string;
    address_longitude?: string;
    address_main?: boolean | string;
    address_postal_code?: string;
    address_benchmark?: string;

    // IDs used by the store service for location selection.
    address_province_id?: string;
    address_city_id?: string;
    address_district_id?: string;
    address_subdistrict_id?: string;
    [key: string]: unknown;
};

export type StoreAddressCreatePayload = {
    address_receiver_name: string;
    address_receiver_telp: string;
    address_label: string;

    address_province_id?: string;
    address_city_id?: string;
    address_district_id?: string;
    address_subdistrict_id?: string;

    address_subdistrict: string;
    address_postal_code: string;
    address_detail: string;
    address_benchmark?: string;
    address_latitude?: string;
    address_longitude?: string;
    address_main?: boolean | string;
};

export type StoreAddressUpdatePayload = Partial<StoreAddressCreatePayload>;

export type StoreBrand = {
    brand_code?: string;
    brand_name?: string;
    brand_description?: string;
    brand_image?: string;
    brand_active?: boolean | string;
    [key: string]: unknown;
};

export type StoreMerchant = {
    merchant_code?: string;
    merchant_name?: string;
    merchant_description?: string;
    merchant_city?: string;
    merchant_image?: string;
    merchant_active?: boolean | string;
    [key: string]: unknown;
};

export type StoreMerchantBanner = {
    merchantb_uuid?: string;
    merchantb_brand?: string;
    merchantb_title?: string;
    merchantb_image?: string;
    merchantb_action?: string;
    merchantb_route?: string;
    merchantb_key?: string;
    merchantb_url?: string;
    merchantb_sequence?: string | number;
    merchantb_active?: boolean | string;
    [key: string]: unknown;
};

export type StoreMerchantCategory = {
    merchantc_uuid?: string;
    merchantc_brand?: string;
    merchantc_name?: string;
    merchantc_icon?: string;
    merchantc_sequence?: string | number;
    merchantc_active?: boolean | string;
    [key: string]: unknown;
};

export type ProductAttribute = {
    producta_product?: string;
    producta_attribute?: string;
    name?: string;
    value?: string;
};

export type ProductVariant = {
    variant_uuid?: string;
    variant_product?: string;
    variant_sku?: string | null;
    variant_name?: string;
    variant_price?: number;
    variant_stock?: number;
    variant_weight?: number;
    variant_image?: string;
    product_name?: string;
    merchant_code?: string;
    merchant_name?: string;
    merchant_image?: string;
    discountd_discount_type?: string | null;
    discountd_value?: number | null;
    variant_sold?: boolean;
    variant_has_discount?: boolean | null;
    variant_discount?: number | null;
    variant_discount_percent?: number | null;
    variant_price_after_discount?: number | null;
    [key: string]: unknown;
};

export type Product = {
    product_code?: string;
    product_merchant?: string;
    product_brand?: string;
    product_name?: string;
    product_caption?: string | null;
    product_description?: string;
    product_image?: string;
    merchant_name?: string;
    merchant_city?: string;
    brand_name?: string;
    product_images?: string[];
    product_price_min?: number;
    product_price_max?: number;
    product_has_discount?: boolean;
    product_discount?: number;
    product_discount_min?: number;
    product_discount_max?: number;
    product_discount_percent?: number;
    product_discount_percent_min?: number;
    product_discount_percent_max?: number;
    product_price_after_discount_min?: number;
    product_price_after_discount_max?: number;
    product_sold?: boolean;
    product_new?: boolean;
    product_badge?: string;
    product_review?: number | null;
    product_rating?: number | null;
    product_wishlist?: boolean;
    product_attribute_fk?: ProductAttribute[];
    variant_mstr_fk?: ProductVariant[];
    [key: string]: unknown;
};
