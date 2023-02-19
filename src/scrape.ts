import axios from 'axios'
import jsdom from 'jsdom'
import fs from 'fs'
const { JSDOM } = jsdom
import { Post } from './types'

function extractPosts(postNodes: any): Post[] {
	let posts: Post[] = []
	for (let n of postNodes) {
		let p: Post = {
			title: n.children[1].children[0].children[0].children[0].innerHTML as string,
			postUrl: n.children[1].children[0].href as string,
			imageUrl: n.children[0].children[0].children[0].src as string,
		}
		posts.push(p)
	}
	return posts
}

async function fetchPage(pageNumber: number): Promise<Post[]> {
	return new Promise(async (resolve, reject) => {
		try {
			const res = await axios.get(`https://uhdmovies.world/page/${pageNumber}/`)
			const dom = new JSDOM(res.data)
			const { document } = dom.window
			let postNodes = document.querySelectorAll('.post')
			let posts: Post[] = extractPosts(postNodes)
			resolve(posts)
		} catch (err) {
			console.log(err)
			reject(null)
		}
	})
}

export async function scrape(outFilePath: string = './data/scraped.json') {
	let MAX_PAGE_NUM = 104
	let allPosts: Post[] = []

	for (let i = 1; i <= MAX_PAGE_NUM; i++) {
		let posts = await fetchPage(i)
		console.log(`Page (${i}/${MAX_PAGE_NUM}) - Posts: ${posts.length}`)
		allPosts = [...allPosts, ...posts]
	}
	console.log(`Completed: ${allPosts.length} posts`)

	fs.writeFileSync(outFilePath, JSON.stringify(allPosts))
}
