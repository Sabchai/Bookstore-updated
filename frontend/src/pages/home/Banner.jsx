import React, { useState } from "react";
import bannerImg from "../../assets/banner.jpeg"; // Asumiendo que la imagen es correcta

const Banner = ({ handleSubscription, email, setEmail }) => {
  const [emailInput, setEmailInput] = useState(email); // Estado local para el input de correo
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controla si el popup está abierto

  // Manejar el cambio en el correo
  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubscription(e, emailInput); // Llamada al backend
    setIsPopupOpen(false); // Cerrar el popup después de suscribir
  };

  // Abrir el popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Cerrar el popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      {/* Imagen del banner */}
      <div className="md:w-1/2 w-full flex items-center md:justify-start">
        <img
          src={bannerImg}
          alt="Banner"
          className="w-[80%] max-w-[400px] ml-12 object-cover"
        />
      </div>

      {/* Contenido del banner */}
      <div className="md:w-1/2 w-full pl-4 md:pl-12">
        <h1 className="md:text-3xl text-xl font-medium mb-5 dark:text-white">
          New Books Out Now
        </h1>
        <p className="text-m mb-7 text-gray-600 dark:text-white">
          Discover the best new book releases and find your next read. Find the
          latest books that we’ve released this week. If you’re looking for the
          best new releases, you’ve come to the right place.
        </p>

        {/* Botón para abrir el popup */}
        <button
          onClick={openPopup}
          className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-[#967f4e] hover:scale-105 transition duration-300"
        >
          Subscribe
        </button>
      </div>

      {/* Popup de suscripción */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md w-96 relative">
            {/* Símbolo de cierre en la esquina superior derecha */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black dark:text-white"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Subscribe to our Newsletter
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                value={emailInput}
                onChange={handleEmailChange}
                className="border border-gray-300 px-4 py-2 rounded-md text-black dark:text-white mb-4"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-[#967f4e] transition duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
