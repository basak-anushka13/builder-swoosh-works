import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, User, ShoppingBag, Package, Edit, LogOut, Menu, X } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      items: ["Organic Rice (2kg)", "Fresh Milk (1L)", "Vegetables"],
      total: "₹125",
      status: "Delivered",
      date: "2024-12-10"
    },
    {
      id: 2,
      items: ["Medicine Kit", "Bread"],
      total: "₹175",
      status: "In Transit",
      date: "2024-12-12"
    }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    address: "Village ABC, District XYZ, State 123456"
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    
    // Set user data (in real app, fetch from API)
    setUser({
      name: "John Doe",
      email: "john@example.com"
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, send to API
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-emerald-100 mr-2" />
              <span className="text-xl font-bold text-white">RuralConnect</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-emerald-100">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-emerald-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
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
              <span className="text-emerald-100 block px-3 py-2">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-emerald-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-full mr-4">
              <User className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Manage your orders and update your profile</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bookings Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <ShoppingBag className="h-6 w-6 text-emerald-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
            </div>
            
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">Order #{booking.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <p>Items: {booking.items.join(", ")}</p>
                      <p>Date: {booking.date}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-emerald-600">{booking.total}</span>
                      <button className="text-emerald-600 text-sm hover:text-emerald-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No bookings yet</p>
                <Link to="/" className="text-emerald-600 hover:text-emerald-700 text-sm">
                  Browse products →
                </Link>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <User className="h-6 w-6 text-emerald-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-emerald-600 hover:text-emerald-700 text-sm"
              >
                <Edit className="h-4 w-4 mr-1" />
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows={3}
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Update Profile
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{profileData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-900">{profileData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-gray-900">{profileData.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="text-gray-900">{profileData.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/#products"
              className="flex items-center justify-center bg-emerald-50 hover:bg-emerald-100 p-4 rounded-lg transition-colors"
            >
              <ShoppingBag className="h-6 w-6 text-emerald-600 mr-2" />
              <span className="text-emerald-700 font-medium">Browse Products</span>
            </Link>
            <Link
              to="/#contact"
              className="flex items-center justify-center bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors"
            >
              <Package className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Contact Support</span>
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors"
            >
              <Leaf className="h-6 w-6 text-gray-600 mr-2" />
              <span className="text-gray-700 font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
