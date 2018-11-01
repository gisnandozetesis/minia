export const SPACE_SEARCH_RESULT = 'SPACE_SEARCH_RESULT';

export function spaceSearchResult(spaces) {
    return {
        type: SPACE_SEARCH_RESULT,
        spaces
    }
}
