import { RequestHandler } from "express";
import { NewsResponse } from "@shared/api";

export const getNews: RequestHandler = (req, res) => {
  const news = [
    {
      id: "1",
      title: "New Healthcare Initiative Launched for Rural Areas",
      summary: "Government announces free medical check-ups in 50 villages",
      date: "2024-12-15",
      content: "The government has launched a comprehensive healthcare initiative targeting rural areas, providing free medical check-ups and basic healthcare services in 50 villages across the region. This initiative aims to improve healthcare accessibility for rural communities and includes mobile medical units, telemedicine consultations, and health awareness programs."
    },
    {
      id: "2",
      title: "Organic Farming Training Program Starts Next Month",
      summary: "Join our sustainable agriculture workshop for better yields",
      date: "2024-12-10",
      content: "A new organic farming training program will begin next month, offering farmers the opportunity to learn sustainable agriculture techniques. The program covers soil health management, organic pest control, composting, and certification processes. Participants will receive hands-on training and ongoing support to transition to organic farming methods."
    },
    {
      id: "3",
      title: "Mobile Market Service Expands to 20 New Villages",
      summary: "Weekly mobile markets now serving more remote communities",
      date: "2024-12-08",
      content: "Our mobile market service has expanded to include 20 additional villages, bringing essential goods and services directly to remote communities. The mobile markets operate on a weekly schedule, offering fresh produce, medicines, household items, and other necessities. This expansion ensures that even the most isolated villages have access to essential products."
    },
    {
      id: "4",
      title: "Digital Literacy Program for Rural Youth Launched",
      summary: "Free computer and internet training for young people in villages",
      date: "2024-12-05",
      content: "A new digital literacy program has been launched to provide free computer and internet training for young people in rural areas. The program aims to bridge the digital divide and equip rural youth with essential digital skills for better employment opportunities and access to online services."
    },
    {
      id: "5",
      title: "Rural Water Conservation Project Achieves Milestone",
      summary: "Community-led initiative saves 1 million liters of water",
      date: "2024-12-01",
      content: "A community-led water conservation project has successfully saved over 1 million liters of water through rainwater harvesting and efficient irrigation techniques. The project serves as a model for other rural communities looking to address water scarcity challenges."
    }
  ];

  const response: NewsResponse = {
    news
  };

  res.json(response);
};
