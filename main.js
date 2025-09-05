import puppeteer from 'puppeteer'
import { sendMail } from './mailer.js'

export async function scrape(url, targetPrice, user){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    const timer = setInterval(async () => {
        await page.goto(url)
        const name = await page.$eval('h2', res => res.textContent.trim())
        const price = await page.$eval('h3 > span', res => res.textContent.trim())
        console.log({Item: name, Price: price })

        if (price === targetPrice){
            clearInterval(timer)
            sendMail(user, name, price)
            await browser.close()
        }

    }, 5000)

}

