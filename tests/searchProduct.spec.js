import { test, expect } from '@playwright/test';
import SearchProductAction from '../tests/pom/object/searchProductAction';

test.describe('Product Search Test', () => {
  let search;

  test.beforeEach(async ({ page }) => {
    search = new SearchProductAction(page);
    await page.goto('https://www.sociolla.com', { waitUntil: 'domcontentloaded' });
  });

  test('TC-010: Verifikasi hasil pencarian produk "Serum"', async ({ page }) => {
    const search = new SearchProductAction(page);
    await search.search('serum');
    await search.verifySearchResults('serum');
  });
});
