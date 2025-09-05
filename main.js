import puppeteer from 'puppeteer'

async function scrape(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const name = await page.$eval('h2', res => res.textContent.trim())
    const price = await page.$eval('h3 > span', res => res.textContent.trim())

    console.log({Item: name, Price: price })
    await browser.close()
}
scrape('https://secure.runescape.com/m=itemdb_oldschool/Zulrah%27s+scales/viewitem?obj=12934')
scrape('https://secure.runescape.com/m=itemdb_oldschool/Superior+dragon+bones/viewitem?obj=22124')
scrape('https://secure.runescape.com/m=itemdb_oldschool/Dragon+bones/viewitem?obj=536')
scrape('https://secure.runescape.com/m=itemdb_oldschool/Noxious+halberd/viewitem?obj=29796')
scrape('https://secure.runescape.com/m=itemdb_oldschool/Venator+shard/viewitem?obj=27614')
scrape('https://secure.runescape.com/m=itemdb_oldschool/Venator+ring/viewitem?obj=28310')