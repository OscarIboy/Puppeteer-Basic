const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

describe('Accesibilidad', () => {
    let browser;
    let page;

	//beforeEach and beforeAll
    beforeEach(async() =>{
        browser = await puppeteer.launch({
			headless: false,
		});

		page = await browser.newPage();

    	// Set viewport width and height
    	await page.setViewport({width: 1280, height: 720});
    })

    //afterEach and afterAll
    afterEach(async ()=>{
		await browser.close();
    });

	test('Probando Accesibilidad', async () => {
        await page.goto('https://www.platzi.com/');
        await page.waitForSelector('img');
        const snapshot = await page.accessibility.snapshot();
        console.log(snapshot);
	}, 30000);

    //npm install @axe-core/puppeteer --legacy-peer-deps
    test('Probando Accesibilidad con axe', async () => {

        await page.setBypassCSP(true);
        await page.goto('https://www.platzi.com/');
        await page.waitForSelector('img');
        
        const result = await new AxePuppeteer(page).analyze();
        console.log(result.violations);

	}, 30000);
});