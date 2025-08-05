import { RequestHandler } from "express";
import { RegisterRequest, LoginRequest, AuthResponse, User } from "@shared/api";

// In-memory user storage (in production, use a real database)
const users: User[] = [];
let userIdCounter = 1;

// Simple token generation (in production, use JWT)
const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};

// Simple password hashing (in production, use bcrypt)
const hashPassword = (password: string): string => {
  return `hashed_${password}`;
};

export const register: RequestHandler = (req, res) => {
  try {
    const { name, email, phone, address, password }: RegisterRequest = req.body;

    // Validate required fields
    if (!name || !email || !phone || !address || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "User with this email already exists" 
      });
    }

    // Create new user
    const newUser: User = {
      id: userIdCounter.toString(),
      name,
      email,
      phone,
      address,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    userIdCounter++;

    // Generate token
    const token = generateToken(newUser.id);

    const response: AuthResponse = {
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        createdAt: newUser.createdAt
      }
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const login: RequestHandler = (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password" 
      });
    }

    // In production, verify hashed password
    // For demo purposes, accept any password for existing users
    
    // Generate token
    const token = generateToken(user.id);

    const response: AuthResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt
      }
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

// Middleware to verify token (for protected routes)
export const verifyToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Access token required" 
    });
  }

  // In production, verify JWT token
  // For demo purposes, just check if token exists and extract user ID
  const userId = token.split('_')[1];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: "Invalid token" 
    });
  }

  // Add user to request object
  (req as any).user = user;
  next();
};
