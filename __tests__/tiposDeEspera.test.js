const puppeteer = require('puppeteer');

describe('Tipos de espera', () => {
    //Set Timeout of jest
    jest.setTimeout(30000);
	it('Mostrar todos los diferentes tipos de espera', async () => {
        const browser = await puppeteer.launch({
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

		const page = await browser.newPage();
        //Set Timeout of puppeteer
        page.setDefaultTimeout(10000);
        page.setDefaultNavigationTimeout(1000);

        //Navegacion "Esperar a que la pagina termine de cargar"
		await page.goto('https://www.platzi.com', {waitUntil: 'networkidle0'});

        //Espera Explicita
        //await page.waitForTimeout(5000);

        //Espera por un css selector
        //await page.waitForSelector('.LogoHeader-container > figure:nth-child(1) > img:nth-child(1)');

        //Espera por un xpath
        await page.waitForXPath('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[2]/img');

        //Selector Visible and click modal
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'});

        await page.waitForSelector('#showSmallModal', {visible: true});

        await page.click('#showSmallModal');

        //VisibleSelector Visible and click modal 2
        await page.goto('https://demoqa.com/modal-dialogs', {waitUntil: 'networkidle2'});

        const button = await page.waitForSelector('#showSmallModal', {visible: true});
        
        await button.click();

        //Espera por funcion
        await page.waitForFunction(()=> document.querySelector('#example-modal-sizes-title-sm').innerText === 'Small Modal');

        //Ejemplo para observar el viewport
        //const observaResize = page.waitForFunction('window.innerWidth < 100');
        //await page.setViewport({width: 50, height: 50});
        //await observaResize;

        await page.click('#closeSmallModal');
        await page.waitForFunction(()=> !document.querySelector('#example-modal-sizes-title-sm'), {timeout: 30000});

		await browser.close();
	});
});