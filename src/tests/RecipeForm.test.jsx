import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import RecipeForm from "../components/RecipeForm";

test("shows form heading", () => {
  render(<RecipeForm onRecipeCreated={() => {}} />);

  expect(screen.getByText(/add recipe/i)).toBeInTheDocument();
});