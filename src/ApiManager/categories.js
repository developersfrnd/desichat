import ApiCall from './ApiCall'

export function getCategories() {
    return ApiCall.get(`categories`);
}
