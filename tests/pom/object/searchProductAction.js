import searchProduct from "../locator/searchProduct";
import { expect } from '@playwright/test';

export default class SearchProductAction {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.searchProduct = new searchProduct();
        this.searchInput = page.locator(this.searchProduct.searchInput);
        this.productResults = page.locator(this.searchProduct.productResults);
        this.nextPage = page.locator(this.searchProduct.nextPage);
        this.bannerPromo = page.locator(this.searchProduct.bannerPromo);
        this.closePromo = page.locator(this.searchProduct.closePromo);
    }

    async closePromoIfVisible() {
        try {
          await this.bannerPromo.waitFor({ state: 'visible', timeout: 5000 });
          await this.closePromo.click({ force: true });
        } catch (error) {
          
        }
      }

    async search(Cari) {
        await this.closePromoIfVisible();
        await this.searchInput.fill(Cari);
        await this.searchInput.press('Enter');
        await this.productResults.first().waitFor({ timeout: 5000 });
    }

    async verifySearchResults(query) {
        let pageNumber = 1;
        let allProducts = [];
    
        await this.page.waitForSelector(this.searchProduct.productResults, { timeout: 100000 }); // 100 detik
    
        const productCount = await this.productResults.count();
        expect(productCount).toBeGreaterThan(0);
    
        for (let i = 0; i < productCount; i++) {
            const productName = await this.productResults.nth(i).innerText();
            allProducts.push(productName);
            
            const isRelevant = productName.toLowerCase().includes(query.toLowerCase());
            if (isRelevant) {
                expect(productName.toLowerCase()).toContain(query.toLowerCase());
            } else {
                console.log(`Produk tidak relevan ditemukan: ${productName}`);
            }
        }
    }    
    
}
