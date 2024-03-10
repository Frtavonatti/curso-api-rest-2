searchFormBtn.addEventListener("click", () => {
    location.hash = "#search="
})

arrowBtn.addEventListener("click", () => {
    location.hash = "#home"
})

trendingBtn.addEventListener("click", () => {
    location.hash = "#trends="
})


window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator() {  
    console.log({ location });
  
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
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  
function homePage() {
    console.log('Home');

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
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    const childrenCategoriesPreview = Array.from(categoriesPreviewList.children);
        if(!childrenCategoriesPreview.length) {
        getTrendingMoviesPreview()
        getCategories()
  }
}

function categoriesPage() {
    console.log('Categories');

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
}

function movieDetailsPage() {
    console.log('Movie');
    
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
}

function searchPage() {
    console.log('Search');

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
}

function trendsPage() {
    console.log('Trends');  

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
}