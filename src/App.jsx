import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeDetail />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
