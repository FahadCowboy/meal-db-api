const loadMeal = async () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value
    // console.log(searchValue)
    searchField.value = ''
    if(searchValue == ''){
        showMeals([])
    } else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
        const responce = await fetch(url)
        const data = await responce.json()
        showMeals(data.meals)

        // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        // .then(responce => responce.json())
        // .then(data => showMeals(data.meals))
    }

}

const showMeals = meals => {
    const error = document.getElementById('error-text')
    const mealsContainer = document.getElementById('meals-container')
    // remove result
    mealsContainer.textContent = ''

    // Add result
    if(meals === null){
        error.innerText = 'Search result not fount!'
    } else if(meals.length === 0){
        error.innerText = `Search Query is Empty!`
    } else{
        error.innerText = ``
        meals.forEach(meal => {
            const div = document.createElement('div')
            div.classList = 'col'
            div.innerHTML = `
                    <div class="card" onclick="loadDetails(${meal.idMeal})">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                        </div>
                    </div>
            `
            mealsContainer.appendChild(div)
            
        })
    }
}

const loadDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(response => response.json())
        .then(data => showDetails(data.meals[0]))
}

const showDetails = meal => {
    const div = document.createElement('div')
    div.classList = 'card bg-transparent w-100 m-4'
    const mealDeatailesParent = document.getElementById('details-parent')
    mealDeatailesParent.textContent = ''
    div.innerHTML = `
        <div class="card bg-transparent" style="width: 100%">
            <img src="${meal.strMealThumb}" class="card-img-top w-25" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 130)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Watch Recipie</a>
            </div>
        </div>
    `
    mealDeatailesParent.appendChild(div)
}

