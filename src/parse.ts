import fs from 'fs'
import { Post, Watchable } from './types'

function parsePost(p: Post): Watchable {
	const w: Watchable = {
		title: '',
		year: '',
		rawTitle: p.title,
		imageUrl: p.imageUrl,
		postUrl: p.postUrl,
	}

	const m = p.title.replace(/&amp;/g, '&').match(/Download (.+)\(([\d-]*)\)/)
	w.title = m?.[1]?.trim() || ''
	w.year = m?.[2]?.trim() || ''

	return w
}

export function parse(scrapedFilePath: string = './data/scraped.json', outFilePath: string = './data/watchables.json') {
	let file = fs.readFileSync(scrapedFilePath, 'utf-8')
	const posts = JSON.parse(file)
	const watchables: Watchable[] = []
	for (let p of posts) watchables.push(parsePost(p))
	fs.writeFileSync(outFilePath, JSON.stringify(watchables))
}
