'use client';

import Image from 'next/image';

const store = {
  id: 1,
  name: 'Kalika Steel And Furniture',
  address: 'Ranjangaon Road, Walunj, Pandharpur, Chatrapati Sambhajinagar Maharashtra - 431136',
  phone: '+918668232452',
  email: 'kalika@furniture.com',
  hours: '9:30 AM - 9:00 PM',
  image: 'https://i.pinimg.com/736x/56/f6/bf/56f6bfb93086524f9cf4bd031e492237.jpg', // Replace with actual image if available
  coordinates: { lat: 17.6792, lng: 75.3309 }, // Pandharpur coordinates
  features: ['Parking', 'Wheelchair Access', 'Home Delivery', 'Assembly Service', 'Steel Furniture', 'Custom Orders'],
};

export default function StorePage() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Store</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our Chatrapati Sambhajinagar store to experience our premium furniture collection in person
          </p>
        </div>

        {/* Store Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          <div className="relative w-full h-80 md:h-[32rem]">
            <Image
              src={store.image}
              alt={store.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">{store.name}</h3>
            <div className="space-y-2 text-gray-600 mb-4">
              <p>{store.address}</p>
              <p>Phone: {store.phone}</p>
              <p>Email: {store.email}</p>
              <p>Hours: {store.hours}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 mb-6">
              {store.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={`tel:${store.phone}`}
                className="flex-1 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 text-center"
              >
                Call Store
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300 text-center"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Store Map */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Store Location</h2>
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-semibold mb-2">Visit Our Store</h3>
              <p className="text-gray-600 mb-4">{store.address}</p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 