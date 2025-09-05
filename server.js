import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'
import { scrape } from './main.js'

const app = express()
const PORT = 4000
const __file = fileURLToPath(import.meta.url)
const __dir = path.dirname(__file)
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dir, 'frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dir, 'frontend', 'index.html'))
})

app.post('/run', async (req, res) => {
    const { email, scaleprice, itemlist, dBonePrice } = req.body

    if (!email || !itemlist) return res.sendStatus(401);

    try{
        if (itemlist.includes('Zulrah Scales')){
            await scrape('https://secure.runescape.com/m=itemdb_oldschool/Zulrah%27s+scales/viewitem?obj=12934', `${scaleprice}`, `${email}`)
        }

        if (itemlist.includes('dBones')){
            await scrape('https://secure.runescape.com/m=itemdb_oldschool/Dragon+bones/viewitem?obj=536', `${dBonePrice}`, `${email}`)
        }
        
        res.sendStatus(200)
    }
    catch {
        res.sendStatus(500)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`)
})