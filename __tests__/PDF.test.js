const puppeteer = require('puppeteer');

//npm i --save-dev jest-image-snapshot --legacy-peer-deps
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({toMatchImageSnapshot});


describe('Generador de PDF', () => {
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

    test('PDF de pantalla completa', async () => {

        let pdfCSS = []
        
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('<style>')

        let css = pdfCSS.join('')

        await page.pdf({
            path: './google.pdf',
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            //headerTemplate: css + '<h1>' + 'Mi primer PDF con puppeteer' + '</h1>',
            //footerTemplate: css + '<h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin: {
                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'
            }
        })

    }, 30000);

    test('PDF de pantalla completa en modo landscape', async () => {

        let pdfCSS = []
        
        pdfCSS.push('<style>')
        pdfCSS.push('h1 { font-size:10px; margin-left:30px;}')
        pdfCSS.push('<style>')

        const css = pdfCSS.join('')

        await page.pdf({
            path: './googleLandscape.pdf',
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            //headerTemplate: css + '<h1>' + 'Mi primer PDF con puppeteer' + '</h1>',
            //footerTemplate: css + '<h1> Page <span class="pageNumber"></span> of <span class="totalPages"></span></h1>',
            margin: {
                top: '100px',
                bottom: '200px',
                right: '30px',
                left: '30px'
            },
            landscape: true
        })

    }, 30000);
});