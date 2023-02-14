const puppeteer = require('puppeteer');

describe('screenshot', () => {
    it('tomar un screenshot', async () => {
        // Create a browser instance
        const browser = await puppeteer.launch({
            headless: false
        });

        // Create a new page
        const page = await browser.newPage();

        // Set viewport width and height
        await page.setViewport({width: 1280, height: 720});

        // Create const with the URL
        const website_url = 'https://www.google.com/';

        // Open URL in current page
        await page.goto(website_url, {waitUntil: 'networkidle0'});

        // Capture screenshot
        await page.screenshot({path: 'screenshot.jpg'});

        // close the browser instance
        await browser.close();
    })
})