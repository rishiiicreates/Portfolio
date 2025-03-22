import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define chat message structure
interface ChatMessage {
  type: 'chat' | 'system' | 'typing';
  sender: string;
  content: string;
  timestamp: number;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('connecting');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  
  // Create and setup WebSocket connection
  const setupWebSocket = useCallback(() => {
    if (reconnectAttempts > 5) {
      setConnectionStatus('error');
      return;
    }
    
    try {
      setConnectionStatus('connecting');
      
      // Create WebSocket connection
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('Connected to WebSocket');
        setIsConnected(true);
        setConnectionStatus('connected');
        setReconnectAttempts(0);
        
        // Add a welcome message if this is the first connection
        if (messages.length === 0) {
          // This is just a local message, the server will send its own welcome message
          setMessages([{
            type: 'system',
            sender: 'System',
            content: 'Connecting to chat...',
            timestamp: Date.now()
          }]);
        }
      };
      
      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as ChatMessage;
          
          // Handle typing indicators
          if (message.type === 'typing') {
            setIsTyping(true);
          } else {
            // It's a regular message, add it to the messages array
            setMessages(prevMessages => [...prevMessages, message]);
            setIsTyping(false);
            
            // If chat is not open, animate the chat button
            if (!isOpen) {
              // You could add some notification animation here
            }
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      
      ws.onclose = (event) => {
        console.log(`WebSocket closed with code: ${event.code}`, event.reason);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Attempt to reconnect after a delay, with exponential backoff
        const reconnectDelay = Math.min(1000 * (Math.pow(2, reconnectAttempts)), 10000);
        console.log(`Attempting to reconnect in ${reconnectDelay}ms`);
        
        if (reconnectTimeoutRef.current) {
          window.clearTimeout(reconnectTimeoutRef.current);
        }
        
        reconnectTimeoutRef.current = window.setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          setupWebSocket();
        }, reconnectDelay);
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        // Let the onclose handler handle reconnection
      };
      
      socketRef.current = ws;
      setSocket(ws);
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setConnectionStatus('error');
      
      // Attempt to reconnect after a delay
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
      
      reconnectTimeoutRef.current = window.setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
        setupWebSocket();
      }, 5000);
    }
  }, [reconnectAttempts, messages.length, isOpen]);
  
  // Initial WebSocket setup
  useEffect(() => {
    setupWebSocket();
    
    // Clean up on unmount
    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN || 
          socketRef.current?.readyState === WebSocket.CONNECTING) {
        socketRef.current.close();
      }
      
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [setupWebSocket]);
  
  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // Mark messages as read
      // In a real app, you might want to send a "read" status to the server
    }
  }, [isOpen]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const sendMessage = useCallback(() => {
    if (!inputMessage.trim() || !socketRef.current || !isConnected) return;
    
    const newMessage: ChatMessage = {
      type: 'chat',
      sender: 'You',
      content: inputMessage,
      timestamp: Date.now()
    };
    
    // Send message via WebSocket
    socketRef.current.send(JSON.stringify(newMessage));
    
    // Clear input
    setInputMessage('');
  }, [inputMessage, isConnected]);
  
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in input
      sendMessage();
    }
  }, [sendMessage]);
  
  // Format timestamp to human-readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Status indicators based on connection state
  const connectionIndicator = {
    connecting: { color: 'bg-yellow-400', text: 'Connecting...' },
    connected: { color: 'bg-green-400', text: 'Online' },
    disconnected: { color: 'bg-red-400', text: 'Reconnecting...' },
    error: { color: 'bg-red-600', text: 'Connection Error' }
  };

  const currentStatus = connectionIndicator[connectionStatus];

  // Animation variants
  const chatButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, boxShadow: '0 0 15px rgba(226, 192, 68, 0.5)' },
    tap: { scale: 0.9 },
    notification: { 
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, -10, 0],
      transition: { 
        duration: 0.8, 
        repeat: 3, 
        repeatType: 'loop' as const 
      }
    }
  };

  // Message bubble variants for animation
  const messageBubbleVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat Button with One Piece themed design */}
      <motion.div
        className="relative"
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        animate={!isOpen && messages.length > 0 ? "notification" : "initial"}
        variants={chatButtonVariants}
      >
        {/* Decorative waves around the button */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-secondary/30"
          animate={{ 
            scale: [1, 1.2, 1.2, 1, 1],
            opacity: [0.3, 0.5, 0.5, 0.3, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />
        
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg relative z-10 border-2 border-secondary/30 overflow-hidden"
          onClick={toggleChat}
        >
          {/* Sea wave effect inside button */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 h-1/3 bg-primary/20"
            animate={{ 
              y: [0, -5, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          
          {/* Wave pattern */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 h-1/4 bg-secondary/30"
            style={{
              clipPath: 'polygon(0% 100%, 4% 80%, 8% 100%, 12% 80%, 16% 100%, 20% 80%, 24% 100%, 28% 80%, 32% 100%, 36% 80%, 40% 100%, 44% 80%, 48% 100%, 52% 80%, 56% 100%, 60% 80%, 64% 100%, 68% 80%, 72% 100%, 76% 80%, 80% 100%, 84% 80%, 88% 100%, 92% 80%, 96% 100%, 100% 80%, 100% 100%)'
            }}
            animate={{ 
              y: [0, -3, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          
          <i className={`text-2xl text-background ${isOpen ? 'ri-close-line' : 'ri-message-3-line'}`}></i>
          
          {/* Small straw hat icon on top of button */}
          <div className="absolute -top-1 -left-1 w-5 h-5">
            <i className="ri-lifebuoy-fill text-primary text-sm"></i>
          </div>
        </motion.button>
        
        {/* Notification badge */}
        {!isOpen && messages.length > 0 && (
          <motion.div 
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-background font-semibold border border-background/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            {messages.filter(m => m.sender !== 'You').length}
          </motion.div>
        )}
      </motion.div>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[450px] bg-background/90 backdrop-blur-sm rounded-2xl shadow-xl border border-secondary/20 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Chat Header - One Piece themed */}
            <div className="bg-gradient-to-r from-secondary to-primary p-4 text-background relative overflow-hidden">
              {/* Decorative waves in header */}
              <motion.div 
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)'
                }}
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              {/* Wave pattern */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-background/10"
                style={{
                  clipPath: 'polygon(0% 100%, 4% 60%, 8% 100%, 12% 60%, 16% 100%, 20% 60%, 24% 100%, 28% 60%, 32% 100%, 36% 60%, 40% 100%, 44% 60%, 48% 100%, 52% 60%, 56% 100%, 60% 60%, 64% 100%, 68% 60%, 72% 100%, 76% 60%, 80% 100%, 84% 60%, 88% 100%, 92% 60%, 96% 100%, 100% 60%, 100% 100%)'
                }}
              />
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3 relative overflow-hidden border border-white/30">
                  <i className="ri-user-smile-line text-xl"></i>
                  
                  {/* Mini straw hat on the avatar */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center">
                    <i className="ri-lifebuoy-line text-[10px]"></i>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold flex items-center gap-2">
                    Grand Line Assistant
                    <motion.span
                      className="text-xs font-normal bg-background/20 px-1.5 py-0.5 rounded-md"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Pirate Bot
                    </motion.span>
                  </h3>
                  <div className="flex items-center text-xs">
                    <span className={`w-2 h-2 rounded-full ${currentStatus.color} mr-2`}></span>
                    <span>{currentStatus.text}</span>
                  </div>
                </div>
                
                {/* Close button within header */}
                <motion.button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors"
                  onClick={toggleChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="ri-close-line"></i>
                </motion.button>
              </div>
            </div>
            
            {/* Chat Messages with Ocean/Pirate theme */}
            <div className="flex-1 overflow-y-auto p-4 bg-background/80 relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
                }}></div>
              </div>
              
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-light/60 px-4">
                  <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-4 relative overflow-hidden">
                    <i className="ri-ship-line text-4xl text-secondary/70"></i>
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-primary/20"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Welcome Aboard!</h3>
                  <p className="mb-2">Your journey through the portfolio begins here.</p>
                  <p className="text-sm mb-4">Ask me anything about the projects, skills, or request to join the crew!</p>
                  
                  {/* Quick action buttons */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <motion.button
                      className="px-3 py-1.5 text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (socketRef.current?.readyState === WebSocket.OPEN) {
                          const newMessage: ChatMessage = {
                            type: 'chat',
                            sender: 'You',
                            content: 'Tell me about your projects',
                            timestamp: Date.now()
                          };
                          socketRef.current.send(JSON.stringify(newMessage));
                        }
                      }}
                    >
                      <i className="ri-code-box-line mr-1"></i> View Projects
                    </motion.button>
                    
                    <motion.button
                      className="px-3 py-1.5 text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (socketRef.current?.readyState === WebSocket.OPEN) {
                          const newMessage: ChatMessage = {
                            type: 'chat',
                            sender: 'You',
                            content: 'What skills do you have?',
                            timestamp: Date.now()
                          };
                          socketRef.current.send(JSON.stringify(newMessage));
                        }
                      }}
                    >
                      <i className="ri-tools-line mr-1"></i> Skills & Expertise
                    </motion.button>
                    
                    <motion.button
                      className="px-3 py-1.5 text-xs bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (socketRef.current?.readyState === WebSocket.OPEN) {
                          const newMessage: ChatMessage = {
                            type: 'chat',
                            sender: 'You',
                            content: 'How can I contact you?',
                            timestamp: Date.now()
                          };
                          socketRef.current.send(JSON.stringify(newMessage));
                        }
                      }}
                    >
                      <i className="ri-contacts-line mr-1"></i> Get in Touch
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.div layout>
                  {messages.map((message, index) => (
                    <motion.div 
                      key={index} 
                      className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
                      variants={messageBubbleVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ 
                        type: 'spring', 
                        stiffness: 500, 
                        damping: 30,
                        delay: index * 0.05
                      }}
                    >
                      {/* System messages are centered */}
                      {message.type === 'system' ? (
                        <div className="text-center my-4">
                          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-light/70 text-xs">
                            {message.content}
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-end gap-2 mb-1">
                            {message.sender !== 'You' && (
                              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-secondary/30">
                                <i className="ri-user-smile-line text-xs text-secondary"></i>
                                
                                {/* Mini hat */}
                                <div className="absolute -top-1 -right-1 w-3 h-3">
                                  <i className="ri-lifebuoy-line text-[8px] text-secondary"></i>
                                </div>
                                
                                {/* Wave animation at bottom of avatar */}
                                <motion.div 
                                  className="absolute inset-x-0 bottom-0 h-1/4 bg-primary/20"
                                  animate={{ y: [0, -1, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>
                            )}
                            
                            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                              message.sender === 'You' 
                                ? 'bg-gradient-to-r from-secondary/90 to-secondary text-background ml-auto' 
                                : 'bg-gradient-to-r from-primary/5 to-primary/10 text-light border border-primary/10'
                            }`}>
                              {message.content}
                            </div>
                          </div>
                          
                          <div className={`text-xs text-light/40 ${message.sender === 'You' ? 'text-right' : 'text-left'} px-2`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden border border-secondary/30">
                        <i className="ri-user-smile-line text-xs text-secondary"></i>
                        <motion.div 
                          className="absolute inset-x-0 bottom-0 h-1/4 bg-primary/20"
                          animate={{ y: [0, -1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <div className="px-4 py-3 rounded-2xl bg-primary/5 border border-primary/10 text-light flex items-center">
                        <motion.div 
                          className="flex space-x-1"
                          initial={{ opacity: 0.5 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                        >
                          <div className="w-2 h-2 bg-light/60 rounded-full"></div>
                          <motion.div 
                            className="w-2 h-2 bg-light/60 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }}
                          ></motion.div>
                          <motion.div 
                            className="w-2 h-2 bg-light/60 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, delay: 0.4, repeat: Infinity }}
                          ></motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input - Pirate-themed */}
            <div className="p-3 border-t border-light/10 bg-background/90 relative">
              {/* Wave pattern above input */}
              <div className="absolute inset-x-0 top-0 h-1 bg-secondary/10"
                style={{
                  clipPath: 'polygon(0% 0%, 4% 100%, 8% 0%, 12% 100%, 16% 0%, 20% 100%, 24% 0%, 28% 100%, 32% 0%, 36% 100%, 40% 0%, 44% 100%, 48% 0%, 52% 100%, 56% 0%, 60% 100%, 64% 0%, 68% 100%, 72% 0%, 76% 100%, 80% 0%, 84% 100%, 88% 0%, 92% 100%, 96% 0%, 100% 100%, 100% 0%)'
                }}
              />
              
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 bg-light/5 border border-light/10 rounded-full px-4 py-2.5 text-light focus:outline-none focus:border-secondary/30 focus:bg-light/10 transition-colors"
                  placeholder={connectionStatus === 'connected' ? "Type your message..." : "Connecting..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected}
                />
                
                <motion.button
                  className={`w-10 h-10 rounded-full relative overflow-hidden ${
                    inputMessage.trim() && isConnected 
                      ? 'bg-secondary text-background' 
                      : 'bg-light/10 text-light/30'
                  } flex items-center justify-center border ${inputMessage.trim() && isConnected ? 'border-secondary/30' : 'border-light/5'}`}
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || !isConnected}
                  whileHover={inputMessage.trim() && isConnected ? { scale: 1.1 } : {}}
                  whileTap={inputMessage.trim() && isConnected ? { scale: 0.9 } : {}}
                >
                  {/* Animated wave inside send button */}
                  {inputMessage.trim() && isConnected && (
                    <motion.div 
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-background/10"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  
                  <i className="ri-send-plane-fill relative z-10"></i>
                </motion.button>
              </div>
              
              <div className="mt-2 text-center flex items-center justify-center gap-1.5">
                <i className="ri-sailboat-line text-xs text-secondary/60"></i>
                <span className="text-xs text-light/40">Grand Line Messenger</span>
                <i className="ri-sailboat-line text-xs text-secondary/60"></i>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;