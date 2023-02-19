import fs from 'fs'
import { GENRES } from './constants'

export function search(parseMetaFilePath: string = './data/parsed-meta.json') {
	const file = fs.readFileSync(parseMetaFilePath, 'utf-8')
	const parsed = JSON.parse(file)
	return parsed

	// console.log('-- CHOOSE GENRE -- ')
	// for (let i = 0; i < GENRES.length; i++) console.log(`${i}) ${GENRES[i].name}`)
}
