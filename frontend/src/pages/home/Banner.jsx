import React, { useState } from "react";
import axios from "axios"; // Asegúrate de instalar axios: npm install axios
import bannerImg from "../../assets/banner.jpeg";

// Componente del Modal
const SubscriptionModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Subscribe to Our Newsletter
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-gray-700">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente del Banner
const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abrir y cerrar modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Manejar envío del formulario
  const handleSubscription = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      // Usar Axios para enviar el email al backend
      const response = await axios.post("http://localhost:5000/api/subscribe", {
        email,
      });

      console.log("Respuesta del servidor:", response.data);
      alert("Subscription successful!");
      closeModal();
    } catch (error) {
      console.error("Error al enviar la suscripción:", error);
      if (error.response) {
        // Mostrar el mensaje de error del servidor
        alert(error.response.data.error || "An error occurred. Please try again.");
      } else {
        alert("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-start">
        <img
          src={bannerImg}
          alt="Banner"
          className="w-[80%] max-w-[400px] ml-12 object-cover"
        />
      </div>

      <div className="md:w-1/2 w-full pl-4 md:pl-12">
        <h1 className="md:text-3xl text-xl font-medium mb-5">
          New Books Out Now
        </h1>
        <p className="text-m mb-7 text-gray-600">
          Discover the best new book releases and find your next read. Find the
          latest books that we’ve released this week. If you’re looking for the
          best new releases, you’ve come to the right place. Our expert
          booksellers put together this curated collection of the top rated new
          releases, bestselling new books, and soon-to-be trending titles.
        </p>

        {/* Botón que abre el modal */}
        <button
          onClick={openModal}
          className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-[#967f4e] hover:scale-105"
        >
          Subscribe
        </button>
      </div>

      {/* Modal de suscripción */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubscription}
      />
    </div>
  );
};

export default Banner;
