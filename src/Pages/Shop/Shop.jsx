import { useEffect, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import ShopCover from '../../assets/shop/shop-cover.jpg';
import Cover from "../../Shared/Cover/Cover";
import { useCart } from "../../Provider/CartProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    // Load products from JSON
    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.log(error));
    }, []);

    // Categories
    const categories = [
        "All",
        ...new Set(products.map((product) => product.category)),
    ];

    // Search + Category filter
    const filteredProducts = products.filter((product) => {
        const matchSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "All" || product.category === category;

        return matchSearch && matchCategory;
    });

    // Add to cart
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {

        addToCart(product);

        navigate("/cart");
    };
    // পরে এখানে CartContext এর addToCart() ব্যবহার করবে        

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <Helmet>
                <title>DentCare | Our Shop</title>
            </Helmet>
            {/* ================= HERO SECTION ================= */}
            <section className="bg-sky-50">
                <div>
                    <Cover img={ShopCover} title="DENTALCARE SHOP" shop="Dental Care Shop"></Cover>
                </div>
                <div className="max-w-7xl mx-auto px-5 py-16">

                    <p className="text-sky-600 font-bold uppercase tracking-wider text-sm">
                        DentalCare Shop
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
                        Care for Your Smile
                    </h1>

                    <p className="text-slate-600 max-w-xl mt-4 leading-7">
                        Discover quality dental care products for a healthier,
                        brighter and more confident smile.
                    </p>

                </div>
            </section>


            {/* ================= SHOP SECTION ================= */}
            <section className="max-w-7xl mx-auto px-5 py-12">

                {/* Search */}
                <div className="flex justify-center mb-8">

                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 w-full md:w-[450px]">

                        <Search
                            size={20}
                            className="text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full py-3 outline-none text-slate-700"
                        />

                    </div>

                </div>


                {/* Category Filter */}
                <div className="flex gap-3 overflow-x-auto pb-5">

                    {categories.map((item) => (

                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${category === item
                                ? "bg-sky-600 text-white"
                                : "bg-white border border-slate-200 text-slate-600 hover:border-sky-400"
                                }`}
                        >
                            {item}
                        </button>

                    ))}

                </div>


                {/* Products Heading */}
                <div className="flex justify-between items-center mb-6">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Dental Products
                        </h2>

                        <p className="text-slate-500 text-sm mt-1">
                            Choose the right products for your oral care
                        </p>
                    </div>

                    <p className="text-sm text-slate-500">
                        {filteredProducts.length} Products
                    </p>

                </div>


                {/* ================= PRODUCT CARDS ================= */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredProducts.map((product) => (

                        <div
                            key={product._id}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition duration-300"
                        >

                            {/* Product Image */}
                            <div className="relative h-64 bg-slate-100">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Offer */}
                                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                    {product.offer}% OFF
                                </span>

                            </div>


                            {/* Product Information */}
                            <div className="p-5">

                                {/* Category */}
                                <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                                    {product.category}
                                </p>


                                {/* Product Name */}
                                <h3 className="text-xl font-bold text-slate-900 mt-2">
                                    {product.name}
                                </h3>


                                {/* Price + Cart */}
                                <div className="flex justify-between items-center mt-5">

                                    <div>

                                        <div className="flex items-center gap-2">

                                            <span className="text-2xl font-bold text-slate-900">
                                                ৳{product.price}
                                            </span>

                                            <del className="text-sm text-slate-400">
                                                ৳{product.oldPrice}
                                            </del>

                                        </div>

                                        <p className="text-xs text-green-600 font-semibold mt-1">
                                            Save ৳{product.oldPrice - product.price}
                                        </p>

                                    </div>


                                    {/* Add To Cart */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-xl transition"
                                        title="Add to Cart"
                                    >
                                        <ShoppingCart size={20} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>


                {/* ================= NO PRODUCTS ================= */}
                {filteredProducts.length === 0 && (

                    <div className="bg-white rounded-2xl p-12 text-center mt-6">

                        <div className="text-5xl mb-4">
                            🦷
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                            No products found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Try searching for another product or category.
                        </p>

                    </div>

                )}

            </section>

        </div>
    );
};

export default Shop;