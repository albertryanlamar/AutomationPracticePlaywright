import { testDataBasePath } from '../utils/constant';
import * as fs from 'fs'
import path from 'path'
import { Page } from '@playwright/test';

let readFile: any;
let finalTestdataPath: any;

async function takeScreenshot(page: Page, name: string, testInfo: any, description: any) {
        const folder = path.join(process.cwd(), "src", 'screenshots');
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

        const filePath = path.join(folder, `${name}.png`);
        const buffer = await page.screenshot({ path: filePath, fullPage: true });

        // Attach to HTML report
        await testInfo.attach(name, {
            body: buffer,
            contentType: 'image/png',
            description: description
        });
}

// Function to read JSON test data
export function readJsonTestdata(filename: string, testdataFolder: string) {
    finalTestdataPath = checkFile(path.join(testDataBasePath, testdataFolder, filename));
    return readFile = JSON.parse(fs.readFileSync(finalTestdataPath, 'utf-8'));
}

export function checkFile(path:any){
    if(!fs.existsSync(path)){
        throw new Error(`Testdata file not found ${path}`)
    }
    return path;
}

export function sdsad(inputdate){

    const date = new Date(inputdate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear(); 

    const months = [
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
];

const monthValue = isNaN(Number(inputdate))? String(months.indexOf(inputdate.toLowerCase()) + 1)
  : inputdate;

  return monthValue;
}