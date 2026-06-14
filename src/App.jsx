import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="max-w-5xl mx-auto p-4">
        <Home />
      </main>
    </div>
  );
}

export default App;
