const puppeteer = require('puppeteer');

describe('Diferentes formas de tomar Screenshots', () => {
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

	it('Captura de pantalla completa', async () => {
    	// Capture screenshot
    	await page.screenshot({path: 'screenshot.png'});
	}, 30000);

	it('Captura de pantalla seleccionando un area', async () => {
    	await page.screenshot({
    		path: 'area.png', 
    		clip: {
				x: 0,
				y: 0,
				width: 600,
				height: 600
    		}
		});
	}, 30000);

	it('Captura de pantalla con fondo transparente', async () => {

    	await page.evaluate(()=>(document.body.style.background = 'transparent'));

		await page.screenshot({
			path: 'transparente.png',
			omitBackground: true
		});
	}, 30000);

	it('Captura de pantalla a un elemento', async () => {

    	const element = await page.waitForSelector('body > div.L3eUgb > div.o3j99.LLD4me.yr19Zb.LS8OJ > div > img');

		await element.screenshot({
			path: 'elemento.png',
		});
	}, 30000);
});