import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
     const { register, handleSubmit, formState: { errors } } = useForm();
     const [createOrder, { isLoading, error }] = useCreateOrderMutation();
     const navigate = useNavigate(); 
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode,
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };
            console.log(newOrder);
        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Okay"
            });
            navigate("/orders"); 
        } catch (error) {
            console.error("Error placing the order", error);
            alert("Failed to place an order");
        }
    };

    if (isLoading) return <div>Loading....</div>;

    return (
        <section>
            <div className="min-h-screen p-6 bg-gradient-to-br from-[#f4e1d2] to-[#e8c4a5] flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    {/* Bloque de Cash on Delivery, Items y Total Price */}
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-[#e0b39a] mb-6">
                        <h2 className="font-bold text-2xl bg-gradient-to-r from-[#9e7a60] to-[#d29a6a] bg-clip-text text-transparent mb-2">Cash On Delivery</h2>
                        <p className="text-[#5f4b3b] text-lg font-medium mb-2">Total Price: <span className="text-[#9e7a60] font-bold">${totalPrice}</span></p>
                        <p className="text-[#5f4b3b]">Items: <span className="font-medium">{cartItems.length > 0 ? cartItems.length : 0}</span></p>
                    </div>

                    {/* Bloque de formulario con los detalles personales */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8 mb-6 border border-[#e0b39a]">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 gap-y-4 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-[#5f4b3b]">
                                <p className="font-bold text-xl bg-gradient-to-r from-[#9e7a60] to-[#d29a6a] bg-clip-text text-transparent">Personal Details</p>
                                <p className="mt-2 text-[#5f4b3b]">Please fill out all the fields.</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-3 text-sm grid-cols-1 md:grid-cols-5">
                                    {/* Full Name */}
                                    <div className="md:col-span-5">
                                        <label htmlFor="full_name" className="text-[#5f4b3b] font-medium">Full Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            type="text" name="name" id="name"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-white/50 focus:border-[#9e7a60] focus:ring focus:ring-[#9e7a60] focus:ring-opacity-50 transition-all duration-200" />
                                    </div>

                                    {/* Email */}
                                    <div className="md:col-span-5">
                                        <label htmlFor="email" className="text-[#5f4b3b] font-medium">Email Address</label>
                                        <input
                                            type="text" name="email" id="email"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-gray-50"
                                            disabled
                                            placeholder="email@domain.com" />
                                    </div>

                                    {/* Phone */}
                                    <div className="md:col-span-5">
                                        <label htmlFor="phone" className="text-[#5f4b3b] font-medium">Phone Number</label>
                                        <input
                                            {...register("phone", { required: true })}
                                            type="number" name="phone" id="phone"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-white/50 focus:border-[#9e7a60] focus:ring focus:ring-[#9e7a60] focus:ring-opacity-50 transition-all duration-200"
                                            placeholder="+123 456 7890" />
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-3">
                                        <label htmlFor="address" className="text-[#5f4b3b] font-medium">Address / Street</label>
                                        <input
                                            {...register("address", { required: true })}
                                            type="text" name="address" id="address"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-white/50 focus:border-[#9e7a60] focus:ring focus:ring-[#9e7a60] focus:ring-opacity-50 transition-all duration-200" />
                                    </div>

                                    {/* City */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="city" className="text-[#5f4b3b] font-medium">City</label>
                                        <input
                                            {...register("city", { required: true })}
                                            type="text" name="city" id="city"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-white/50 focus:border-[#9e7a60] focus:ring focus:ring-[#9e7a60] focus:ring-opacity-50 transition-all duration-200" />
                                    </div>

                                    {/* Country */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="country" className="text-[#5f4b3b] font-medium">Country / region</label>
                                        <div className="h-11 bg-white/50 flex border border-[#e0b39a] rounded-lg items-center mt-1 focus-within:border-[#9e7a60] focus-within:ring focus-within:ring-[#9e7a60] focus-within:ring-opacity-50 transition-all duration-200">
                                            <input
                                                {...register("country", { required: true })}
                                                name="country" id="country" placeholder="Country"
                                                className="px-4 appearance-none outline-none text-[#5f4b3b] w-full bg-transparent" />
                                        </div>
                                    </div>

                                    {/* State */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="state" className="text-[#5f4b3b] font-medium">State / province</label>
                                        <div className="h-11 bg-white/50 flex border border-[#e0b39a] rounded-lg items-center mt-1 focus-within:border-[#9e7a60] focus-within:ring focus-within:ring-[#9e7a60] focus-within:ring-opacity-50 transition-all duration-200">
                                            <input
                                                {...register("state", { required: true })}
                                                name="state" id="state" placeholder="State"
                                                className="px-4 appearance-none outline-none text-[#5f4b3b] w-full bg-transparent" />
                                        </div>
                                    </div>

                                    {/* Zipcode */}
                                    <div className="md:col-span-1">
                                        <label htmlFor="zipcode" className="text-[#5f4b3b] font-medium">Zipcode</label>
                                        <input
                                            {...register("zipcode", { required: true })}
                                            type="text" name="zipcode" id="zipcode"
                                            className="h-11 border border-[#e0b39a] mt-1 rounded-lg px-4 w-full bg-white/50 focus:border-[#9e7a60] focus:ring focus:ring-[#9e7a60] focus:ring-opacity-50 transition-all duration-200" />
                                    </div>

                                    {/* Terms & Conditions */}
                                    <div className="md:col-span-5 mt-3">
                                                <div className="inline-flex items-center">
                                                    <input
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                        type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                    <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                                </div>
                                            </div>

                                    {/* Submit Button */}
                                    <div className="md:col-span-5 flex justify-center mt-4">
                                        <button
                                            type="submit"
                                            className="w-full md:w-auto py-3 px-6 text-white font-semibold bg-[#9e7a60] hover:bg-[#7f5b41] rounded-lg"
                                            disabled={!isChecked}
                                        >
                                            Submit Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
