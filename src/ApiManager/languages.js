import ApiCall from './ApiCall'

export function getLanguages() {
    return ApiCall.get(`languages`);
}