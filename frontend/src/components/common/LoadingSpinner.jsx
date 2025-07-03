import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-10"
    >
      <Loader2 className="animate-spin text-primary mb-4" size={40} />
      <p className="text-sm text-muted-foreground">Loading, please wait...</p>
    </motion.div>
  );
};

export default LoadingSpinner;