const searchBtn = document.getElementById('search__btn');
const mealList = document.getElementById('meal__item-wrapper');
const mealDetailsContent = document.querySelector('.meal__details-content');
const recipeCloseBtn = document.getElementById('recipe-close--btn');

// event listeners ==> 

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//get meal list that matches with the ingredients 

function getMealList() {
    let searchInputTxt = document.getElementById
    ('search__input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(Response => Response.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class="meal__item" data-id= "${meal.
                        idMeal}">
                        <div class="meal__img">
                            <img src="${meal.strMealThumb}" alt="food" />
                        </div>
                        <div class="meal__name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#/" class="btn recipe--btn">Get Resipe</a>
                        </div>
                    </div>
                `;
            });
        } else {
            html = "Oh, it appers we didn't find any recipe :(";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

//get recipe of the meal

function getMealRecipe(e) {
    e.preventDefault();
    if(e.target.classList.contains('recipe--btn')) {
        let meal__item = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal__item.dataset.id}`)
        .then(response => response.json())
        .then(data => MealRecipeModal(data.meals));
    }
}

// create a modal 

function MealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class="recipe__title">${meal.strMeal}</h2>
        <p class="recipe__category">${meal.strCategory}</p>
        <div class="recipe__instructions">
            <h3 class="recipe__instructions-title">instructions:</h3>
            <p class="recipe__text">${meal.strInstructions}</p>
        </div>
        <div class="recipe__meal-img">
            <img src="${meal.strMealThumb}" alt="" />
        </div>
        <div class="recipe__link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}