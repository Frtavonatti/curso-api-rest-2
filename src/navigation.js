let maxPage;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
    location.hash = `#search=${searchFormInput.value}`
})

searchFormInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && searchFormInput.value.trim() !== "") {
      location.hash = `#search=${searchFormInput.value}`;
  }
});

arrowBtn.addEventListener("click", () => {
    history.back()
})

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends="
})

window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)
window.addEventListener('scroll', infiniteScroll, false)


function getPaginatedMovies(endPoint, whereToAppendIt) {
  let currentPage = 1;
  return async function (id) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
  } = document.documentElement;
  
  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15)
  const pageIsNotMax = currentPage < maxPage
  
    if (scrollIsBottom && pageIsNotMax) {
        currentPage++

        // Revisar si es el mejor lugar para poner el setTimeOut
        // El objetivo es que haga las peticiones a la API en orden 
        // (p2 y al momento que esto cargue pueda enviar el get para p3 y así...)
        await new Promise(resolve => setTimeout(resolve, 1));
        const { data } = await api(endPoint, {
            params: { 
                page: currentPage, 
            },
        });
        const whatToAppend = data.results;
        console.log(data);
        
        if (data.total_results) {
          renderMovies(whatToAppend, whereToAppendIt, { lazyLoad: true, clean: false })
        } else {
          console.log('No se han encontrado resultados')
          // TO-DO: Si esto ocurre una vez impedir que se realice la misma solicitud
          // TO-DO: Si existieron resultados, pero ya no quedan mas por mostrar, impedir nueva solicitud
        }
    }
  }
}

function navigator() { 
  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;    
  }
  
    if (location.hash.startsWith('#trends')) {
      trendsPage();
    } else if (location.hash.startsWith('#search=')) {
      searchPage();
    } else if (location.hash.startsWith('#movie=')) {
      movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
      categoriesPage();
    } else {
      homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  
    if (infiniteScroll) {
      window.addEventListener('scroll', infiniteScroll, { passive: false });
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  
function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    searchFormInput.classList.remove("inactive")
    searchFormBtn.classList.remove("inactive")
  
    trendingPreviewSection.classList.remove('inactive');
    // trendingPreviewSection.classList.remove('movie-container--loading');
    categoriesPreviewSection.classList.remove('inactive');
    // categoriesPreviewSection.classList.remove('category-container--loading');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview()
    getCategories()
}

function getCategoryIdFromHash() {
  const hash = window.location.hash; // Obtiene el hash actual
  if (hash.startsWith("#category=")) {
      // Separa la parte después de #category=
      const [idWithText] = hash.split("=")[1].split("-");
      return parseInt(idWithText); // Convierte la parte numérica en un número
  }
  return null; // Si no coincide el formato, devolver null
}

function categoriesPage() {
    headerSection.classList.remove('inactive');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    title.classList.add('inactive');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")

    const categoryId = getCategoryIdFromHash(); // Extrae el ID de la categoría del hash
    // console.log('Test:' + categoryId)
    infiniteScroll = getPaginatedMovies(`/discover/movie?with_genres=${categoryId}`, genericSection);
}

function movieDetailsPage() {
    headerSection.classList.add("header-container--long")
    headerSection.classList.remove("inactive")
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    title.classList.add("inactive")

    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    searchForm.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.remove("inactive")

    const [_, id] = location.hash.split('=')
    getMovieById(id)
}

function searchPage() {
    trendingPreviewSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    headerTitle.classList.add('inactive');
    title.classList.add('inactive');
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    searchForm.classList.remove("inactive")
    searchFormInput.classList.remove("inactive")
    searchFormBtn.classList.remove("inactive")
    
    headerSection.classList.remove("inactive")
    genericSection.classList.remove("inactive")
    categoriesPreviewSection.classList.add("inactive")

    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query)
    infiniteScroll = getPaginatedMovies(`/search/movie?query=${query}`, genericSection)
}

function trendsPage() {
    trendingPreviewSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    headerCategoryTitle.innerText = "Trends"
    headerTitle.classList.add('inactive');
    title.classList.add('inactive');
    
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    searchForm.classList.add("inactive")
    
    headerSection.classList.remove("inactive")
    genericSection.classList.remove("inactive")
    categoriesPreviewSection.classList.add("inactive")

    getTrendingMoviesSection()
    infiniteScroll = getPaginatedMovies('trending/movie/day', genericSection)
}