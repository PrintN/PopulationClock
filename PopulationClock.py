import asyncio
from pyppeteer import launch
from bs4 import BeautifulSoup
import time

# Load website for 3 sec and scrape the website
async def main():
    browser = await launch()
    page = await browser.newPage()
    await page.goto('https://www.worldometers.info/world-population/')
    await page.waitFor(3000)

    html = await page.content()
    await browser.close()
    return html

# Parse the response
def world_population(html_response):
    soup = BeautifulSoup(html_response, 'html.parser')

    world_population_10e9 = soup.select_one('span.rts-nr-int.rts-nr-10e9').get_text()
    world_population_10e6 = soup.select_one('span.rts-nr-int.rts-nr-10e6').get_text()
    world_population_10e3 = soup.select_one('span.rts-nr-int.rts-nr-10e3').get_text()
    world_population_10e0 = soup.select_one('span.rts-nr-int.rts-nr-10e0').get_text()

    world_population_string = ','.join([world_population_10e9, world_population_10e6, world_population_10e3, world_population_10e0])

    print('World Population:', world_population_string)

# Run everything in a loop
async def run_loop():
    while True:
        html_response = await main()
        world_population(html_response)
        time.sleep(3)

asyncio.get_event_loop().run_until_complete(run_loop())
