import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RecipeCard from "../components/RecipeCard";
import { ThemeProvider } from "../context/ThemeContext";

describe("RecipeCard Component", () => {
  const mockRecipe = {
    name: "Pizza",
    description: "Cheese pizza",
    category: "italian",
    ingredients: ["cheese", "flour"]
  };

  it("renders recipe title", () => {
    render(
      <ThemeProvider>
        <RecipeCard recipe={mockRecipe} />
      </ThemeProvider>
    );

    expect(screen.getByText("Pizza")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <ThemeProvider>
        <RecipeCard recipe={mockRecipe} />
      </ThemeProvider>
    );

    expect(screen.getByText("Cheese pizza")).toBeInTheDocument();
  });
});