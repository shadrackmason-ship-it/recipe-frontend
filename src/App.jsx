import { useEffect, useState } from 'react'
import { getAllRecipes } from './services/api'

function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRecipes()
      .then(res => {
        setRecipes(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{
      backgroundColor: '#FFFFFF', 
      color: '#1A1A1A', 
      minHeight: '100vh', 
      padding: '40px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 className='text-4xl text-orange-500 font-bold'>
        Recipe Collection
      </h1>
      
      {loading && <p style={{color: '#1A1A1A'}}>Loading recipes...</p>}
      
      {recipes.length === 0 && !loading && (
        <div style={{
          border: '2px solid #FF6B35', 
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{color: '#1A1A1A', fontSize: '18px'}}>
            No recipes in database yet
          </p>
        </div>
      )}

      {recipes.map(recipe => (
        <div key={recipe.id} style={{
          border: '2px solid #FF6B35', 
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{color: '#1A1A1A', margin: '0 0 8px 0'}}>
            {recipe.title}
          </h2>
          <p style={{color: '#1A1A1A', margin: '0'}}>
            {recipe.description}
          </p>
        </div>
      ))}
    </div>
  )
}

export default App