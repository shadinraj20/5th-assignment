function getMeals(query){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then(res=> res.json())
    .then(data => displayMeal(data.meals));
}

const displayMeal = meals => {
  console.log(meals);
  const foods = document.getElementById('all-foods');
  foods.innerHTML = '';

  
  meals.map(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.className ='col-lg-3 mt-5';

    const foodInfo =`
      <a href='index.html?meal=${meal.idMeal}'>
        <img class="img-fluid img" src='${meal.strMealThumb}'/>
        <h4>${meal.strMeal}</h4>
        </a>
    `
    mealDiv.innerHTML = foodInfo;
    foods.appendChild(mealDiv);
  })
}


const displayMealDetails = meal => {
  const foods = document.getElementById('all-foods');

  
  const mealDiv = document.createElement('div');
    mealDiv.className ='col-lg-6 mx-auto';

    const foodInfo =`
    <div>
      <img class="img-fluid img" src='${meal.strMealThumb}'/>
      <h1>${meal.strMeal}</h1>
      <ul> 
      <li>${meal.strIngredient1}</li>
      <li>${meal.strIngredient2}</li>
      <li>${meal.strIngredient3}</li>
      <li>${meal.strIngredient4}</li>
      <li>${meal.strIngredient5}</li>
       </ul>
       </div>
    `
    foods.innerHTML = foodInfo;
}


const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search_button');


searchButton.addEventListener('click', function() {
  const query = searchInput.value;
  getMeals(query);
})


window.addEventListener('load', function(e) {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get('meal');
  if(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=> res.json())
    .then(data => displayMealDetails(data.meals[0]));
  } 
})