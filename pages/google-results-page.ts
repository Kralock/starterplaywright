import { expect, Locator, Page } from '@playwright/test';

export class GooglePageResults {
    readonly stats: Locator;
    readonly firstLink: Locator;
    readonly expectedString: { result: string; seconds: string; about: string; link: string };

    constructor(page: Page) {
        this.stats                 = page.locator('#result-stats');
        this.firstLink             = page.locator('.TbwUpd').first();
        this.expectedString = {
            result: 'résultats',
            about: 'Environ',
            seconds: 'secondes',
            link: 'https://latavernedutesteur.fr',
        }
    }

    async expectedResults() {
        await expect(this.stats).toContainText(this.expectedString.result)
        await expect(this.stats).toContainText(this.expectedString.seconds)
        await expect(this.stats).toContainText(this.expectedString.about)
        await expect(this.firstLink).toHaveText(this.expectedString.link);
    }
}
