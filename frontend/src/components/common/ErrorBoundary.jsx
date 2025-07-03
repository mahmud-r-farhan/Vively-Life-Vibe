import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    toast.error('An unexpected error occurred. Please try again.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </motion.div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;