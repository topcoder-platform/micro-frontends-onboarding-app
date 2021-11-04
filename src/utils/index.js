/**
 * Extract trait values
 */
export function getTraits(payload) {
    console.log('payload', payload);
    return payload?.traits.data.length > 0 ? payload?.traits.data[0] : null
}