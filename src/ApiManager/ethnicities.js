import ApiCall from './ApiCall'

export function getEthnicities() {
    return ApiCall.get(`ethnicities`);
}