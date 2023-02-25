
const loadData = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.meals))
}

const displayData = data => {
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // console.log(sliceData);
    
    const sliceData = data.slice(0,6);
    sliceData.forEach(meal => {
        // console.log(meal.idMeal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.length > 200 ? meal.strInstructions.slice(1,200) + '...': 'no description'}</p>
                      <a  onclick = "openDialog(${meal.idMeal})" href="" class="text-warning " data-bs-toggle="modal" data-bs-target="#showDetails">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
        `;

        cardContainer.appendChild(div);
    });
}


const loadDataBySearch = () => {
    const searchInput = document.getElementById('search-text');
    const searchValue = searchInput.value;
    loadData(searchValue)
    // console.log(searchValue);
    searchInput.value = '';
}



const openDialog = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDialog(data.meals[0]))
}

const displayDialog = meals => {
    console.log(meals);
    document.getElementById('showDetailsLabel').innerHTML = meals.strMeal;
    const bodyPic =  document.getElementById('showDetailsBody');
    bodyPic.innerHTML = `
    <img class = "img-fluid" src="${meals.strMealThumb}" alt="">
    `
    document.getElementById('category').innerText = meals.strCategory;
    document.getElementById('areas').innerText = meals.strArea;
    document.getElementById('instructions').innerText = meals.strInstructions;
    document.getElementById('Youtube').innerText = meals.strYoutube;
}

const showMoreItems = () => {

}


loadData('');