'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from 'next/image';
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCreditCard, 
  FiTruck, 
  FiCheck,
  FiLock,
  FiShield
} from 'react-icons/fi';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, itemCount, clearCart, isLoading } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    deliveryInstructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'cod', // cod, card, upi
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      price: 199,
      duration: '5-7 business days',
      icon: FiTruck
    },
    {
      id: 'express',
      name: 'Express Delivery',
      price: 299,
      duration: '2-3 business days',
      icon: FiTruck
    },
    {
      id: 'free',
      name: 'Free Delivery',
      price: 0,
      duration: '7-10 business days',
      icon: FiTruck
    }
  ];

  const selectedDelivery = deliveryOptions.find(option => option.id === deliveryOption);
  const finalTotal = total + selectedDelivery.price;

  useEffect(() => {
    if (cart.length === 0 && !isLoading) {
      router.push('/products');
    }
  }, [cart, router, isLoading]);

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const validatePaymentInfo = () => {
    if (paymentInfo.paymentMethod === 'cod') return true;
    if (paymentInfo.paymentMethod === 'card') {
      return paymentInfo.cardNumber && paymentInfo.cardName && paymentInfo.cardExpiry && paymentInfo.cardCvv;
    }
    if (paymentInfo.paymentMethod === 'upi') {
      return paymentInfo.upiId;
    }
    return false;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateShippingInfo()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePaymentInfo()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate order number
      const newOrderNumber = `KF${Date.now()}`;
      setOrderNumber(newOrderNumber);
      
      // Clear cart
      clearCart();
      
      // Show success
      setOrderPlaced(true);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (orderPlaced) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-green-50 border border-green-200 rounded-xl p-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order. We'll send you updates on your delivery.
            </p>
            <div className="bg-white rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
              <p className="text-gray-600">Order Number: <span className="font-mono font-semibold">{orderNumber}</span></p>
              <p className="text-gray-600">Total Amount: <span className="font-semibold">₹{finalTotal.toLocaleString()}</span></p>
            </div>
            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => router.push('/products')}
                className="w-full"
              >
                Continue Shopping
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push('/')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto py-8 px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              icon={<FiArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
          </div>
          <Button
            variant="secondary"
            onClick={() => router.push('/products')}
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold">
                      1
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold">Shipping Information</h2>
                  </div>

                  <Card className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange('firstName', e.target.value)}
                          placeholder="Enter first name"
                          icon={<FiUser className="w-4 h-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange('lastName', e.target.value)}
                          placeholder="Enter last name"
                          icon={<FiUser className="w-4 h-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleShippingChange('email', e.target.value)}
                          placeholder="Enter email address"
                          icon={<FiMail className="w-4 h-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => handleShippingChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          icon={<FiPhone className="w-4 h-4" />}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <Input
                          value={shippingInfo.address}
                          onChange={(e) => handleShippingChange('address', e.target.value)}
                          placeholder="Enter full address"
                          icon={<FiMapPin className="w-4 h-4" />}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <Input
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange('city', e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <Input
                          value={shippingInfo.state}
                          onChange={(e) => handleShippingChange('state', e.target.value)}
                          placeholder="Enter state"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pincode *
                        </label>
                        <Input
                          value={shippingInfo.pincode}
                          onChange={(e) => handleShippingChange('pincode', e.target.value)}
                          placeholder="Enter pincode"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          value={shippingInfo.deliveryInstructions}
                          onChange={(e) => handleShippingChange('deliveryInstructions', e.target.value)}
                          placeholder="Any special delivery instructions..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold">
                      2
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold">Payment Information</h2>
                  </div>

                  <Card className="p-4 sm:p-6">
                    <div className="space-y-6">
                      {/* Payment Method Selection */}
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-4">Select Payment Method</h3>
                        <div className="space-y-3">
                          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cod"
                              checked={paymentInfo.paymentMethod === 'cod'}
                              onChange={(e) => handlePaymentChange('paymentMethod', e.target.value)}
                              className="mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <FiShield className="w-5 h-5 text-green-600" />
                              <div>
                                <div className="font-medium">Cash on Delivery</div>
                                <div className="text-sm text-gray-600">Pay when you receive your order</div>
                              </div>
                            </div>
                          </label>

                          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="card"
                              checked={paymentInfo.paymentMethod === 'card'}
                              onChange={(e) => handlePaymentChange('paymentMethod', e.target.value)}
                              className="mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <FiCreditCard className="w-5 h-5 text-blue-600" />
                              <div>
                                <div className="font-medium">Credit/Debit Card</div>
                                <div className="text-sm text-gray-600">Secure payment with card</div>
                              </div>
                            </div>
                          </label>

                          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="upi"
                              checked={paymentInfo.paymentMethod === 'upi'}
                              onChange={(e) => handlePaymentChange('paymentMethod', e.target.value)}
                              className="mr-3"
                            />
                            <div className="flex items-center gap-3">
                              <FiLock className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className="font-medium">UPI Payment</div>
                                <div className="text-sm text-gray-600">Pay using UPI ID</div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Card Details */}
                      {paymentInfo.paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Card Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                              </label>
                              <Input
                                value={paymentInfo.cardNumber}
                                onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                icon={<FiCreditCard className="w-4 h-4" />}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cardholder Name
                              </label>
                              <Input
                                value={paymentInfo.cardName}
                                onChange={(e) => handlePaymentChange('cardName', e.target.value)}
                                placeholder="Enter cardholder name"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date
                              </label>
                              <Input
                                value={paymentInfo.cardExpiry}
                                onChange={(e) => handlePaymentChange('cardExpiry', e.target.value)}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV
                              </label>
                              <Input
                                value={paymentInfo.cardCvv}
                                onChange={(e) => handlePaymentChange('cardCvv', e.target.value)}
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* UPI Details */}
                      {paymentInfo.paymentMethod === 'upi' && (
                        <div className="space-y-4">
                          <h4 className="font-medium">UPI Details</h4>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              UPI ID
                            </label>
                            <Input
                              value={paymentInfo.upiId}
                              onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                              placeholder="example@upi"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold">
                      3
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold">Order Review</h2>
                  </div>

                  <Card className="p-4 sm:p-6">
                    <div className="space-y-6">
                      {/* Shipping Information Review */}
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-4">Shipping Information</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                          <p className="text-gray-600">{shippingInfo.email}</p>
                          <p className="text-gray-600">{shippingInfo.phone}</p>
                          <p className="text-gray-600">{shippingInfo.address}</p>
                          <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                        </div>
                      </div>

                      {/* Payment Method Review */}
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-4">Payment Method</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium">
                            {paymentInfo.paymentMethod === 'cod' && 'Cash on Delivery'}
                            {paymentInfo.paymentMethod === 'card' && 'Credit/Debit Card'}
                            {paymentInfo.paymentMethod === 'upi' && 'UPI Payment'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              {currentStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={handlePreviousStep}
                  className="w-full sm:w-auto"
                >
                  Previous
                </Button>
              )}
              <div className="ml-auto w-full sm:w-auto">
                {currentStep < 3 ? (
                  <Button
                    variant="primary"
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 1 && !validateShippingInfo()) ||
                      (currentStep === 2 && !validatePaymentInfo())
                    }
                    className="w-full sm:w-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                    className="w-full sm:w-32"
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8">
              <Card className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Order Summary</h3>
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm truncate">{item.name}</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">Qty: {item.quantity}</p>
                        <p className="font-semibold text-xs sm:text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="border-t pt-4 mb-4">
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Delivery Option</h4>
                  <div className="space-y-2">
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm">
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={deliveryOption === option.id}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="text-yellow-600"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{option.name}</span>
                            <span className="font-semibold">
                              {option.price === 0 ? 'Free' : `₹${option.price}`}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">{option.duration}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-xs sm:text-base">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-base">
                    <span>Delivery</span>
                    <span>{selectedDelivery.price === 0 ? 'Free' : `₹${selectedDelivery.price}`}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <FiLock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 