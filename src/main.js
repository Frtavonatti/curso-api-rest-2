const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

document.addEventListener("DOMContentLoaded", async function () {
    getTrendingMoviesPreview()
    getCategories()
})

async function getTrendingMoviesPreview () {
    const { data } = await api("trending/all/day")
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
    const { data } = await api ("genre/tv/list?&language=en")
    const categories = data.genres

    categories.forEach(element => {
        const categoriesSection = document.querySelector("#categoriesPreview .categoriesPreview-list")
        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add("category-container")

        const categoryTitle = document.createElement("h3")
        categoryTitle.innerText = element.name
        categoryTitle.classList.add("category-title")
        categoryTitle.setAttribute("id", "id" + element.id)

        categoryContainer.append(categoryTitle)
        categoriesSection.append(categoryContainer)
    });
}