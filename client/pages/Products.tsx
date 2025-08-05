import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, Search, Filter, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Cart } from "../components/Cart";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  icon: string;
  description?: string;
  inStock: boolean;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addItem, openCart, getTotalItems } = useCart();

  const categories = ["All", "Grains", "Dairy", "Bakery", "Produce", "Healthcare", "Daily Needs", "Kitchen"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-emerald-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-emerald-100 mr-2" />
              <span className="text-xl font-bold text-white">RuralConnect</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/products" className="text-white bg-emerald-600 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
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
              <Link to="/" className="text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/products" className="text-white bg-emerald-600 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
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

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">Browse our collection of essential products for rural communities</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category === "All" ? "" : category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
              }}
              className="mt-4 text-emerald-600 hover:text-emerald-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {searchTerm && (
                  <span> for "{searchTerm}"</span>
                )}
                {selectedCategory && (
                  <span> in {selectedCategory}</span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-emerald-600 mr-3">
                      <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">📦</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                  </div>
                  
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-emerald-600">{product.price}</span>
                    <button
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        icon: product.icon
                      })}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Shopping Cart */}
      <Cart />
    </div>
  );
}
