//@ts-check
export function stripHTML(/** @type {string}*/ string) {
    return string.replace(/<[^>]*>?/gm, " ");
}
