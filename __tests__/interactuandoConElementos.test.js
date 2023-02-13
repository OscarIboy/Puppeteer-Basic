const puppeteer = require('puppeteer');
const {click, type, doubleClick} = require('../lib/helpers');

describe('Interactuando con elementos', () => {
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
        await page.goto('https://demo.guru99.com/test/simple_context_menu.html');

        page.on('dialog', async (dialog) =>{
            await dialog.accept();
        });

        //Click derecho
        await page.click('.context-menu-one', {button: 'right', delay:500});
        await page.click('.context-menu-one');

        //Doble click
        //await page.click('#authentication > button',{clickCount: 2, delay: 500});

        //Doble click with helpers
        await doubleClick(page, '#authentication > button')

        //Textbox
        //await page.goto('https://devexpress.github.io/testcafe/example');
        //await page.type('#developer-name', 'oscar', {delay: 100});

        //Textbox whit helpers
        await page.goto('https://devexpress.github.io/testcafe/example');
        await type(page, '#developer-name', 'oscar', {delay: 100});
        
        //Checkbox
        //await page.click('#remote-testing');
        //await page.click('#tried-test-cafe');
        //await page.type('#comments', 'Esto es un comentario');
        //await page.click('#submit-button');

        //Checkbox whit helpers
        await click(page, '#remote-testing');
        await click(page, '#tried-test-cafe');
        await type(page, '#comments', 'Esto es un comentario');
        await click(page, '#submit-button');

        await page.waitForTimeout(3000);
        await browser.close();
	}, 30000);
});