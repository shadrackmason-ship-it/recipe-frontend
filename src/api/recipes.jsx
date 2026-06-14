const BASE_URL = "http://127.0.0.1:8001/recipes/";

export async function getRecipes() {
  const response = await fetch(BASE_URL);
  return response.json();
}

export async function createRecipe(recipe) {
    const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  return response.json();
}

export async function deleteRecipe(id) {
  const response = await fetch(`${BASE_URL}${id}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function updateRecipe(id, updatedRecipe) {
  const response = await fetch(`${BASE_URL}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRecipe),
  });
  return response.json();
}