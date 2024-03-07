const API_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
const API_GENRE = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en`

document.addEventListener("DOMContentLoaded", async function () {
    getTrendingMoviesPreview()
    getCategories()
})

async function getTrendingMoviesPreview () {
    const res = await fetch (API_URL)
    const data = await res.json()

    const movies = data.results
    movies.forEach(element => {
        const trendingMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const moviesContainer = document.createElement("div")
        moviesContainer.classList.add("movie-container")

        const image = document.createElement("img")
        image.classList.add("movie-img")
        image.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + element.poster_path,
          );

        moviesContainer.append(image)
        trendingMoviesContainer.append(moviesContainer)
    });
}

async function getCategories () {
    const res = await fetch (API_GENRE)
    const data = await res.json()
    const categories = data.genres

    categories.forEach(element => {
        console.log(element)
        const categoriesSection = document.querySelector("#categoriesPreview .categoriesPreview-list")
        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add("category-container")

        const categoryTitle = document.createElement("h3")
        categoryTitle.innerText = element.name
        categoryTitle.classList.add("category-title")
        categoryTitle.setAttribute("id", element.id)

        categoryContainer.append(categoryTitle)
        categoriesSection.append(categoryContainer)
    });
}