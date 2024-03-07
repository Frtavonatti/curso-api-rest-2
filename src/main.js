const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`

document.addEventListener("DOMContentLoaded", getTrendingMoviesPreview)

async function getTrendingMoviesPreview () {
    const res = await fetch (API_URL)
    const data = await res.json()

    const movies = data.results
    movies.forEach(element => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const container = document.createElement("div")
        container.classList.add("movie-container")

        const image = document.createElement("img")
        image.classList.add("movie-img")
        image.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + element.poster_path,
          );

        container.append(image)
        trendingPreviewMoviesContainer.append(container)
    });
}