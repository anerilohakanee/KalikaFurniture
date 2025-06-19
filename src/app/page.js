import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <Image
          src="https://i.pinimg.com/736x/98/ea/77/98ea7719af91228400c18357c344d081.jpg"
          alt="Kalika Furniture"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Space with <span className="text-yellow-400">Premium</span> Furniture
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Discover India's favorite furniture brand with 50+ stores and 3,000+ distributors nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/products"
                className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link 
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of furniture categories designed to enhance your living spaces
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-yellow-500 transition duration-300">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                  <Link 
                    href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                    className="inline-block mt-4 text-yellow-500 font-semibold hover:text-yellow-600 transition duration-300"
                  >
                    Explore Collection →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the best in furniture shopping with our premium services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 text-4xl bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest products, exclusive offers, and interior design tips.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

const categories = [
  {
    name: 'Living Room',
    description: 'Sofas, Recliners, and Entertainment Units',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
  },
  {
    name: 'Bedroom',
    description: 'Beds, Wardrobes, and Dressing Tables',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
  },
  {
    name: 'Dining Room',
    description: 'Dining Sets, Tables, and Chairs',
    image: 'https://i.pinimg.com/736x/20/cf/38/20cf38ec1e559360d645ac93d2e17ed9.jpg',
  },
  {
    name: 'Office',
    description: 'Office Chairs, Tables, and Storage',
    image: 'https://i.pinimg.com/736x/d6/7c/be/d67cbea3711a42d7efc9cb5c234f8dce.jpg',
  },
];

const features = [
  {
    title: 'Easy EMI',
    description: 'Flexible payment options with zero interest on select items',
    icon: '💰',
  },
  {
    title: 'Free Delivery',
    description: 'Free home delivery across India with professional installation',
    icon: '🚚',
  },
  {
    title: 'Quality Assurance',
    description: 'Premium quality furniture with 5-year warranty',
    icon: '✨',
  },
  {
    title: 'Free Assembly',
    description: 'Professional assembly service included with every purchase',
    icon: '🔧',
  },
];
