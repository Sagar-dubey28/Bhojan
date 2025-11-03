import { useCart } from "../../Context/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import api from "../../config/api";
import { useState } from "react";
import toast from "react-hot-toast";

const AddToCartPage = () => {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 20,
      opacity: 0
    }
  };

  const verifyPayment = async (response) => {
    try {
      // response should include items, address, amount and optionally userEmail
      const payload = {
        ...response,
        items: cartItems,
        address: checkoutAddress,
        amount: totalPrice + 40,
        userEmail: JSON.parse(sessionStorage.getItem("BhojanUser"))?.email
      };

      const { data } = await api.post("/payment/paymentverification", payload);
      if (data.success) {
        // clear cart in memory and in per-user storage (CartProvider persists empty cart)
        clearCart();
        toast.success("Payment successful — your order is placed");
        // redirect to success page
        window.location.href = `/paymentsuccess?reference=${response.razorpay_payment_id}`;
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Payment verification failed");
    }
  };

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [checkoutAddress, setCheckoutAddress] = useState({
    name: "",
    phone: "",
    line1: "",
    city: "",
    pincode: ""
  });

  const checkoutHandler = async () => {
    try {
      const { data: { key } } = await api.get("/payment/getkey");
      
      if (!checkoutAddress.line1 || !checkoutAddress.city || !checkoutAddress.pincode || !checkoutAddress.phone) {
        toast.error("Please fill in the delivery address before proceeding.");
        setShowAddressForm(true);
        return;
      }

      const { data: { order, meta } } = await api.post("/payment/checkout", {
        amount: totalPrice + 40,
        items: cartItems,
        address: checkoutAddress
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Bhojan",
        description: "Food Order Payment",
        order_id: order.id,
        handler: function (response) {
          verifyPayment(response);
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
          contact: "9999999999"
        },
        notes: {
          address: `${checkoutAddress.line1}, ${checkoutAddress.city} - ${checkoutAddress.pincode}`
        },
        theme: {
          color: "#570DF8" // primary color
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
      >
        <ShoppingBag className="w-20 h-20 text-base-300 mb-4" />
        <h2 className="text-3xl font-bold text-base-content/80">Your Cart is Empty</h2>
        <p className="text-base-content/60 mt-2">Add some delicious items to get started!</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-6"
          onClick={() => window.history.back()}
        >
          Browse Restaurants
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Address form modal/inline */}
      {showAddressForm && (
        <div className="card bg-base-100 shadow-lg p-4 sm:p-6 mb-6 w-full">
          <h3 className="text-lg font-bold mb-4">Delivery Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input aria-label="Full name" className="input input-bordered w-full" placeholder="Full name" value={checkoutAddress.name} onChange={(e)=>setCheckoutAddress({...checkoutAddress,name:e.target.value})} />
            <input aria-label="Phone" className="input input-bordered w-full" placeholder="Phone" value={checkoutAddress.phone} onChange={(e)=>setCheckoutAddress({...checkoutAddress,phone:e.target.value})} />
            <input aria-label="Address line" className="input input-bordered md:col-span-2 w-full" placeholder="Address line" value={checkoutAddress.line1} onChange={(e)=>setCheckoutAddress({...checkoutAddress,line1:e.target.value})} />
            <input aria-label="City" className="input input-bordered w-full" placeholder="City" value={checkoutAddress.city} onChange={(e)=>setCheckoutAddress({...checkoutAddress,city:e.target.value})} />
            <input aria-label="Pincode" className="input input-bordered w-full" placeholder="Pincode" value={checkoutAddress.pincode} onChange={(e)=>setCheckoutAddress({...checkoutAddress,pincode:e.target.value})} />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button className="btn btn-primary w-full sm:w-auto" onClick={()=>{ setShowAddressForm(false); toast.success('Address saved'); }}>Save Address</button>
            <button className="btn btn-ghost w-full sm:w-auto" onClick={()=>setShowAddressForm(false)}>Close</button>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-base-content">Your Cart</h1>
        <button
          onClick={clearCart}
          className="btn btn-ghost btn-sm gap-2 text-error"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              exit="exit"
              layout
              className="card card-side bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <figure className="w-32 h-32">
                <img 
                  src={item.dishImage.imageLink} 
                  alt={item.name} 
                  className="w-full h-full object-cover" 
                />
              </figure>
              <div className="card-body p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-base-content/70">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn btn-ghost btn-sm btn-square text-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="join">
                    <button 
                      className="btn btn-sm join-item"
                      onClick={() => decrementQuantity(item._id)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="btn btn-sm join-item pointer-events-none">
                      {item.quantity}
                    </span>
                    <button 
                      className="btn btn-sm join-item"
                      onClick={() => incrementQuantity(item._id)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-base-content/70">
                    Subtotal: <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card bg-base-100 shadow-lg mt-8 p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Subtotal:</span>
          <span className="text-lg">₹{totalPrice}</span>
        </div>
        <div className="flex justify-between items-center mb-4 text-base-content/70">
          <span>Delivery Fee:</span>
          <span>₹40</span>
        </div>
        <div className="divider my-2"></div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-xl font-bold">₹{totalPrice + 40}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn btn-primary btn-block"
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AddToCartPage;
