import { test, expect } from '@playwright/test';

test.describe('Game title search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('filters the full catalog case-insensitively and hides pagination', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Search games by title' });
    const visibleCards = page.locator('[data-testid="game-card"]:visible');

    await searchInput.fill('CLOUD');

    await expect(visibleCards).toHaveCount(1);
    await expect(visibleCards.first()).toHaveAttribute('data-game-title', 'Cloud Conqueror');
    await expect(page.getByTestId('pagination')).toBeHidden();
  });

  test('shows a no-results state when no title matches', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Search games by title' });
    const visibleCards = page.locator('[data-testid="game-card"]:visible');

    await searchInput.fill('does not exist');

    await expect(visibleCards).toHaveCount(0);
    await expect(page.getByTestId('search-empty-state')).toContainText('No games match your search.');
    await expect(page.getByTestId('search-empty-state')).toBeVisible();
  });

  test('restores the current page when the search is cleared', async ({ page }) => {
    const searchInput = page.getByRole('searchbox', { name: 'Search games by title' });
    const visibleCards = page.locator('[data-testid="game-card"]:visible');

    await searchInput.fill('cloud');
    await searchInput.fill('');

    await expect(visibleCards).toHaveCount(6);
    await expect(page.getByTestId('pagination')).toBeVisible();
  });
});
