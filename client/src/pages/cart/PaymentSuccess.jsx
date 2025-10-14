
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const searchParams = useSearchParams()[0];
  const navigate = useNavigate();
  const reference = searchParams.get("reference");

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
        </motion.div>

        <h1 className="text-3xl font-bold text-success mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-base-content/70 mb-2">
          Thank you for your order.
        </p>
        
        <p className="text-sm text-base-content/60 mb-6">
          Payment Reference: {reference}
        </p>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary w-full"
            onClick={() => navigate('/profilePage')}
          >
            View Order Status
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline w-full"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;