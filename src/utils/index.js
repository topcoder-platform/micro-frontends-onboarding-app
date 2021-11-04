/**
 * Extract trait values
 */
export function getTraits(payload) {
    return payload?.traits.data.length > 0 ? payload?.traits.data[0] : null
}