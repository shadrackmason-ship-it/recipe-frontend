import { render, screen } from "@testing-library/react";
import { vi, test, expect } from "vitest";
import RecipeList from "../components/RecipeList";

vi.mock("../api/recipes", () => ({
  getRecipes: () =>
    Promise.resolve({
      data: [
        { id: 1, title: "Pasta", description: "Yummy", category: "Dinner" },
      ],
    }),
  deleteRecipe: vi.fn(),
  updateRecipe: vi.fn(),
}));

test("renders recipe", async () => {
  render(<RecipeList refresh={0} />);
  expect(await screen.findByText("Pasta")).toBeInTheDocument();
});