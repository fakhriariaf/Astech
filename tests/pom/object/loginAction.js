import loginPage from "../locator/loginPage";
import { expect } from "@playwright/test";

export default class loginActions {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginPage = new loginPage();
        this.btnLoginWith = page.locator(this.loginPage.btnLoginWith);
        this.popUpLogin = page.locator(this.loginPage.popUpLogin);
        this.emailInput = page.locator(this.loginPage.emailInput);
        this.passwordInput = page.locator(this.loginPage.passwordInput);
        this.loginButton = page.locator(this.loginPage.loginButton);
        this.errorMessage = page.locator(this.loginPage.errorMessage);
        this.errorMessages = this.page.locator('.text-alert');
        this.bannerPromo = page.locator(this.loginPage.bannerPromo);
        this.closePromo = page.locator(this.loginPage.closePromo);

        this.validEmail = 'fakhriaf16@gmail.com';
        this.validPassword = '@F41s4l4j1';
    }

    async closePromoIfVisible() {
        try {
          await this.bannerPromo.waitFor({ state: 'visible', timeout: 5000 });
          await this.closePromo.click({ force: true });
        } catch (error) {
          
        }
      }
      

    async goto() {
        await this.page.goto('https://www.sociolla.com/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.closePromoIfVisible();
    }

    async validLogin() {
        await this.btnLoginWith.click();
        await this.emailInput.fill(this.validEmail);
        await this.passwordInput.fill(this.validPassword);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);

        await expect(this.page).toHaveURL('https://www.sociolla.com/');
    }

    async invalidLogin(email, password, expectedError) {
        await this.btnLoginWith.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);

        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedError);
    }

    async invalidLoginBothNull(email, password, expectedErrors) {
        await this.btnLoginWith.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForTimeout(2000);
    
        for (const error of expectedErrors) {
            const errorText = this.page.getByText(error);
            await expect(errorText).toBeVisible();
        }
    }
    
}
