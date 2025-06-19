import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our products, orders, and services.
          </p>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit/debit cards, UPI, net banking, and cash on delivery for select locations.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">How do I track my order?</h3>
            <p className="text-gray-600">Once your order is shipped, you will receive an email and SMS with tracking details. You can also track your order on our <a href="/shipping" className="text-blue-600 underline">Shipping & Delivery</a> page.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Can I return or exchange a product?</h3>
            <p className="text-gray-600">Yes, we offer a 7-day return/exchange policy for most products. Please refer to our Returns & Refunds policy for details.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Do you offer installation services?</h3>
            <p className="text-gray-600">Basic assembly is included for eligible items. For complex furniture, professional installation is available at an additional cost.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">How do I contact customer support?</h3>
            <p className="text-gray-600">You can reach us at <a href="mailto:furniture.enquiry@kalikafurniture.com" className="text-blue-600 underline">furniture.enquiry@kalikafurniture.com</a> or call +91 9890602225 (Mon-Sat, 9:30 AM - 9:00 PM).</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Where are your stores located?</h3>
            <p className="text-gray-600">Visit our <a href="/stores" className="text-blue-600 underline">Store Locator</a> for details.</p>
          </Card>
        </div>
      </div>
    </div>
  );
} 