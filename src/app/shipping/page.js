import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
          <p className="text-lg text-gray-600">
            Fast, reliable delivery to your doorstep across India
          </p>
        </div>

        {/* Delivery Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Express Delivery</h3>
                <p className="text-gray-600 mb-3">2-3 business days</p>
                <Badge variant="blue">₹299</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Standard Delivery</h3>
                <p className="text-gray-600 mb-3">5-7 business days</p>
                <Badge variant="green">₹199</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Free Delivery</h3>
                <p className="text-gray-600 mb-3">7-10 business days</p>
                <Badge variant="purple">Free</Badge>
              </div>
            </Card>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Areas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• All major cities across India</li>
                <li>• Tier 1 & Tier 2 cities</li>
                <li>• Most Tier 3 cities</li>
                <li>• Remote areas may have additional charges</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Process</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Order confirmation within 24 hours</li>
                <li>• Dispatch notification with tracking details</li>
                <li>• Delivery team will contact you before arrival</li>
                {/* <li>• Installation available for select items</li> */}
              </ul>
            </Card>
          </div>
        </div>

        {/* Tracking & Support */}
        {/* <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Track Your Order</h2>
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>
                <p className="text-gray-600 mb-4">
                  Track your order status and get real-time updates on delivery progress.
                </p>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Track
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Our customer support team is here to help with any delivery questions.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> +918668232452
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> furniture.enquiry@kalikafurniture.com
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Hours:</strong> Mon-Sat 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div> */}

        {/* Important Notes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Delivery Restrictions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Large furniture items require ground floor delivery</li>
                <li>• Elevator access required for high-rise buildings</li>
                <li>• Assembly service available for select items</li>
                <li>• Delivery not available on Sundays and holidays</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-600">What's Included</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Professional packaging and handling</li>
                <li>• Delivery to your doorstep</li>
                <li>• Basic assembly for eligible items</li>
                <li>• Delivery confirmation and receipt</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">How long does delivery take?</h3>
              <p className="text-gray-600">
                Delivery times vary by location and service type. Express delivery takes 2-3 business days, 
                standard delivery takes 5-7 business days, and free delivery takes 7-10 business days.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Do you deliver to my area?</h3>
              <p className="text-gray-600">
                We deliver to most cities and towns across India. Enter your pincode during checkout 
                to check delivery availability and costs for your area.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">What if I'm not home during delivery?</h3>
              <p className="text-gray-600">
                Our delivery team will contact you before arrival. If you're not available, 
                we can reschedule the delivery for a convenient time.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Is assembly included?</h3>
              <p className="text-gray-600">
                Basic assembly is included for eligible items. For complex furniture, 
                professional assembly service is available at an additional cost.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 