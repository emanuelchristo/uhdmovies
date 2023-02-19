export type Post = {
	title: string
	imageUrl: string
	postUrl: string
}

export type Watchable = {
	title: string
	year: string
	rawTitle: string
	imageUrl: string
	postUrl: string
}

export type WatchMetaRaw = {
	watchable: Watchable
	meta: any
}

export type WatchParsed = {
	uhdmovies: Watchable
	meta: {
		adult: boolean
		id: number
		name: string
		overview: string
		posterPath: string
		mediaType: string
		genres: string[]
	} | null
}
