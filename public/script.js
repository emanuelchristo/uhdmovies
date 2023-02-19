const tableBody = document.getElementById('table-body')
let watchables = []
let selectedGenre = 'All'

function genGenreStr(genres) {
	if (!genres) return ''
	let str = ''
	for (let g of genres) str += g + ', '
	return str
}

function genreChangeHandler(target) {
	selectedGenre = target.value
	console.log('first')

	let selected = []
	for (let w of watchables) {
		if (w.meta && w.meta.genres.includes(selectedGenre)) selected.push(w)
		else if (w.meta && selectedGenre == 'All') selected.push(w)
	}
	setWatchables(selected)
}

fetch('/genres')
	.then((res) => res.json())
	.then((genres) => {
		let html =
			'<div><input type="radio" name="genre" value="All" id="All" onclick="genreChangeHandler(this)" checked /> <label for="All">All</label></div>'
		for (let g of genres) {
			let str = `<div><input type="radio" name="genre" value="${g.name}" id="${g.name}" onclick="genreChangeHandler(this)" /> <label for="${g.name}">${g.name}</label></div>`
			html += str
		}
		document.getElementById('genre-selector').innerHTML = html
	})

fetch('/watchables')
	.then((res) => res.json())
	.then((w) => {
		watchables = [...w]
		setWatchables(watchables)
	})

function setWatchables(watchables) {
	tableRowsHtml = ''
	for (let w of watchables) {
		if (!w.meta) continue
		let rowHtml = `<tr>
      <td><img src='${w.uhdmovies.imageUrl}' class="poster-image" /></td>
      <td>${w.uhdmovies.title}</td>
      <td>${w.uhdmovies.year}</td>
      <td>${genGenreStr(w.meta?.genres)}</td>
      <td>${w.meta?.mediaType}</td>
      <td class='overview'>${w.meta?.overview}</td>
      <td><a href='${w.uhdmovies.postUrl}' target='_blank'>Link</a></td>
    </tr>`
		tableRowsHtml += rowHtml
	}
	tableBody.innerHTML = tableRowsHtml
}
