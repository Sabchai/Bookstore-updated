import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f1cfa1] to-[#ebe2b3]">
            <div className="max-w-4xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-[#e0d0b0]">
                    {/* Cart Header */}
                    <div className="px-6 py-4 border-b border-[#e0d0b0] flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-[#6d4c41]">Shopping Cart</h2>
                        <button
                            onClick={handleClearCart}
                            className="relative -m-2 py-1 px-4 bg-gradient-to-r from-[#3f7c99] to-[#502b05] text-white rounded-md hover:bg-[#9f7e63] transition-all duration-200"
                            disabled={cartItems.length === 0}
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="px-6 py-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-[#6d4c41]">Your cart is empty</p>
                                <Link to="/" className="text-[#9f7e63] hover:text-[#7a5c46] mt-2 inline-block">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((product) => (
                                    <div key={product?._id} className="flex items-center space-x-4 py-4 border-b border-[#e0d0b0] last:border-0">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-[#e0d0b0]">
                                            <img
                                                src={getImgUrl(product?.coverImage)}
                                                alt={product?.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-[#6d4c41]">
                                                <Link to="/">{product?.title}</Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-[#8f7d67]">Category: {product?.category}</p>
                                            <p className="mt-1 text-sm text-[#8f7d67]">Quantity: 1</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-medium text-[#6d4c41]">${product?.newPrice}</p>
                                            <button
                                                onClick={() => handleRemoveFromCart(product)}
                                                className="relative -m-2 py-1 px-4 bg-gradient-to-r from-[#bfa38d] to-[#9f7e63] text-white rounded-md hover:bg-[#9f7e63] transition-all duration-200"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary */}
                    {cartItems.length > 0 && (
                        <div className="bg-[#e4c5a7] px-6 py-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-[#6d4c41]">Subtotal</p>
                                    <p className="text-sm text-[#8f7d67] mt-0.5">Shipping and taxes calculated at checkout</p>
                                </div>
                                <p className="text-2xl font-semibold text-[#6d4c41]">${totalPrice}</p>
                            </div>
                            <div className="mt-4">
                                <Link
                                    to="/checkout"
                                    className="w-full inline-block text-center py-3 px-6 bg-gradient-to-r from-[#50331d] to-[#212705] text-white rounded-md hover:bg-[#9f7e63] focus:outline-none focus:ring-2 focus:ring-[#9f7e63] focus:ring-offset-2"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    to="/"
                                    className="text-center block mt-4 text-sm text-[#6d4c41] hover:text-[#7a5c46]"
                                >
                                    or Continue Shopping → 
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartPage;
