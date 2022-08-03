import { test, expect } from '@playwright/test';
import { GooglePageHome } from '../pages/google-home-page';
import { GooglePageResults } from '../pages/google-results-page';
// @ts-ignore
import path from 'path';

test.describe('Example to typing text with Play Wright`', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await page.goto('https://www.google.com/');
    });

    test('Text typing and push Enter key', async ({page}) => {
        await page.locator('#L2AGLb').click();
        await page.locator('.gLFyf').click();
        await page.locator('.gLFyf').fill('la taverne du test');
        await page.keyboard.press('Enter');

        //await expect(page.locator('#result-stats')).toContainText(['résultats', 'secondes', 'Environ', 'https://latavernedutesteur.fr']);
        await expect(page.locator('#result-stats')).toContainText('résultats');
        await expect(page.locator('#result-stats')).toContainText('secondes');
        await expect(page.locator('#result-stats')).toContainText('Environ');
        await expect(page.locator('.TbwUpd').first()).toHaveText('https://latavernedutesteur.fr');
    });

    test('Text typing and Select first link', async ({page}) => {
        const googlePageHome = new GooglePageHome(page);
        await googlePageHome.searchSentence('la taverne du test');
        await page.pause();
        await googlePageHome.firstChild.click();

        const googlePageResults = new GooglePageResults(page);
        await expect(googlePageResults.stats).toContainText('résultats');
        await expect(googlePageResults.stats).toContainText('secondes');
        await expect(googlePageResults.stats).toContainText('Environ');
        await expect(googlePageResults.firstLink).toHaveText('https://latavernedutesteur.fr');
    });

    test('Text typing and click on the Search button', async ({ page }) => {
        const googlePageHome = new GooglePageHome(page);
        await googlePageHome.searchSentence('la taverne du test');
        await googlePageHome.button.search.click();
        await new GooglePageResults(page).expectedResults();
    });

});

