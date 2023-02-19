import fs from 'fs'
import { WatchMetaRaw, WatchParsed } from './types'
import { GENRES } from './constants'

function genGenres(genreIds: number[]): string[] {
	if (!genreIds) genreIds = []
	let genres = []
	for (let id of genreIds) {
		for (let G of GENRES) {
			if (G.id == id) genres.push(G.name as string)
		}
	}
	return genres
}

function parseWatchMetaRaw(m: WatchMetaRaw): WatchParsed {
	if (!m.meta || m.meta.total_results == 0)
		return {
			uhdmovies: m.watchable,
			meta: null,
		}

	let result = m.meta.results[0]
	let cleanedResult = {
		adult: result.adult as boolean,
		id: result.id as number,
		name: result.name as string,
		overview: result.overview as string,
		posterPath: result.poster_path as string,
		mediaType: result.media_type as string,
		genres: genGenres(result.genre_ids as number[]),
	}

	return {
		uhdmovies: m.watchable,
		meta: cleanedResult,
	}
}

export function parseMeta(
	metaRawFilePath: string = './data/watch-meta-raw.json',
	outFilePath: string = './data/parsed-meta.json'
) {
	const file = fs.readFileSync(metaRawFilePath, 'utf-8')
	const metaRaws = JSON.parse(file) as WatchMetaRaw[]
	const parsed: WatchParsed[] = []
	for (let m of metaRaws) parsed.push(parseWatchMetaRaw(m))
	fs.writeFileSync(outFilePath, JSON.stringify(parsed))

	let withMeta = 0,
		withoutMeta = 0
	for (let p of parsed) {
		if (!p.meta) withoutMeta += 1
		else withMeta += 1
	}
	console.log(`With meta: ${withMeta}, Without meta: ${withoutMeta}`)
}
