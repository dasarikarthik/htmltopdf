
const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs').promises; 

const app = express();
const port = 5500;
const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:name', async (req, res) => {
    try {
        let htmlTemplatePath = path.join(__dirname, 'public', 'template', `${req.params.name}.html`);
        let cssFilePath = path.join(__dirname, 'public', 'css', `${req.params.name}.css`);
        let jsonDataPath = path.join(__dirname, 'public', 'json', `${req.params.name}.json`);

        const jsonData = await fs.readFile(jsonDataPath, 'utf-8');
        const htmlTemplate = await fs.readFile(htmlTemplatePath, 'utf-8'); 

        const template = handlebars.compile(htmlTemplate);
        const compiledHtml = template(JSON.parse(jsonData));

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(compiledHtml);

        await page.waitForTimeout(1000);

        const css = await fs.readFile(cssFilePath, 'utf-8'); 

        await page.addStyleTag({ content: css });

        const pdfBuffer = await page.pdf({
            // format: 'A4',
            width: req.query.width,
            height: req.query.height,
            printBackground: true,
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=downloaded_file.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
