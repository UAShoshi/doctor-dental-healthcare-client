import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Lock,
    MapPin,
    CreditCard,
    ShoppingBag,
} from "lucide-react";

import { useCart } from "../../Provider/CartProvider";
import Swal from "sweetalert2";


const Checkout = () => {

    const navigate = useNavigate();

    // ================= CART =================

    const { cart } = useCart();


    // ================= COUPON =================

    const [couponCode] = useState(() => {
        return localStorage.getItem("couponCode") || "";
    });

    const [discountPercent] = useState(() => {
        return Number(localStorage.getItem("discountPercent")) || 0;
    });

    const [couponApplied] = useState(() => {
        return localStorage.getItem("couponApplied") === "true";
    });


    // ================= CUSTOMER INFO =================

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });


    // ================= PAYMENT =================

    const [paymentMethod, setPaymentMethod] = useState("cash");


    // ================= CART CALCULATION =================
    // Same calculation as Cart.jsx

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // Same discount calculation as Cart.jsx

    const discount =
        (subtotal * discountPercent) / 100;


    // Same delivery fee as Cart.jsx

    const deliveryFee =
        cart.length > 0 ? 100 : 0;


    // Same final total as Cart.jsx

    const total =
        subtotal - discount + deliveryFee;


    // ================= INPUT CHANGE =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };


    // ================= PLACE ORDER =================

    const handlePlaceOrder = (e) => {

        e.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            navigate("/shop");

            return;
        }


        const orderData = {

            customer: formData,

            products: cart,

            paymentMethod,

            couponCode:
                couponApplied
                    ? couponCode
                    : "",

            discountPercent:
                couponApplied
                    ? discountPercent
                    : 0,

            subtotal,

            deliveryFee,

            discount,

            total,

            orderDate:
                new Date().toISOString(),
        };


        console.log("Order Data:", orderData);


        // Clear cart after successful order
        localStorage.removeItem("cart");

        localStorage.removeItem("couponCode");

        localStorage.removeItem("discountPercent");

        localStorage.removeItem("couponApplied");


        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire({
            icon: "success",
            title: "Order placed successfully! 🎉"
        });


        navigate("/order-success");
    };


    // ================= EMPTY CART =================

    if (cart.length === 0) {

        return (

            <div className="min-h-screen bg-slate-50 pt-28 pb-16">

                <div className="max-w-4xl mx-auto px-5">

                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

                        <ShoppingBag
                            size={55}
                            className="mx-auto text-sky-600 mb-5"
                        />

                        <h1 className="text-3xl font-bold text-slate-900">
                            Your Cart is Empty
                        </h1>

                        <p className="text-slate-500 mt-3">
                            Please add some dental care products before checkout.
                        </p>

                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 mt-7 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Continue Shopping
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-slate-50 pt-28 pb-16">

            <div className="max-w-7xl mx-auto px-5">


                {/* ================= HEADER ================= */}

                <div className="mb-10">

                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-5"
                    >
                        <ArrowLeft size={18} />

                        Back to Cart
                    </Link>


                    <p className="text-sky-600 font-bold uppercase tracking-wider text-sm">
                        DentalCare Shop
                    </p>


                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">
                        Checkout
                    </h1>


                    <p className="text-slate-500 mt-3">
                        Complete your information and place your order.
                    </p>

                </div>


                <form onSubmit={handlePlaceOrder}>

                    <div className="grid lg:grid-cols-3 gap-8">


                        {/* ================================================= */}
                        {/* LEFT SIDE */}
                        {/* ================================================= */}

                        <div className="lg:col-span-2 space-y-6">


                            {/* ================= CUSTOMER INFORMATION ================= */}

                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center">

                                        <CheckCircle
                                            size={20}
                                            className="text-sky-600"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Customer Information
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Enter your contact information
                                        </p>

                                    </div>

                                </div>


                                <div className="grid md:grid-cols-2 gap-5">


                                    {/* First Name */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter your first name"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>


                                    {/* Last Name */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter your last name"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>


                                    {/* Email */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="example@gmail.com"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>


                                    {/* Phone */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+880 1XXXXXXXXX"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ================= SHIPPING ADDRESS ================= */}

                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center">

                                        <MapPin
                                            size={20}
                                            className="text-sky-600"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Shipping Address
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Where should we deliver your order?
                                        </p>

                                    </div>

                                </div>


                                {/* Address */}

                                <div className="mb-5">

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Full Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House number, road, area..."
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 h-28 resize-none outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                        required
                                    />

                                </div>


                                <div className="grid md:grid-cols-2 gap-5">


                                    {/* City */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            City
                                        </label>

                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Dhaka"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>


                                    {/* Postal Code */}

                                    <div>

                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Postal Code
                                        </label>

                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                            placeholder="1200"
                                            className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                                            required
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* ================= PAYMENT METHOD ================= */}

                            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center">

                                        <CreditCard
                                            size={20}
                                            className="text-sky-600"
                                        />

                                    </div>

                                    <div>

                                        <h2 className="text-xl font-bold text-slate-900">
                                            Payment Method
                                        </h2>

                                        <p className="text-sm text-slate-500">
                                            Select your preferred payment method
                                        </p>

                                    </div>

                                </div>


                                <div className="space-y-3">


                                    {/* Cash on Delivery */}

                                    <label
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "cash"
                                            ? "border-sky-500 bg-sky-50"
                                            : "border-slate-200 hover:border-sky-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash"
                                            checked={paymentMethod === "cash"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                            className="radio radio-info"
                                        />

                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                Cash on Delivery
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                Pay when your order arrives.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Card */}

                                    <label
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "card"
                                            ? "border-sky-500 bg-sky-50"
                                            : "border-slate-200 hover:border-sky-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === "card"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                            className="radio radio-info"
                                        />

                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                Credit / Debit Card
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                Secure online payment.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Mobile Banking */}

                                    <label
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${paymentMethod === "mobile"
                                            ? "border-sky-500 bg-sky-50"
                                            : "border-slate-200 hover:border-sky-300"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="mobile"
                                            checked={paymentMethod === "mobile"}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                            className="radio radio-info"
                                        />

                                        <div>

                                            <h3 className="font-semibold text-slate-900">
                                                Mobile Banking
                                            </h3>

                                            <p className="text-sm text-slate-500">
                                                bKash / Nagad / Rocket
                                            </p>

                                        </div>

                                    </label>

                                </div>

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* RIGHT SIDE - ORDER SUMMARY */}
                        {/* ================================================= */}

                        <div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28">


                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    Order Summary
                                </h2>


                                {/* ================= PRODUCTS ================= */}

                                <div className="space-y-4">

                                    {cart.map((item) => (

                                        <div
                                            key={item._id}
                                            className="flex gap-3 items-center"
                                        >

                                            {/* Image */}

                                            <div className="relative shrink-0">

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                                                />

                                                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-semibold">
                                                    {item.quantity}
                                                </span>

                                            </div>


                                            {/* Name */}

                                            <div className="flex-1 min-w-0">

                                                <h3 className="font-semibold text-slate-900 text-sm truncate">
                                                    {item.name}
                                                </h3>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    ৳{item.price} × {item.quantity}
                                                </p>

                                            </div>


                                            {/* Item total */}

                                            <p className="font-bold text-slate-900 text-sm">
                                                ৳{(
                                                    item.price *
                                                    item.quantity
                                                ).toFixed(0)}
                                            </p>

                                        </div>

                                    ))}

                                </div>


                                <div className="border-t border-slate-200 my-6"></div>


                                {/* ================= SUBTOTAL ================= */}

                                <div className="flex justify-between text-slate-600 mb-4">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-slate-900">
                                        ৳{subtotal.toFixed(0)}
                                    </span>

                                </div>


                                {/* ================= COUPON ================= */}

                                {couponApplied && discountPercent > 0 && (

                                    <div className="flex justify-between text-green-600 mb-4">

                                        <span>
                                            Discount ({discountPercent}%)
                                        </span>

                                        <span className="font-semibold">
                                            -৳{discount.toFixed(0)}
                                        </span>

                                    </div>

                                )}


                                {/* ================= DELIVERY ================= */}

                                <div className="flex justify-between text-slate-600 mb-5">

                                    <span>
                                        Delivery Fee
                                    </span>

                                    <span className="font-semibold text-slate-900">
                                        ৳{deliveryFee}
                                    </span>

                                </div>


                                {/* ================= TOTAL ================= */}

                                <div className="border-t border-slate-200 pt-5">

                                    <div className="flex justify-between items-center">

                                        <span className="text-lg font-bold text-slate-900">
                                            Total
                                        </span>

                                        <span className="text-2xl font-bold text-sky-600">
                                            ৳{total.toFixed(0)}
                                        </span>

                                    </div>


                                    {/* ================= PLACE ORDER ================= */}

                                    <button
                                        type="submit"
                                        className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                                    >

                                        <CheckCircle size={18} />

                                        Place Order

                                    </button>


                                    {/* Security */}

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-5">

                                        <Lock size={14} />

                                        Secure & Protected Checkout

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
};


export default Checkout;