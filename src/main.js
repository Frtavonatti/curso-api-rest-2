// PENDIENTES:
// - Challenge: Eliminar botones, implementando scroll infinito

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//LAZY LOADING
let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // let image = entry.target
            let url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src',url);
            observer.unobserve(entry.target);
        }
    })
})

//UTILS
// Aprender: Uso de ={} al enviar argumentos en un objeto ¿para que sirve? 
// Según el curso es para abordar el caso cuando no se envian los argumentos, pero no me quedo claro
function renderMovies (movies, container, {lazyLoading = false, clean = true,} = {}) {
    if (clean) {
        container.innerHTML = '';
    }

    movies.forEach(element => {
        const moviesContainer = document.createElement("div")
        moviesContainer.classList.add("movie-container")
    
        const image = document.createElement("img")
        image.classList.add("movie-img")
        image.setAttribute(
            lazyLoading ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300' + element.poster_path,
          );

        if (!element.poster_path) {
            image.classList.add("movie-img--default")
        }

        image.setAttribute('alt', element.title)
        
        image.addEventListener('click', () => {
            location.hash = `#movie=${element.id}`
        })

        if (lazyLoading) {
            observer.observe(image)
        }

        moviesContainer.append(image)
        container.append(moviesContainer)
    });
}

function renderCategories(categories, container) {
    container.innerHTML = ''; // Limpia el contenedor primero

    categories.forEach(element => {
        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add("category-container");

        const categoryTitle = document.createElement("h3");
        categoryTitle.innerText = element.name;
        categoryTitle.classList.add("category-title");
        categoryTitle.setAttribute("id", "id" + element.id);

        categoryContainer.append(categoryTitle);
        container.append(categoryContainer);

        categoryTitle.addEventListener("click", () => {
            location.hash = `#category=${element.id}-${element.name}`;
            genericSection.innerHTML = '';
            getMoviesByCategory(element.id);
        });
    });
}

//API REQUEST

async function getTrendingMoviesPreview() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const { data } = await api("trending/all/day")
    const movies = data.results
    
    renderMovies(movies, trendingMoviesPreviewList, {lazyLoading: true})
}

async function getCategories () {
    // Añadimos un delay de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

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
    
    renderMovies(movies, genericSection, {lazyLoading: true})
    
    //TO-DO: Solucionar Bug: Nombres de categorias erroneos al tener caracteres especiales (Ej: Sci-Fi)
    const title = location.hash.split("-")
    headerCategoryTitle.innerText = title[1]
}

async function getMoviesBySearch (query) {
    const { data } = await api("/search/movie", {
        params: {
            // query : query,
            query,
        }
    })
    const movies = data.results
    
    renderMovies(movies, genericSection, {lazyLoading: true})
}

async function getTrendingMoviesSection (page = 1) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const { data } = await api("trending/all/day", {
        params: {
            page,
        }
    });
    const movies = data.results;
    console.log(movies); // Test
    
    // renderMovies(movies, trendingMoviesPreviewList, {lazyLoading: true, clean: page == 1});
    renderMovies(movies, genericSection, {lazyLoading: true, clean: page == 1});
    
    const btnLoadMore = document.createElement('button')
    btnLoadMore.innerText = 'Cargar más'
    btnLoadMore.addEventListener('click', () => {
        btnLoadMore.style.display = 'none';
        getTrendingMoviesSection(page + 1)
    })
    genericSection.append(btnLoadMore)
}

async function getMovieById (id) {
    const { data } = await api(`/movie/${id}`, {
        params: {
            query: id,
        }
    })

    headerSection.style.background = `
        linear-gradient(
            180deg, 
            rgba(0, 0, 0, 0.35) 19.27%, 
            rgba(0, 0, 0, 0) 29.17%
            ),

        url(https://image.tmdb.org/t/p/w400${data.backdrop_path})`

    movieDetailTitle.innerText = data.title
    movieDetailDescription.innerText = data.overview
    movieDetailScore.innerText = data.vote_average.toFixed(1)

    movieDetailCategoriesList.innerHTML = ''
    renderCategories(data.genres, movieDetailCategoriesList)
    getSugestedMoviesByCategory(data.id)
}

async function getSugestedMoviesByCategory (movie_id) {
    const { data } = await api(`movie/${movie_id}/recommendations`)
    const movies = data.results

    renderMovies(movies, relatedMoviesContainer, {lazyLoading: true})
}