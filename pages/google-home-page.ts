import { Locator, Page } from '@playwright/test';

export class GooglePageHome {
    readonly page: Page;
    readonly button: { search: Locator; cookie: { accepted: Locator } };
    readonly inputSearchBar: Locator;
    readonly firstChild: Locator;

    constructor(page: Page) {
        this.page = page;
        this.button = {
            cookie: {
                accepted: page.locator('#L2AGLb')
            },
            search: page.locator('.gNO89b').first()
        };
        this.inputSearchBar        = page.locator('.gLFyf');
        this.firstChild        = page.locator('.mkHrUc').locator('li').first();
    }

    async searchSentence(SearchString) {
        await this.button.cookie.accepted.click();
        await this.inputSearchBar.click();
        await this.inputSearchBar.fill(SearchString);
    }
}
