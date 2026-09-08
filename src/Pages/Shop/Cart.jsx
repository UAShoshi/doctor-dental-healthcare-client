import { useState } from "react";

import {
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    ArrowRight,
    Tag
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../../Provider/CartProvider";


const Cart = () => {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();


    // ================= COUPON STATE =================

    const [couponCode, setCouponCode] = useState(() => {
        return localStorage.getItem("couponCode") || "";
    });

    const [discountPercent, setDiscountPercent] = useState(() => {
        return Number(localStorage.getItem("discountPercent")) || 0;
    });

    const [couponApplied, setCouponApplied] = useState(() => {
        return localStorage.getItem("couponApplied") === "true";
    });

    const [couponMessage, setCouponMessage] = useState("");


    // ================= COUPON CODES =================

    const coupons = {
        DENTAL10: 10,
        SMILE15: 15,
        CARE20: 20
    };


    // ================= SUBTOTAL =================

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // ================= DISCOUNT =================

    const discount =
        (subtotal * discountPercent) / 100;


    // ================= DELIVERY =================

    const deliveryFee = cart.length > 0 ? 100 : 0;


    // ================= TOTAL =================

    const total =
        subtotal - discount + deliveryFee;


    // ================= APPLY COUPON =================

    const handleApplyCoupon = () => {

        const code = couponCode.trim().toUpperCase();

        if (!code) {
            setCouponMessage("Please enter a coupon code.");
            setCouponApplied(false);
            setDiscountPercent(0);

            return;
        }

        if (coupons[code]) {

            const discount = coupons[code];

            setCouponCode(code);
            setDiscountPercent(discount);
            setCouponApplied(true);

            setCouponMessage(
                `Coupon applied successfully! You saved ${discount}%.`
            );

            // Save coupon
            localStorage.setItem("couponCode", code);
            localStorage.setItem("discountPercent", discount);
            localStorage.setItem("couponApplied", "true");

        } else {

            setDiscountPercent(0);
            setCouponApplied(false);

            setCouponMessage(
                "Invalid coupon code. Please try again."
            );

            // Remove old coupon
            localStorage.removeItem("couponCode");
            localStorage.removeItem("discountPercent");
            localStorage.removeItem("couponApplied");
        }
    };


    return (

        <div className="min-h-screen bg-slate-50 pt-28 pb-16">

            <div className="max-w-7xl mx-auto px-5">


                {/* ================= CART HEADER ================= */}

                <div className="text-center mb-12">

                    <p className="text-sky-600 font-bold uppercase tracking-wider text-sm">
                        DentalCare Shop
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
                        Your Cart
                    </h1>

                    <p className="text-slate-500 mt-3">
                        Review your selected dental care products
                    </p>

                </div>


                {/* ================= EMPTY CART ================= */}

                {cart.length === 0 ? (

                    <div className="bg-white rounded-2xl border border-slate-200 p-12 md:p-20 text-center">

                        <div className="flex justify-center mb-6">

                            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center">

                                <ShoppingBag
                                    size={38}
                                    className="text-sky-600"
                                />

                            </div>

                        </div>


                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Your Cart is Empty
                        </h2>


                        <p className="text-slate-500 mt-3 max-w-md mx-auto">
                            You haven't added any dental care products yet.
                            Explore our shop and find the right products for your smile.
                        </p>


                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 mt-7 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                        >

                            Continue Shopping

                            <ArrowRight size={18} />

                        </Link>

                    </div>

                ) : (


                    /* ================= CART CONTENT ================= */

                    <div className="grid lg:grid-cols-3 gap-8">


                        {/* ================= CART ITEMS ================= */}

                        <div className="lg:col-span-2 space-y-5">


                            {/* Cart Items Heading */}

                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Cart Items
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {cart.length} Product
                                        {cart.length > 1 ? "s" : ""}
                                    </p>

                                </div>

                            </div>


                            {/* ================= PRODUCTS ================= */}

                            {cart.map((item) => (

                                <div
                                    key={item._id}
                                    className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5"
                                >

                                    <div className="flex flex-col sm:flex-row gap-5">


                                        {/* Product Image */}

                                        <div className="w-full sm:w-28 h-28 shrink-0 bg-slate-100 rounded-xl overflow-hidden">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />

                                        </div>


                                        {/* Product Information */}

                                        <div className="flex-1">

                                            <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                                                {item.category}
                                            </p>


                                            <h3 className="text-xl font-bold text-slate-900 mt-1">
                                                {item.name}
                                            </h3>


                                            <p className="text-lg font-semibold text-slate-700 mt-2">
                                                ৳{item.price}
                                            </p>


                                            {/* Quantity + Remove */}

                                            <div className="flex flex-wrap items-center gap-4 mt-4">


                                                {/* Quantity */}

                                                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">

                                                    <button
                                                        onClick={() =>
                                                            decreaseQuantity(item._id)
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition"
                                                    >

                                                        <Minus size={16} />

                                                    </button>


                                                    <span className="w-10 text-center font-semibold text-slate-700">
                                                        {item.quantity}
                                                    </span>


                                                    <button
                                                        onClick={() =>
                                                            increaseQuantity(item._id)
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 transition"
                                                    >

                                                        <Plus size={16} />

                                                    </button>

                                                </div>


                                                {/* Remove */}

                                                <button
                                                    onClick={() =>
                                                        removeFromCart(item._id)
                                                    }
                                                    className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium"
                                                >

                                                    <Trash2 size={16} />

                                                    Remove

                                                </button>

                                            </div>

                                        </div>


                                        {/* Item Total */}

                                        <div className="sm:text-right">

                                            <p className="text-sm text-slate-500">
                                                Item Total
                                            </p>

                                            <p className="text-xl font-bold text-slate-900 mt-1">
                                                ৳{(
                                                    item.price * item.quantity
                                                ).toFixed(0)}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}


                            {/* Continue Shopping */}

                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mt-2"
                            >

                                ← Continue Shopping

                            </Link>

                        </div>


                        {/* ================= ORDER SUMMARY ================= */}

                        <div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sticky top-28">


                                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                    Order Summary
                                </h2>


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

                                <div className="border-t border-slate-100 pt-5 mb-5">

                                    <div className="flex items-center gap-2 mb-3">

                                        <Tag
                                            size={18}
                                            className="text-sky-600"
                                        />

                                        <h3 className="font-semibold text-slate-900">
                                            Coupon Code
                                        </h3>

                                    </div>


                                    {/* Input + Apply */}

                                    <div className="flex gap-2">

                                        <input
                                            type="text"
                                            placeholder="Enter coupon"
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(e.target.value)
                                            }
                                            className="flex-1 min-w-0 border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-sky-500"
                                        />


                                        <button
                                            onClick={handleApplyCoupon}
                                            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                                        >

                                            Apply

                                        </button>

                                    </div>


                                    {/* Coupon Message */}

                                    {couponMessage && (

                                        <p
                                            className={`text-sm mt-2 ${couponApplied
                                                ? "text-green-600"
                                                : "text-red-500"
                                                }`}
                                        >

                                            {couponApplied
                                                ? "✓ "
                                                : "⚠ "
                                            }

                                            {couponMessage}

                                        </p>

                                    )}

                                </div>


                                {/* ================= DISCOUNT ================= */}

                                {couponApplied && (

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


                                    {/* ================= CHECKOUT ================= */}

                                    <Link
                                        to="/checkout"
                                        className="w-full mt-6 bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                                    >

                                        Proceed to Checkout

                                        <ArrowRight size={18} />

                                    </Link>


                                    {/* ================= CONTINUE SHOPPING ================= */}

                                    <Link
                                        to="/shop"
                                        className="w-full mt-3 border border-slate-200 hover:border-sky-400 text-slate-600 hover:text-sky-600 py-3.5 rounded-xl font-semibold flex items-center justify-center transition"
                                    >

                                        Continue Shopping

                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Cart;