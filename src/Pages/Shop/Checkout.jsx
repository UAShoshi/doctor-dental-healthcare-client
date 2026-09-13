import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { AuthContext } from "../../Provider/AuthProvider";
import { useCart } from "../../Provider/CartProvider";
import { Helmet } from "react-helmet-async";


const Checkout = () => {

    const navigate = useNavigate();

    const { cart } = useCart();

    const { user } = useContext(AuthContext);


    // ================= FORM DATA =================

    const [formData, setFormData] = useState({

        name: user?.displayName || "",

        email: user?.email || "",

        phone: "",

        address: "",

        city: "",

        postalCode: "",

    });


    // ================= PAYMENT =================

    const [paymentMethod, setPaymentMethod] =
        useState("Cash on Delivery");


    // ================= COUPON =================

    const [couponCode, setCouponCode] =
        useState("");

    const [couponApplied, setCouponApplied] =
        useState(false);

    const [discountPercent, setDiscountPercent] =
        useState(0);


    // ================= FORM CHANGE =================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    };


    // ================= PRICE CALCULATION =================

    const subtotal = cart.reduce(

        (total, item) =>

            total +
            Number(item.price) *
            Number(item.quantity || 1),

        0

    );


    const deliveryFee =
        subtotal > 0 ? 60 : 0;


    const discount = couponApplied

        ? (subtotal * discountPercent) / 100

        : 0;


    const total =
        subtotal +
        deliveryFee -
        discount;


    // ================= APPLY COUPON =================

    const handleApplyCoupon = () => {

        const code =
            couponCode.trim().toUpperCase();


        if (code === "DENTAL10") {

            setCouponApplied(true);

            setDiscountPercent(10);


            Swal.fire({

                toast: true,

                position: "top-end",

                icon: "success",

                title: "10% coupon applied!",

                showConfirmButton: false,

                timer: 2000,

            });

        }

        else {

            setCouponApplied(false);

            setDiscountPercent(0);


            Swal.fire({

                toast: true,

                position: "top-end",

                icon: "error",

                title: "Invalid coupon code!",

                showConfirmButton: false,

                timer: 2000,

            });

        }

    };


    // ==================================================
    // PLACE ORDER
    // ==================================================

    const handlePlaceOrder = (e) => {

        e.preventDefault();


        // ================= CART CHECK =================

        if (cart.length === 0) {

            alert("Your cart is empty.");

            navigate("/shop");

            return;

        }


        // ================= CREATE ORDER =================

        const orderData = {

            // Unique order ID
            _id: `order-${Date.now()}`,

            // Customer friendly order ID
            orderId: `DC-${Date.now()}`,

            // Logged-in user's email
            userEmail:
                user?.email ||
                formData.email,

            // Customer information
            customer: {

                ...formData,

                email:
                    user?.email ||
                    formData.email,

            },

            // Products from Cart
            products: cart.map((item) => ({

                ...item,

                quantity:
                    Number(item.quantity) || 1,

            })),

            // Payment
            paymentMethod,

            // Coupon
            couponCode:
                couponApplied
                    ? couponCode.trim().toUpperCase()
                    : "",

            discountPercent:
                couponApplied
                    ? discountPercent
                    : 0,

            // Price information
            subtotal,

            deliveryFee,

            // MyOrder.jsx can use this
            shipping: deliveryFee,

            discount,

            total,

            // Order status
            status: "Processing",

            // Order date
            orderDate:
                new Date().toLocaleString(),

        };


        // ==================================================
        // GET EXISTING ORDERS
        // ==================================================

        const existingOrders =

            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        // ==================================================
        // ADD NEW ORDER
        // ==================================================

        const updatedOrders = [

            ...existingOrders,

            orderData,

        ];


        // ==================================================
        // SAVE ORDER TO LOCAL STORAGE
        // ==================================================

        localStorage.setItem(

            "orders",

            JSON.stringify(updatedOrders)

        );


        // Debug
        console.log(
            "Order Saved Successfully:",
            orderData
        );

        console.log(
            "All Orders:",
            updatedOrders
        );


        // ==================================================
        // CLEAR CART
        // ==================================================

        localStorage.removeItem("cart");


        // Clear coupon data if exists
        localStorage.removeItem("couponCode");

        localStorage.removeItem("discountPercent");

        localStorage.removeItem("couponApplied");


        // ==================================================
        // SUCCESS MESSAGE
        // ==================================================

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


    // ==================================================
    // JSX
    // ==================================================

    return (

        <div className="bg-gray-50 min-h-screen py-10">
            <Helmet>
                <title>DentCare | Checkout</title>
            </Helmet>

            <div className="max-w-7xl mx-auto px-4">


                {/* ================= TITLE ================= */}

                <div className="mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">

                        Checkout

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Complete your order details

                    </p>

                </div>



                <form
                    onSubmit={handlePlaceOrder}
                    className="grid lg:grid-cols-3 gap-8"
                >


                    {/* ==================================================
                        LEFT SIDE
                    ================================================== */}

                    <div className="lg:col-span-2 space-y-6">


                        {/* ================= CUSTOMER INFORMATION ================= */}

                        <div className="bg-white rounded-xl shadow-sm p-6">

                            <h2 className="text-xl font-bold mb-5">

                                Customer Information

                            </h2>


                            <div className="grid md:grid-cols-2 gap-4">


                                {/* Name */}

                                <div>

                                    <label className="block text-sm font-medium mb-2">

                                        Full Name

                                    </label>

                                    <input

                                        type="text"

                                        name="name"

                                        value={formData.name}

                                        onChange={handleChange}

                                        required

                                        className="input input-bordered w-full"

                                        placeholder="Enter your name"

                                    />

                                </div>


                                {/* Email */}

                                <div>

                                    <label className="block text-sm font-medium mb-2">

                                        Email

                                    </label>

                                    <input

                                        type="email"

                                        name="email"

                                        value={
                                            formData.email
                                        }

                                        onChange={handleChange}

                                        required

                                        className="input input-bordered w-full"

                                        placeholder="Enter your email"

                                    />

                                </div>

                                {/* City */}

                                <div>

                                    <label className="block text-sm font-medium mb-2">

                                        City

                                    </label>

                                    <input

                                        type="text"

                                        name="city"

                                        value={formData.city}

                                        onChange={handleChange}

                                        required

                                        className="input input-bordered w-full"

                                        placeholder="Enter city"

                                    />

                                </div>

                                {/* Phone */}

                                <div>

                                    <label className="block text-sm font-medium mb-2">

                                        Phone

                                    </label>

                                    <input

                                        type="tel"

                                        name="phone"

                                        value={formData.phone}

                                        onChange={handleChange}

                                        required

                                        className="input input-bordered w-full"

                                        placeholder="01XXXXXXXXX"

                                    />

                                </div>


                                {/* Address */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-medium mb-2">

                                        Delivery Address

                                    </label>

                                    <textarea

                                        name="address"

                                        value={formData.address}

                                        onChange={handleChange}

                                        required

                                        className="textarea textarea-bordered w-full"

                                        placeholder="Enter your full address"

                                        rows="3"

                                    />

                                </div>


                                {/* Postal Code */}

                                <div>

                                    <label className="block text-sm font-medium mb-2">

                                        Postal Code

                                    </label>

                                    <input

                                        type="text"

                                        name="postalCode"

                                        value={formData.postalCode}

                                        onChange={handleChange}

                                        className="input input-bordered w-full"

                                        placeholder="Postal code"

                                    />

                                </div>

                            </div>

                        </div>



                        {/* ================= PAYMENT METHOD ================= */}

                        <div className="bg-white rounded-xl shadow-sm p-6">

                            <h2 className="text-xl font-bold mb-5">

                                Payment Method

                            </h2>


                            <div className="space-y-3">


                                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

                                    <input

                                        type="radio"

                                        name="payment"

                                        value="Cash on Delivery"

                                        checked={
                                            paymentMethod ===
                                            "Cash on Delivery"
                                        }

                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }

                                        className="radio"

                                    />

                                    <div>

                                        <p className="font-semibold">

                                            Cash on Delivery

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            Pay when your order arrives

                                        </p>

                                    </div>

                                </label>


                                <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

                                    <input

                                        type="radio"

                                        name="payment"

                                        value="Online Payment"

                                        checked={
                                            paymentMethod ===
                                            "Online Payment"
                                        }

                                        onChange={(e) =>
                                            setPaymentMethod(
                                                e.target.value
                                            )
                                        }

                                        className="radio"

                                    />

                                    <div>

                                        <p className="font-semibold">

                                            Online Payment

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            Pay securely online

                                        </p>

                                    </div>

                                </label>


                            </div>

                        </div>


                    </div>



                    {/* ==================================================
                        RIGHT SIDE - ORDER SUMMARY
                    ================================================== */}

                    <div>

                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-5">


                            <h2 className="text-xl font-bold mb-5">

                                Order Summary

                            </h2>


                            {/* ================= PRODUCTS ================= */}

                            <div className="space-y-4 mb-5">


                                {cart.map((item) => (

                                    <div

                                        key={item._id}

                                        className="flex items-center gap-3"

                                    >

                                        <img

                                            src={item.image}

                                            alt={item.name}

                                            className="w-16 h-16 object-cover rounded-lg"

                                        />


                                        <div className="flex-1">

                                            <h3 className="font-medium">

                                                {item.name}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                Qty:{" "}

                                                {item.quantity || 1}

                                            </p>

                                        </div>


                                        <p className="font-semibold">

                                            ৳
                                            {Number(item.price) *
                                                Number(
                                                    item.quantity || 1
                                                )}

                                        </p>

                                    </div>

                                ))}


                            </div>


                            <div className="border-t pt-4 space-y-3">


                                {/* Subtotal */}

                                <div className="flex justify-between">

                                    <span className="text-gray-600">

                                        Subtotal

                                    </span>

                                    <span className="font-medium">

                                        ৳{subtotal}

                                    </span>

                                </div>


                                {/* Shipping */}

                                <div className="flex justify-between">

                                    <span className="text-gray-600">

                                        Delivery Fee

                                    </span>

                                    <span className="font-medium">

                                        ৳{deliveryFee}

                                    </span>

                                </div>


                                {/* Discount */}

                                {couponApplied && (

                                    <div className="flex justify-between text-green-600">

                                        <span>

                                            Discount ({discountPercent}%)

                                        </span>

                                        <span>

                                            -৳{discount}

                                        </span>

                                    </div>

                                )}


                                {/* Total */}

                                <div className="border-t pt-4 flex justify-between text-lg font-bold">

                                    <span>

                                        Total

                                    </span>

                                    <span className="text-primary">

                                        ৳{total}

                                    </span>

                                </div>


                            </div>



                            {/* ================= COUPON ================= */}

                            <div className="mt-6">

                                <label className="block text-sm font-medium mb-2">

                                    Coupon Code

                                </label>


                                <div className="flex gap-2">

                                    <input

                                        type="text"

                                        value={couponCode}

                                        onChange={(e) =>
                                            setCouponCode(
                                                e.target.value
                                            )
                                        }

                                        className="input input-bordered flex-1"

                                        placeholder="Enter coupon"

                                    />

                                    <button

                                        type="button"

                                        onClick={handleApplyCoupon}

                                        className="btn btn-outline"

                                    >

                                        Apply

                                    </button>

                                </div>


                                <p className="text-xs text-gray-500 mt-2">

                                    Try: DENTAL10

                                </p>

                            </div>



                            {/* ================= PLACE ORDER ================= */}

                            <button

                                type="submit"

                                className="btn btn-primary w-full mt-6 text-white"

                            >

                                Place Order

                            </button>


                        </div>

                    </div>


                </form>

            </div>

        </div>

    );

};


export default Checkout;