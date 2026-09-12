import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  // ================= GET ORDERS =================

  const localOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  console.log("All Local Orders:", localOrders);
  console.log("Logged In User:", user?.email);

  // ================= FILTER USER ORDERS =================

  const orders = user?.email
    ? localOrders.filter(
        (order) => order.userEmail === user.email
      )
    : [];

  console.log("My Orders:", orders);

  return (
    <div className="p-6 md:p-8">

      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          My Orders
        </h1>

        <p className="text-gray-500 mt-2">
          View and manage your DentalCare orders.
        </p>

      </div>


      {/* ================= ORDER COUNT ================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-gray-500 font-medium">
              Total Orders
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {orders.length}
            </h2>

          </div>

          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
            🛒
          </div>

        </div>

      </div>


      {/* ================= NO ORDERS ================= */}

      {orders.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-16">

          <div className="text-5xl mb-4">
            🛒
          </div>

          <h2 className="text-xl font-bold text-gray-800">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't placed any order yet.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-5 px-6 py-3 rounded-lg bg-[#5F6FFF] text-white font-semibold hover:bg-[#434fbe] transition"
          >
            Visit Shop
          </Link>

        </div>

      ) : (

        /* ================= ORDERS ================= */

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >

              {/* ================= ORDER HEADER ================= */}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="text-lg font-bold text-gray-800 mt-1">
                    #{order.orderId}
                  </h2>

                </div>


                <div>

                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-semibold text-gray-800 mt-1">
                    {order.orderDate}
                  </p>

                </div>


                {/* STATUS */}

                <div>

                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status || "Processing"}
                  </span>

                </div>

              </div>


              {/* ================= PRODUCTS ================= */}

              <div className="py-5">

                <h3 className="font-bold text-gray-800 mb-4">
                  Products
                </h3>

                <div className="space-y-3">

                  {order.products?.map((product, index) => (

                    <div
                      key={`${product._id || product.productId}-${index}`}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 rounded-xl p-4"
                    >

                      <div>

                        <h4 className="font-semibold text-gray-800">
                          {product.name}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {product.quantity}
                        </p>

                      </div>


                      <div className="font-bold text-[#5F6FFF]">
                        ৳
                        {(
                          Number(product.price) *
                          Number(product.quantity)
                        ).toFixed(0)}
                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* ================= ORDER SUMMARY ================= */}

              <div className="border-t border-gray-100 pt-5">

                <div className="flex justify-end">

                  <div className="w-full md:w-80 space-y-3">

                    {/* SUBTOTAL */}

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Subtotal
                      </span>

                      <span>
                        ৳{Number(order.subtotal).toFixed(0)}
                      </span>

                    </div>


                    {/* DISCOUNT */}

                    {Number(order.discount) > 0 && (

                      <div className="flex justify-between text-green-600">

                        <span>
                          Discount
                        </span>

                        <span>
                          -৳{Number(order.discount).toFixed(0)}
                        </span>

                      </div>

                    )}


                    {/* SHIPPING */}

                    <div className="flex justify-between text-gray-600">

                      <span>
                        Shipping
                      </span>

                      <span>
                        ৳
                        {Number(
                          order.shipping ||
                          order.deliveryFee ||
                          0
                        ).toFixed(0)}
                      </span>

                    </div>


                    {/* TOTAL */}

                    <div className="flex justify-between border-t border-gray-200 pt-3">

                      <span className="font-bold text-gray-800">
                        Total
                      </span>

                      <span className="font-bold text-lg text-[#5F6FFF]">
                        ৳{Number(order.total).toFixed(0)}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyOrders;