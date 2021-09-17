import ApiCall from './ApiCall'

export function getFaqs() {
    return ApiCall.get(`faqs`);
}