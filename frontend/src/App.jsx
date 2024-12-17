import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Banner from "./pages/home/Banner";
import { Outlet } from "react-router-dom";
import { AuthProvide } from "./context/AuthContext";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // For search term
  const [email, setEmail] = useState(""); // For subscription email

  // Handle the search term input
  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log("Searching for:", term);
  };

  // Handle subscription to the backend
  const handleSubscription = async (e, email) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/subscribe/subscribe",
        { email }
      );
      console.log("Server response:", response.data);
      alert("Subscription successful!");
      setEmail(""); // Clear the email input
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Subscription failed. Please try again later.");
    }
  };

  return (
    <AuthProvide>
      {/* Navbar */}
      <Navbar onSearch={handleSearch} />

      {/* Main Content */}
      <main className="min-h-screen text-black dark:bg-gray-900 dark:text-black transition-colors duration-300 max-w-screen-2xl mx-auto px-4 py-6 font-primary">
        {/* Renderiza Banner solo una vez */}
        <Banner
          handleSubscription={handleSubscription}
          email={email}
          setEmail={setEmail}
        />

        {/* Aquí se renderizan las rutas dinámicas, no agregues Banner de nuevo en los Outlet */}
        <Outlet context={{ searchTerm, handleSubscription, setEmail }} />
      </main>

      {/* Footer */}
      <Footer
        email={email}
        setEmail={setEmail}
        handleSubscription={handleSubscription}
      />
    </AuthProvide>
  );
}

export default App;
