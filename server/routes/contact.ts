import { RequestHandler } from "express";
import { ContactRequest, ContactResponse } from "@shared/api";

// In-memory storage for contact submissions (in production, use a database)
interface ContactSubmission extends ContactRequest {
  id: string;
  submittedAt: string;
}

const contactSubmissions: ContactSubmission[] = [];
let submissionIdCounter = 1;

export const submitContact: RequestHandler = (req, res) => {
  try {
    const { name, message }: ContactRequest = req.body;

    // Validate required fields
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required",
      });
    }

    // Validate input lengths
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters",
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 10 and 1000 characters",
      });
    }

    // Create new contact submission
    const submission: ContactSubmission = {
      id: submissionIdCounter.toString(),
      name: name.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    contactSubmissions.push(submission);
    submissionIdCounter++;

    // Log submission for admin review (in production, send email notification)
    console.log("New contact submission:", submission);

    const response: ContactResponse = {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Admin endpoint to get all contact submissions (for internal use)
export const getContactSubmissions: RequestHandler = (req, res) => {
  try {
    // In production, add authentication middleware to protect this endpoint
    res.json({
      submissions: contactSubmissions.sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      ),
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
