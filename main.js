const BASE_URL = "https://handla.api.ica.se";

async function getRandomRecipe() {
  const url = encodeURI(`${BASE_URL}/api/recipes/random?numberofrecipes=1`);
  const result = await fetch(url);
  const recipe = await result.json();
  return recipe.Recipes;
}

async function main() {
  const recipe = await getRandomRecipe();
  console.log(recipe);
}

main();
