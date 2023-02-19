const puppeteer = require('puppeteer');
const fs = require('fs');

describe('Performance', () => {
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

    test('Medir el performance de la automatizacion', async () =>{
        await page.goto('https://www.platzi.com/');
        await page.waitForSelector('img');
        const metrics = await page.metrics();
        console.log(metrics);
	}, 30000);

    test('Medir el performance de la pagina', async () => {

        await page.goto('https://www.platzi.com/');
        await page.waitForSelector('img');
        const metrics2 = await page.evaluate(() => JSON.stringify(window.performance));
        console.log(metrics2);
	}, 30000);

    //test('Medir el performance del page load', async () => {
    //    await page.tracing.start({ path: 'profile.json'});
    //    await page.goto('https://www.platzi.com/');
    //    await page.tracing.stop();
	//}, 30000);

    test('Medir el performance del page load con screenshots', async () => {

        await page.tracing.start({ path: 'profile.json', screenshots: true});
        await page.goto('https://www.platzi.com/');
        await page.tracing.stop();
	}, 30000);

    test('Medir el performance del page load con screenshots y extraerlos', async () => {

        await page.tracing.start({ path: 'profile.json', screenshots: true});
        await page.goto('https://www.platzi.com/');
        await page.tracing.stop();
        
        const tracing = JSON.parse(fs.readFileSync('./profile.json', 'utf-8'));

        // Filtrar JSON
        const traceScreenShots = tracing.traceEvents.filter(
            (x) =>
            x.cat === 'disabled-by-default-devtools.screenshot' &&
            x.name === 'Screenshot' &&
            typeof x.args !== 'undefined' &&
            typeof x.args.snapshot !== 'undefined'
        )

        // Iterar Sobre este arreglo para crear las imagenes
        traceScreenShots.forEach(function(snap, index){
            fs.writeFile(`trace-screenshot-${index}.png`,snap.args.snapshot, 'base64', function(err){
                if(err){
                    console.log('No pude crear el archivo', err);
                }
            })
        })

	}, 30000);

    test('Medir el performance del first paint y first contentful paint', async () => {

        const navigationPromise = page.waitForNavigation();
        await page.goto('https://www.platzi.com/');
        await navigationPromise

        const firstPaint = JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-paint')))
        )

        const firstContentfulPaint = JSON.parse(
            await page.evaluate(()=> JSON.stringify(performance.getEntriesByName('first-contentful-paint')))
        )

        console.log('firstPaint', firstPaint[0].startTime);
        console.log('firstContentfulPaint', firstContentfulPaint[0].startTime);

	}, 30000);

    test('Medir el performance delos frames for segundo', async () => {

        const devtoolsProtocolClient = await page.target().createCDPSession();
        
        await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', {show: true});
        await page.goto('https://www.platzi.com/');

        await page.screenshot({path: 'framesPorSegundo.png', type: 'png'});


	}, 30000);
});