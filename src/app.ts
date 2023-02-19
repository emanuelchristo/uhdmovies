import { scrape } from './scrape'
import { parse } from './parse'
import { metadata } from './metadata'
import { parseMeta } from './parse-meta'
import { search } from './search'
import { GENRES } from './constants'
import express from 'express'

const app = express()

app.use(express.static('./public'))

app.get('/watchables', (req, res) => {
	res.json(search())
})

app.get('/genres', (req, res) => {
	res.json(GENRES)
})

app.listen(3000, () => {
	console.log('Listening on port 3000...')
})

// search()
