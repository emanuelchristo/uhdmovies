import axios from 'axios'
import fs from 'fs'
import { Watchable, WatchMetaRaw } from './types'

const API_KEY = '1bb297f4a907dbd48f6d0807def9536a'

async function fetchMeta(w: Watchable): Promise<WatchMetaRaw> {
	return new Promise(async (resolve, reject) => {
		try {
			if (!w.title) resolve({ watchable: w, meta: '' })

			const res = await axios.get('https://api.themoviedb.org/3/search/multi', {
				params: {
					api_key: API_KEY,
					include_adult: true,
					query: w.title,
				},
			})

			resolve({ watchable: w, meta: res.data })
		} catch (err) {
			console.log('Request error')
			reject(null)
		}
	})
}

export async function metadata(
	watchablesFilePath: string = './data/watchables.json',
	outFilePath: string = './data/watch-meta-raw.json'
) {
	const file = fs.readFileSync(watchablesFilePath, 'utf-8')
	const watchables = JSON.parse(file) as Watchable[]

	const watchMetaRaws: WatchMetaRaw[] = []

	console.log('-- Fetching Metadata --')
	for (let i = 0; i < watchables.length; i++) {
		console.log(`Watchable (${i + 1}/${watchables.length})`)
		const w = await fetchMeta(watchables[i])
		watchMetaRaws.push(w)
	}

	fs.writeFileSync(outFilePath, JSON.stringify(watchMetaRaws))
}
