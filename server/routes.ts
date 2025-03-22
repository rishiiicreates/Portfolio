import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";

// Define chat message structure
interface ChatMessage {
  type: 'chat' | 'system' | 'typing';
  sender: string;
  content: string;
  timestamp: number;
}

// Store connected clients
const clients = new Set<WebSocket>();

// Chat bot auto-responses
const botResponses = [
  "Thanks for reaching out! I'm a chat bot representing the portfolio owner. Would you like to know more about my skills or projects?",
  "I'd be happy to connect you with the portfolio owner. Please use the contact form for direct inquiries.",
  "This portfolio showcases a variety of projects using React, Three.js, and Framer Motion. Any particular area you'd like to know more about?",
  "The One Piece-inspired theme represents creativity and the journey of becoming a developer. It's all about the voyage!",
  "Feel free to explore the various sections. The 3D elements are built with Three.js and React Three Fiber."
];

// Helper function to get a random response
function getRandomBotResponse(): string {
  const randomIndex = Math.floor(Math.random() * botResponses.length);
  return botResponses[randomIndex];
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertMessageSchema.parse(req.body);
      
      // In a real implementation, this would save to a database
      // For now, we'll just return a success message
      res.status(200).json({ 
        success: true, 
        message: "Message received successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid request data",
          errors: error.errors 
        });
      }
      
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process your message" 
      });
    }
  });

  const httpServer = createServer(app);

  // Create WebSocket server on a specific path to avoid conflicts with Vite's HMR
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws' 
  });

  wss.on('connection', (socket) => {
    console.log('WebSocket client connected');
    
    // Add client to the set
    clients.add(socket);
    
    // Send welcome message
    const welcomeMessage: ChatMessage = {
      type: 'system',
      sender: 'System',
      content: 'Welcome to the portfolio chat! How can I help you today?',
      timestamp: Date.now()
    };
    
    socket.send(JSON.stringify(welcomeMessage));
    
    // Handle messages
    socket.on('message', (messageData) => {
      try {
        const message = JSON.parse(messageData.toString()) as ChatMessage;
        console.log('Received message:', message);
        
        // Broadcast message to all clients
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
        
        // If this is a user message, simulate a bot response
        if (message.type === 'chat' && message.sender !== 'Bot') {
          // Simulate typing indicator
          setTimeout(() => {
            const typingMessage: ChatMessage = {
              type: 'typing',
              sender: 'Bot',
              content: '',
              timestamp: Date.now()
            };
            
            clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(typingMessage));
              }
            });
          }, 500);
          
          // Send bot response after a delay
          setTimeout(() => {
            const botMessage: ChatMessage = {
              type: 'chat',
              sender: 'Bot',
              content: getRandomBotResponse(),
              timestamp: Date.now()
            };
            
            clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(botMessage));
              }
            });
          }, 2000);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });
    
    // Handle disconnection
    socket.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(socket);
    });
  });

  return httpServer;
}
