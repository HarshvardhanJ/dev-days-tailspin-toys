import { describe, expect, it } from 'vitest';
import { matchesGameTitle } from './game-search';

describe('matchesGameTitle', () => {
    it.each([
        ['Code Quest', 'code', true],
        ['Code Quest', 'QUEST', true],
        ['Code Quest', 'adventure', false],
        ['Code Quest', '   ', true],
    ])('matches %s against %s', (title, query, expected) => {
        expect(matchesGameTitle(title, query)).toBe(expected);
    });
});
