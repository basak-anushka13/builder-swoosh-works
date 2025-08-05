import { RequestHandler } from "express";
import { ProductsResponse } from "@shared/api";

export const getProducts: RequestHandler = (req, res) => {
  const products = [
    {
      id: "1",
      name: "Organic Rice",
      price: "₹45/kg",
      category: "Grains",
      icon: "wheat",
      description: "Premium quality organic rice from local farms",
      inStock: true,
    },
    {
      id: "2",
      name: "Fresh Milk",
      price: "₹35/liter",
      category: "Dairy",
      icon: "milk",
      description: "Pure and fresh milk from local dairy farms",
      inStock: true,
    },
    {
      id: "3",
      name: "Whole Wheat Bread",
      price: "₹25/loaf",
      category: "Bakery",
      icon: "bread",
      description: "Freshly baked whole wheat bread",
      inStock: true,
    },
    {
      id: "4",
      name: "Seasonal Vegetables",
      price: "₹20/kg",
      category: "Produce",
      icon: "apple",
      description: "Fresh seasonal vegetables from local farmers",
      inStock: true,
    },
    {
      id: "5",
      name: "Basic Medicine Kit",
      price: "₹150",
      category: "Healthcare",
      icon: "pill",
      description: "Essential medicines for common ailments",
      inStock: true,
    },
    {
      id: "6",
      name: "Household Essentials",
      price: "₹80",
      category: "Daily Needs",
      icon: "package",
      description: "Basic household items and cleaning supplies",
      inStock: true,
    },
    {
      id: "7",
      name: "Cooking Oil",
      price: "₹120/liter",
      category: "Kitchen",
      icon: "droplet",
      description: "Pure sunflower cooking oil",
      inStock: true,
    },
    {
      id: "8",
      name: "Sugar",
      price: "₹40/kg",
      category: "Kitchen",
      icon: "cube",
      description: "Fine quality white sugar",
      inStock: true,
    },
  ];

  // Handle search query if provided
  const search = req.query.search as string;
  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Handle category filter if provided
  const category = req.query.category as string;
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase(),
    );
  }

  const response: ProductsResponse = {
    products: filteredProducts,
  };

  res.json(response);
};
