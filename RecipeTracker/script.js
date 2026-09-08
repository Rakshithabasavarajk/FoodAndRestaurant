// ---------- Your original data + functions, unchanged ----------

const recipes = [];

const recipe1 = {
  name: "Spaghetti Carbonara",
  ingredients: ["spaghetti", "Parmesan cheese", "pancetta", "black pepper"],
  cookingTime: 22,
  totalIngredients: null,
  difficultyLevel: ""
};

const recipe2 = {
  name: "Chicken Curry",
  ingredients: ["chicken breast", "coconut milk", "curry powder", "onion", "garlic"],
  cookingTime: 42,
  totalIngredients: null,
  difficultyLevel: ""
};

const recipe3 = {
  name: "Vegetable Stir Fry",
  ingredients: ["broccoli", "carrot", "bell pepper"],
  cookingTime: 15,
  totalIngredients: null,
  difficultyLevel: ""
};

recipes.push(recipe1, recipe2, recipe3);

function getTotalIngredients(ingredients) {
  return ingredients.length;
}

function getDifficultyLevel(cookingTime) {
  if (cookingTime <= 30) {
    return "easy";
  } else if (cookingTime <= 60) {
    return "medium";
  } else {
    return "hard";
  }
}

recipe1.totalIngredients = getTotalIngredients(recipe1.ingredients);
recipe1.difficultyLevel = getDifficultyLevel(recipe1.cookingTime);

recipe2.totalIngredients = getTotalIngredients(recipe2.ingredients);
recipe2.difficultyLevel = getDifficultyLevel(recipe2.cookingTime);

recipe3.totalIngredients = getTotalIngredients(recipe3.ingredients);
recipe3.difficultyLevel = getDifficultyLevel(recipe3.cookingTime);

// ---------- New: turning it into a working mini project ----------

const recipeList = document.getElementById("recipe-list");
const recipeCount = document.getElementById("recipe-count");
const form = document.getElementById("recipe-form");

// Build one recipe card as a DOM element
function createRecipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";

  const title = document.createElement("h3");
  title.textContent = recipe.name;

  const metaRow = document.createElement("div");
  metaRow.className = "meta-row";

  const time = document.createElement("span");
  time.textContent = `${recipe.cookingTime} min`;

  const tag = document.createElement("span");
  tag.className = `difficulty-tag ${recipe.difficultyLevel}`;
  tag.textContent = recipe.difficultyLevel;

  metaRow.appendChild(time);
  metaRow.appendChild(tag);

  const ingredientsLine = document.createElement("p");
  ingredientsLine.className = "ingredients";
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = `${recipe.totalIngredients} ingredients: `;
  ingredientsLine.appendChild(label);
  ingredientsLine.append(recipe.ingredients.join(", "));

  card.appendChild(title);
  card.appendChild(metaRow);
  card.appendChild(ingredientsLine);

  return card;
}

// Re-render the whole list from the recipes array
function renderRecipes() {
  recipeList.innerHTML = "";

  if (recipes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No recipes logged yet — add your first one above.";
    recipeList.appendChild(empty);
  } else {
    recipes.forEach((recipe) => {
      recipeList.appendChild(createRecipeCard(recipe));
    });
  }

  recipeCount.textContent = `${recipes.length} recipe${recipes.length === 1 ? "" : "s"}`;
}

// Handle new recipe submissions using the same two functions above
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const ingredientsInput = document.getElementById("ingredients");
  const cookingTimeInput = document.getElementById("cookingTime");

  const ingredientsArray = ingredientsInput.value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const cookingTime = Number(cookingTimeInput.value);

  const newRecipe = {
    name: nameInput.value.trim(),
    ingredients: ingredientsArray,
    cookingTime: cookingTime,
    totalIngredients: getTotalIngredients(ingredientsArray),
    difficultyLevel: getDifficultyLevel(cookingTime)
  };

  recipes.push(newRecipe);
  renderRecipes();

  form.reset();
  nameInput.focus();
});

// Initial paint on page load
renderRecipes();