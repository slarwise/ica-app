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

async function getMostVisitedStores() {
  const url = `${BASE_URL}/api/user/stores`;
  const result = await fetch(url, { headers });
  const data = await result.json();
  return data;
}

async function getStoreInformation(storeId) {
  const url = encodeURI(`${BASE_URL}/api/stores/${storeId}`);
  const result = await fetch(url, { headers });
  return await result.json();
}

async function getAllShoppingLists() {
  const url = `${BASE_URL}/api/user/offlineshoppinglists`;
  const result = await fetch(url, { headers });
  return (await result.json()).ShoppingLists;
}

async function getShoppingList(offlineId) {
  const url = `${BASE_URL}/api/user/offlineshoppinglists/${offlineId}`;
  const result = await fetch(url, { headers });
  return await result.json();
}

async function syncShoppingList(offlineId, shoppingList) {
  const url = `${BASE_URL}/api/user/offlineshoppinglists/${offlineId}/sync`;
  const result = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(shoppingList),
  });
  const data = await result.json();
  console.log(result.status);
  return data;
}

async function main() {
  await login(config.USERNAME, config.PASSWORD);
  const shoppingLists = await getAllShoppingLists();
  console.log(shoppingLists);
  console.log(shoppingLists[0].Rows);
  const offlineId = shoppingLists[0].OfflineId;
  const shoppingList = await getShoppingList(offlineId);
  const newShoppingList = await syncShoppingList(offlineId, shoppingList);
  console.log(newShoppingList);
}

main();
