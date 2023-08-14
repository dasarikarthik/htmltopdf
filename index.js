const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const prompt = require("prompt-sync")({sigint: true});

// function generate_pdf(jsonfile, htmlfile, cssfile, outputname) {
//     let jsonDataPath = path.join(__dirname, jsonfile);
//     let htmlTemplatePath = path.join(__dirname, htmlfile);
//     let cssFilePath = path.join(__dirname, cssfile);
//     let pdfFilePath = path.join(__dirname, outputname);

//     (async function () {
//         try {
//             const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf-8'));
//             const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');

//             const template = handlebars.compile(htmlTemplate);
//             const compiledHtml = template(jsonData);

//             const browser = await puppeteer.launch();
//             const page = await browser.newPage();

//             await page.setContent(compiledHtml);

//             await page.waitForTimeout(1000);

//             const css = fs.readFileSync(cssFilePath, 'utf-8');

//             await page.addStyleTag({ content: css });

//             await page.pdf({
//                 path: pdfFilePath,
//                 format: 'A4',
//                 // width: 367,
//                 // height: 744,
//                 printBackground: true,
//             });

//             console.log(`PDF created successfully: ${pdfFilePath}`);

//             await browser.close();
//         } catch (err) {
//             console.error('Error generating PDF:', err);
//         }
//     })();
// }


// let num = prompt("Enter no. of PDFs needed: ");

// while(isNaN(num)){
//     console.error("Entered is not a number")
//     num = prompt("Enter no. of PDFs needed: ");
// }
    
// for (let i = 0; i < num; i++) {
//     let clientname = prompt(`Enter client name ${i + 1}: `);
//     let type = prompt(`Enter type of pdf ${i+1}: `);
//     let name=`${clientname}_${type}`
//     let jsonFile = `json/${name}.json`;
//     let htmlFile = `template/${name}.html`;
//     let cssFile = `css/${name}.css`;
//     let pdfFile = `${name}${i+1}.pdf`;


//     if (!fs.existsSync(jsonFile) || !fs.existsSync(htmlFile) || !fs.existsSync(cssFile)) {
//         console.error(`Some of the required files are missing for PDF ${i + 1}. Skipping...`);
//         continue;
//     }

//     generate_pdf(jsonFile, htmlFile, cssFile, pdfFile);
// }


const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const jsonDataPath = path.join(__dirname, 'json/traffic.json');
const htmlTemplatePath = path.join(__dirname, 'template/traffic.html');
const cssFilePath = path.join(__dirname, 'css/traffic.css');
const pdfFilePath = path.join(__dirname, 'traffic.pdf');
(async function () {
    try {
       const jsonData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf-8'));
        const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf-8');
        const template = handlebars.compile(htmlTemplate);
        const compiledHtml = template(jsonData);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(compiledHtml);
        await page.waitForTimeout(1000);
        const css = fs.readFileSync(cssFilePath, 'utf-8');
        await page.addStyleTag({ content: css });
        await page.waitForTimeout(2000);
        await page.pdf({
            path: pdfFilePath,
            width: 380,
            height: 980,
            printBackground: true,
        });
        console.log(`PDF created successfully: ${pdfFilePath}`);
        await browser.close();
    } catch (err) {
        console.error('Error generating PDF:', err);
    }
})();