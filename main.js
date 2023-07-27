const BASE_URL = "https://handla.api.ica.se";

let headers = {};

const config = {
  USERNAME: process.env.PERSONAL_NUMBER,
  PASSWORD: process.env.ICA_PASSWORD,
};

async function login(username, password) {
  const url = encodeURI(`${BASE_URL}/api/login`);
  const base64Credentials = Buffer.from(
    `${username}:${password}`,
    "utf8",
  ).toString("base64");
  const result = await fetch(url, {
    headers: {
      Authorization: `Basic ${base64Credentials}`,
    },
  });
  const authenticationTicket = result.headers.get("AuthenticationTicket");
  headers.AuthenticationTicket = authenticationTicket;
}

async function getRandomRecipe() {
  const url = encodeURI(`${BASE_URL}/api/recipes/random?numberofrecipes=1`);
  const result = await fetch(url);
  const recipe = await result.json();
  return recipe.Recipes;
}

async function main() {
  await login(config.USERNAME, config.PASSWORD);
}

main();
