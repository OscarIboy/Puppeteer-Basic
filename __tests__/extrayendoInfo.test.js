const puppeteer = require('puppeteer');

describe('Extrayendo informacion', () => {

    let browser;
    let page;

    //beforeEach and beforeAll
    beforeEach(async() =>{
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

		page = await browser.newPage();
    })

    //afterEach and afterAll
    afterEach(async ()=>{
		await browser.close();
    });

	it('Extraer el titulo de la pagina y la url', async () => {

        //Navegacion "Esperar a que la pagina termine de cargar"
		await page.goto('https://www.platzi.com', {waitUntil: 'networkidle0'});

        //Capturar el titulo de la pagina y el url
        const titulo = await page.title();
        const url = await page.url();

        console.log('titulo', titulo);
        console.log('url', url);
	}, 30000);

    it('Extraer la informacion de un elemento', async () => {
		
        //Navegacion "Esperar a que la pagina termine de cargar"
		await page.goto('https://www.platzi.com', {waitUntil: 'networkidle0'});

        //Extraer el texto de un elemento con css selector
        await page.waitForSelector('.Actionsv2-enterprise');
        const nombreBoton = await page.$eval('.Actionsv2-enterprise', (button) => button.textContent);

        console.log('nombre Boton', nombreBoton);

        //Extraer el texto de un elemento con xpath
        const [button] = await page.$x('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[1]/img');

        const propiedad = await button.getProperty('textContent');
        const texto = await propiedad.jsonValue();

        console.log('Texto', texto);

        //Extraer texto con xpath 2
        const [button2] = await page.$x('//*[@id="Header-v2"]/nav/div[1]/div/a/div/figure[1]/img');

        const texto2 = await page.evaluate((name) => name.textContent, button2);

        console.log('Texto 2', texto2);

        //Extraer texto con xpath 3 La mejor
        const button3 = await page.waitForXPath('//*[@id="Header-v2"]/nav/div[5]/div/a');

        const texto3 = await page.evaluate((name) => name.textContent, button3);

        console.log('Texto 3', texto3);

	}, 30000);

    it('Contar los elementos de una pagina', async () => {

        //Navegacion "Esperar a que la pagina termine de cargar"
		await page.goto('https://www.platzi.com', {waitUntil: 'networkidle0'});

        //$$eval regresa todos los elementos que detecte con el selector
        const images = await page.$$eval('img',(imagenes)=>imagenes.length);

        console.log('Imagenes', images);
	}, 30000);
});