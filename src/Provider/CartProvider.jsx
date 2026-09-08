import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    // Load cart from localStorage
    const [cart, setCart] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });


    // Save cart to localStorage
    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);


    // ================= ADD TO CART =================

    const addToCart = (product) => {

        setCart((prevCart) => {

            const existingProduct = prevCart.find(
                (item) => item._id === product._id
            );


            // Product already exists
            if (existingProduct) {

                return prevCart.map((item) =>
                    item._id === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }


            // New product
            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };


    // ================= INCREASE =================

    const increaseQuantity = (id) => {

        setCart((prevCart) => {

            return prevCart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

        });
    };


    // ================= DECREASE =================

    const decreaseQuantity = (id) => {

        setCart((prevCart) => {

            return prevCart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity > 1
                                ? item.quantity - 1
                                : 1
                    }
                    : item
            );

        });
    };


    // ================= REMOVE =================

    const removeFromCart = (id) => {

        setCart((prevCart) => {

            return prevCart.filter(
                (item) => item._id !== id
            );

        });
    };


    // ================= CART COUNT =================

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    return (

        <CartContext.Provider
            value={{
                cart,
                cartCount,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart
            }}
        >

            {children}

        </CartContext.Provider>
    );
};


export default CartProvider;


export const useCart = () =>
    useContext(CartContext);