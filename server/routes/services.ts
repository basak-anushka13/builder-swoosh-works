import { RequestHandler } from "express";
import { ServicesResponse } from "@shared/api";

export const getServices: RequestHandler = (req, res) => {
  const services = [
    {
      id: "1",
      name: "Grocery Delivery",
      description: "Fresh groceries delivered to your doorstep",
      icon: "shopping-bag"
    },
    {
      id: "2",
      name: "Medicine Supply",
      description: "Essential medicines and healthcare products",
      icon: "pill"
    },
    {
      id: "3",
      name: "Fresh Produce",
      description: "Farm-fresh fruits and vegetables",
      icon: "apple"
    },
    {
      id: "4",
      name: "Agricultural Supplies",
      description: "Seeds, fertilizers, and farming equipment",
      icon: "wheat"
    },
    {
      id: "5",
      name: "Transportation",
      description: "Reliable transport services for rural areas",
      icon: "car"
    },
    {
      id: "6",
      name: "Community Support",
      description: "Local community assistance and guidance",
      icon: "users"
    }
  ];

  const response: ServicesResponse = {
    services
  };

  res.json(response);
};
