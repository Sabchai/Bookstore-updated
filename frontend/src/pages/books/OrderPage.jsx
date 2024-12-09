import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth()
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse text-soft-peach">Loading...</div>
        </div>
    )
    
    if (isError) return (
        <div className="text-red-400 text-center p-4">Error getting orders data</div>
    )

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#f5e6d3] to-[#e2d1c3] p-6'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='text-3xl font-bold text-[#8B4513] mb-8 text-center'>Your Orders</h2>
                
                {orders.length === 0 ? (
                    <div className="text-center p-8 bg-white/80 rounded-lg shadow-lg">
                        No orders found!
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {orders.map((order, index) => (
                            <div 
                                key={order._id} 
                                className="bg-white/90 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02] border border-[#d4b59d]"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <span className='px-4 py-1 bg-amber-700 text-white rounded-full text-sm'>
                                        Order #{index + 1}
                                    </span>
                                    <span className="text-[#8B4513] font-medium">
                                        ${order.totalPrice}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="pb-3 border-b border-[#e2d1c3]">
                                        <h3 className="font-semibold text-[#8B4513] mb-2">Order Details</h3>
                                        <p className="text-[#6B4423]">ID: {order._id}</p>
                                        <p className="text-[#6B4423]">Name: {order.name}</p>
                                        <p className="text-[#6B4423]">Email: {order.email}</p>
                                        <p className="text-[#6B4423]">Phone: {order.phone}</p>
                                    </div>

                                    <div className="pb-3 border-b border-[#e2d1c3]">
                                        <h3 className="font-semibold text-[#8B4513] mb-2">Shipping Address</h3>
                                        <p className="text-[#6B4423]">
                                            {order.address.city}, {order.address.state}, 
                                            {order.address.country}, {order.address.zipcode}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-[#8B4513] mb-2">Products</h3>
                                        <ul className="grid grid-cols-2 gap-2">
                                            {order.productIds.map((productId) => (
                                                <li 
                                                    key={productId}
                                                    className="bg-[#f5e6d3] p-2 rounded text-sm text-[#6B4423] truncate"
                                                >
                                                    {productId}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderPage