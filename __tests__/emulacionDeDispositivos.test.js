const puppeteer = require('puppeteer');

describe('Emulando dispositivos', () => {

    let browser;
    let page;

    //beforeEach and beforeAll
    beforeAll(async() =>{
        browser = await puppeteer.launch({
			headless: false,
            //slowMo: 500,
            //devtools: false,
            //defaultViewport: {
            //    width: 2100,
            //    height: 1080
            //}
            //args: ['--window-size=1920,1080']
            defaultViewport: null
		});

		//page = await browser.newPage();

        // Modo incognito
        //const context = await browser.createIncognitoBrowserContext();
        //page = await context.newPage();

        // Modo incognito 2 la mejor
        page = await (await browser.createIncognitoBrowserContext()).newPage();

        await page.goto('https://www.platzi.com', {waitUntil: 'networkidle0'});
    })

    //afterEach and afterAll
    afterAll(async ()=>{
		await browser.close();
    });

    test('Emular dispositivo móvil', async () => {
        await page.emulate({
            name: 'Galaxy J6',
            viewport: {
                width: 360,
                height: 740,
                deviceScaleFactor: 4,
                isMobile: true,
                hasTouch: true,
                isLandscape: false,
            },
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        });
        await page.waitForTimeout(3000);

    }, 40000);

    //Emular de forma horizontal
    test('Emular dispositivo móvil horizontal', async () => {
        await page.emulate({
            name: 'Galaxy J6',
            viewport: {
                width: 740,
                height: 360,
                deviceScaleFactor: 4,
                isMobile: true,
                hasTouch: true,
                isLandscape: true,
            },
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; SAMSUNG SM-J600G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/10.1 Chrome/71.0.3578.99 Mobile Safari/537.36',
        });
        await page.waitForTimeout(3000);
    }, 40000);
});