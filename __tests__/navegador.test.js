const puppeteer = require('puppeteer');

describe('Mi primer test en puppeteer', () => {
	it('Debe abrir y cerrar el navegador', async () => {
		const browser = await puppeteer.launch({
			headless: false,
            //slowMo: 0,
            //devtools: false,
            //defaultViewport: {
            //    width: 2100,
            //    height: 1080
            //}
            //args: ['--window-size=1920,1080']
            defaultViewport: null
		});

		const page = await browser.newPage();
		await page.goto('https://google.com/');
		await page.waitForTimeout(5000);
        await page.waitForSelector('#gb > div > div:nth-child(1) > div > div:nth-child(1) > a');
        
        //Recargar la pagina
        await page.reload();
        await page.waitForTimeout(5000);
        await page.waitForSelector('#gb > div > div:nth-child(1) > div > div:nth-child(1) > a');

        //Navegar a otro sitio
        await page.goto('https://platzi.com/');
        await page.waitForSelector('.LogoHeader-container > figure:nth-child(1) > img:nth-child(1)');

        //Navegar hacia atras
        await page.goBack();
        await page.waitForSelector('img');

        //Navegar hacia delante
        await page.goForward();
        await page.waitForSelector('img');

        //Abrir otra pagina
        const page2 = await browser.newPage();
        await page2.goto('https://google.com/');

		await browser.close();
	}, 35000);
});