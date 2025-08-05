import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Truck, Phone, MapPin, Clock, Users, Leaf, Package, ShoppingBag, Pill, Apple, Wheat, Milk, Bread, Car, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Cart } from "../components/Cart";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", message: "" });
  const { addItem, openCart, getTotalItems } = useCart();

  const services = [
    {
      name: "Grocery Delivery",
      icon: <ShoppingBag className="h-8 w-8" />,
      description: "Fresh groceries delivered to your doorstep"
    },
    {
      name: "Medicine Supply",
      icon: <Pill className="h-8 w-8" />,
      description: "Essential medicines and healthcare products"
    },
    {
      name: "Fresh Produce",
      icon: <Apple className="h-8 w-8" />,
      description: "Farm-fresh fruits and vegetables"
    },
    {
      name: "Agricultural Supplies",
      icon: <Wheat className="h-8 w-8" />,
      description: "Seeds, fertilizers, and farming equipment"
    },
    {
      name: "Transportation",
      icon: <Car className="h-8 w-8" />,
      description: "Reliable transport services for rural areas"
    },
    {
      name: "Community Support",
      icon: <Users className="h-8 w-8" />,
      description: "Local community assistance and guidance"
    }
  ];

  const products = [
    {
      id: "1",
      name: "Organic Rice",
      price: "₹45/kg",
      icon: <Wheat className="h-6 w-6" />,
      category: "Grains"
    },
    {
      id: "2",
      name: "Fresh Milk",
      price: "₹35/liter",
      icon: <Milk className="h-6 w-6" />,
      category: "Dairy"
    },
    {
      id: "3",
      name: "Whole Wheat Bread",
      price: "₹25/loaf",
      icon: <Bread className="h-6 w-6" />,
      category: "Bakery"
    },
    {
      id: "4",
      name: "Seasonal Vegetables",
      price: "₹20/kg",
      icon: <Apple className="h-6 w-6" />,
      category: "Produce"
    },
    {
      id: "5",
      name: "Basic Medicine Kit",
      price: "₹150",
      icon: <Pill className="h-6 w-6" />,
      category: "Healthcare"
    },
    {
      id: "6",
      name: "Household Essentials",
      price: "₹80",
      icon: <Package className="h-6 w-6" />,
      category: "Daily Needs"
    }
  ];

  const news = [
    {
      title: "New Healthcare Initiative Launched for Rural Areas",
      date: "Dec 15, 2024",
      summary: "Government announces free medical check-ups in 50 villages"
    },
    {
      title: "Organic Farming Training Program Starts Next Month",
      date: "Dec 10, 2024",
      summary: "Join our sustainable agriculture workshop for better yields"
    },
    {
      title: "Mobile Market Service Expands to 20 New Villages",
      date: "Dec 8, 2024",
      summary: "Weekly mobile markets now serving more remote communities"
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (response.ok) {
        setContactForm({ name: "", message: "" });
        alert(data.message);
      } else {
        alert(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-emerald-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-emerald-100 mr-2" />
              <span className="text-xl font-bold text-white">RuralConnect</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#services" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
                <a href="#products" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Products</a>
                <a href="#news" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">News</a>
                <a href="#contact" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                <button
                  onClick={openCart}
                  className="relative text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
                <Link to="/login" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-500">Login</Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-emerald-100 hover:text-white p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-emerald-800">
              <a href="#home" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#services" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#products" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Products</a>
              <a href="#news" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">News</a>
              <a href="#contact" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openCart();
                }}
                className="text-emerald-100 hover:text-white flex items-center px-3 py-2 rounded-md text-base font-medium w-full"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Cart ({getTotalItems()})
              </button>
              <Link to="/login" className="bg-emerald-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-500">Login</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-emerald-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Rural Communities to
              <span className="text-emerald-600"> Essential Products</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Making it easier for rural communities to access groceries, medicines, and daily essentials through our reliable delivery platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors">
                Get Started
              </Link>
              <a href="#services" className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed specifically for rural communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-emerald-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Available Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Essential items at affordable prices, delivered right to your village
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-emerald-600 mr-3">{product.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                  <button
                    onClick={() => addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      category: product.category,
                      icon: ""
                    })}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about initiatives and programs for rural development
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-3">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.summary}</p>
                <button className="mt-4 text-emerald-600 font-medium hover:text-emerald-700">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Get in touch with our team for support and assistance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-emerald-300 mr-4" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-emerald-100">123 Rural Development Center, Village District, State - 123456</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-emerald-300 mr-4" />
                  <div>
                    <p className="font-medium">Helpline Number</p>
                    <p className="text-emerald-100">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Truck className="h-6 w-6 text-emerald-300 mr-4" />
                  <div>
                    <p className="font-medium">Emergency Delivery</p>
                    <p className="text-emerald-100">Available 24/7 for medical emergencies</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3 bg-emerald-800 border border-emerald-700 rounded-lg text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Your message or inquiry..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-500 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="h-8 w-8 text-emerald-400 mr-2" />
              <span className="text-2xl font-bold">RuralConnect</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering rural communities through accessible essential services
            </p>
            <div className="flex justify-center items-center space-x-2">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="text-gray-400">Made with love for rural communities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
