//Probando conexión SSH desde nueva maquina

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//UTILS
function renderMovies (movies, container) {
    container.innerHTML = '';

    movies.forEach(element => {
        const moviesContainer = document.createElement("div")
        moviesContainer.classList.add("movie-container")
    
        const image = document.createElement("img")
        image.classList.add("movie-img")
        image.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + element.poster_path,
          );
    
          moviesContainer.append(image)
          container.append(moviesContainer)
      });
}

function renderCategories (categories, container) {
    categories.forEach(element => {
        const categoryContainer = document.createElement("div")
        categoryContainer.classList.add("category-container")

        const categoryTitle = document.createElement("h3")
        categoryTitle.innerText = element.name
        categoryTitle.classList.add("category-title")
        categoryTitle.setAttribute("id", "id" + element.id)

        categoryContainer.append(categoryTitle)
        container.append(categoryContainer)

        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${element.id}-${element.name}`
            
            const moviesByCategories = Array.from(genericSection.children);
            if(!moviesByCategories.length) {
                getMoviesByCategory(element.id)
            } else {
                genericSection.innerText = ""
                getMoviesByCategory(element.id)
            }
        })
    });
}

//API REQUEST

async function getTrendingMoviesPreview () {
    const { data } = await api("trending/all/day")
    const movies = data.results
    
    renderMovies(movies, trendingMoviesPreviewList)
}

async function getCategories () {
    const { data } = await api ("genre/tv/list?&language=en")
    const categories = data.genres
    
    renderCategories (categories, categoriesPreviewList)
}

async function getMoviesByCategory (id) {
    const { data } = await api("/discover/movie", {
        // (`/discover/movie?with_genres=${id}`)
        params: {
            with_genres : id,
        }
    })
    const movies = data.results
    
    renderMovies(movies, genericSection)
    
    //TO-DO: Solucionar Bug: Nombres de categorias erroneos al tener caracteres especiales (Ej: Sci-Fi)
    const title = location.hash.split("-")
    headerCategoryTitle.innerText = title[1]
}


    //TO-DO: Construir funcion para la busqueda de peliculas
    // Buscaremos por nombre y la petición a la API se debe hacer por name o id.
async function getMoviesBySearch (query) {
    const { data } = await api("/search/movie", {
        params: {
            // query : query,
            query,
        }
    })
    const movies = data.results
    
    renderMovies(movies, genericSection)
}