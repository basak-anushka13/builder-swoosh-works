/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, "id">;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ServicesResponse {
  services: Service[];
}

// Product types
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  icon: string;
  description?: string;
  inStock: boolean;
}

export interface ProductsResponse {
  products: Product[];
}

// News types
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  content?: string;
}

export interface NewsResponse {
  news: NewsItem[];
}

// Contact types
export interface ContactRequest {
  name: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// Booking types
export interface BookingItem {
  productId: string;
  quantity: number;
}

export interface CreateBookingRequest {
  items: BookingItem[];
  totalAmount: string;
}

export interface Booking {
  id: string;
  userId: string;
  items: BookingItem[];
  totalAmount: string;
  status: "pending" | "confirmed" | "in_transit" | "delivered" | "cancelled";
  createdAt: string;
}

export interface BookingsResponse {
  bookings: Booking[];
}
