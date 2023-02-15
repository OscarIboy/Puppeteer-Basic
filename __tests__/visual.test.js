const puppeteer = require('puppeteer');

//npm i --save-dev jest-image-snapshot --legacy-peer-deps
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});


describe('Visual test', () => {
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

    	// Create const with the URL
    	const website_url = 'https://www.google.com/';

    	// Open URL in current page
    	await page.goto(website_url, {waitUntil: 'networkidle0'});
    })

    //afterEach and afterAll
    afterEach(async ()=>{
		await browser.close();
    });

	test('Snapshot de toda la pagina', async () => {

        await page.waitForSelector('img');
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();

	}, 30000);

    test('Snapshot de un elemento', async () => {
        
        const image = await page.waitForSelector('img');
        const screenshot = await image.screenshot();
        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        });
	}, 30000);

    test('Snapshot de un celular', async () => {
        
        const tablet = puppeteer.devices['iPad Pro']
        await page.emulate(tablet)

        await page.waitForSelector('img')
        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
    }, 30000);

    test('Remover imagen antes de crear snapshot', async () => {

        await page.waitForSelector('img')

        await page.evaluate(() => (document.querySelectorAll('img') || []).forEach((img) => img.remove()))

        const screenshot = await page.screenshot()

        expect(screenshot).toMatchImageSnapshot({
            failureThreshold: 0.05,
            failureThresholdType: 'percent'
        })
    }, 30000);
});