const puppeteer = require('puppeteer');

describe('Geolocalizacion', () => {
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

	test('Cambio de la geolocalizacion', async () => {
        const context = browser.defaultBrowserContext();

        await context.overridePermissions('https://chercher.tech/practice/geo-location.html', [
            'geolocation'
        ]);

        await page.setGeolocation({
            latitude: 90,
            longitude: 20
        });

        await page.goto('https://chercher.tech/practice/geo-location.html', {waitUntil: 'networkidle0'});

        await page.waitForTimeout(10000);

	}, 30000);
});