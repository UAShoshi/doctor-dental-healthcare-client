const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Order Placed Successfully! 🎉
        </h1>

        <p className="mt-3 text-gray-600">
          Thank you for your order.
        </p>

        <button
          onClick={() => window.location.href = "/shop"}
          className="mt-6 btn bg-[#5F6FFF] text-white rounded-xl hover:bg-[#434fbe]"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;