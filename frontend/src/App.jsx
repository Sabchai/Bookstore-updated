import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { AuthProvide } from './context/AuthContext';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term); // Establecer el término de búsqueda
    console.log("Searching for:", term);
  };

  return (
    <>
      <AuthProvide>
        <Navbar onSearch={handleSearch} /> {/* Pasa la función handleSearch a Navbar */}
        <main className="min-h-screen text-black dark:bg-gray-900 dark:text-black transition-colors duration-300 max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          {/* Aquí puedes utilizar searchTerm para filtrar el contenido */}
          <Outlet context={{ searchTerm }} /> {/* Pasa el searchTerm al Outlet */}
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;
