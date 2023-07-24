const puppeteer = require('puppeteer');

// URL of the website to scrape
const url = 'https://www.worldometers.info/world-population/';

// Function to scrape the data
async function scrapeWorldPopulation() {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);

    // Wait for 2 seconds to let the website load
    await page.waitForTimeout(2000);

    const getDataFromElement = async (className) => {
      const element = await page.$(`span.${className}`);
      return await page.evaluate((el) => el.textContent, element);
    };

    const worldPopulation10e9 = await getDataFromElement('rts-nr-int.rts-nr-10e9');
    const worldPopulation10e6 = await getDataFromElement('rts-nr-int.rts-nr-10e6');
    const worldPopulation10e3 = await getDataFromElement('rts-nr-int.rts-nr-10e3');
    const worldPopulation10e0 = await getDataFromElement('rts-nr-int.rts-nr-10e0');

    const worldPopulationString = [worldPopulation10e9, worldPopulation10e6, worldPopulation10e3, worldPopulation10e0].join(',');

    console.log('World Population:', worldPopulationString);

    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the scraper function every 3 seconds
setInterval(scrapeWorldPopulation, 3000);
