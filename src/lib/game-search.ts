/** Returns whether a game title contains the user's case-insensitive query. */
export function matchesGameTitle(title: string, query: string): boolean {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return normalizedQuery.length === 0 || title.toLocaleLowerCase().includes(normalizedQuery);
}
