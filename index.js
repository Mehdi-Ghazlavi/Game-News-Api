const PORT = 8000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

const newspapers = [
    {
        name: 'msn',
        address: 'https://www.msn.com/en-us/esports/news/lol?form=ML23Z2&OCID=ML23Z2',
        base: ''
    },
]

const posts = []

posts.forEach(post => {
    axios.get(post.address,)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("Crypto")',html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                posts.push({
                    title,
                    url: post.base + url,
                    source: post.name
                })
            })
        })
})

app.get('/', (req ,res) => {
    res.json('Welcome to my Crypto News API')
})

app.get('/news', (req,res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', async (req,res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("Crypto")',html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)
        })
})

app.listen(PORT, () => console.log('server running'))
