import { useState } from "react";
import Navbar from "./components/Navbar";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    
  );
}

export default App;