import { useState } from "react";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <RecipeForm onAdd={triggerRefresh} />

        <RecipeList refresh={refresh} />
      </div>
    </div>
  );
}
