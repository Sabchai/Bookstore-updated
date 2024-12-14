import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImg from "../assets/avatar.png";

// Dark mode toggle
const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'; // Chequea el localStorage
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 text-yellow-600 dark:text-white rounded transition"
    >
      {isDarkMode ? '☀ ' : '🌙 '}
    </button>
  );
};

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = ({ onSearch }) => { // Recibimos onSearch como prop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda
  const cartItems = useSelector((state) => state.cart.cartItems);
  const favoriteBooks = useSelector((state) => state.favorites.favoriteBooks);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();  // Para la redirección

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);  // Pasamos el término de búsqueda al componente superior (App.js)
  };

  const handleLogOut = () => {
    logout();
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado del link
    if (currentUser?.isAdmin) {
      navigate("/Dashboard");  // Si es admin, va al Dashboard
    } else {
      navigate("/");  // Si no es admin, va al inicio
    }
  };

  return (
    <header className="bg-gradient-to-r from-soft-purple via-soft-pink to-soft-peach shadow-md">
      <nav className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center md:gap-8 gap-4">
            <Link to="/" className="hover:scale-110 transition-transform">
              <HiMiniBars3CenterLeft className="size-7 text-gray-700 hover:text-gray-900" />
            </Link>

            {/* Input de búsqueda */}
            <div className="relative sm:w-80 w-48">
              <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search here"
                className="w-full py-2.5 pl-12 pr-4 rounded-full bg-white/80 backdrop-blur-sm border border-soft-purple/20 focus:outline-none focus:ring-2 focus:ring-soft-purple/30 transition-all"
                value={searchTerm}
                onChange={handleSearchChange}  // Actualiza el término de búsqueda
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex items-center md:space-x-6 space-x-4">
            <div>
              {currentUser ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="transform hover:scale-105 transition-all duration-200"
                  >
                    <img
                      src={avatarImg}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full ring-2 ring-soft-purple/50 hover:ring-soft-pink/50 transition-all"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-soft-purple/20 z-50 overflow-hidden">
                      <ul className="py-2">
                        <li>
                          <a 
                            href="#"
                            onClick={handleDashboardClick}
                            className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-soft-purple/20 transition-colors"
                          >
                            Dashboard
                          </a>
                        </li>
                        {navigation.map((item) => (
                          <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                            <Link
                              to={item.href}
                              className="block px-6 py-2.5 text-sm text-gray-700 hover:bg-soft-purple/20 transition-colors"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li className="px-4 pt-2 pb-4">
                          <button
                            onClick={handleLogOut}
                            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-slate-400 hover:bg-stone-800 rounded-lg transition-colors"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="hover:scale-110 transition-transform">
                  <HiOutlineUser className="size-6 text-gray-700 hover:text-gray-900" />
                </Link>
              )}
            </div>

            {/* Favorites Button with Count */}
            <Link to="/cart" className="relative hover:scale-110 transition-transform">
              <HiOutlineHeart className="size-6 text-gray-700 hover:text-gray-900" />
              {favoriteBooks.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {favoriteBooks.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 px-4 py-2.5 bg-soft-blue hover:bg-soft-purple/30 rounded-full transition-colors"
            >
              <HiOutlineShoppingCart className="text-4xl p-2 bg-amber-500 text-black rounded-md" />
              <span className="font-medium text-gray-700">
                {cartItems?.length > 0 ? cartItems.length : "0"}
              </span>
            </Link>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
