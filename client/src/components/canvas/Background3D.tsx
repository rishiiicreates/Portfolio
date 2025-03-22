import React from 'react';

// Simpler background component to avoid Three.js errors while we focus on the chat functionality
const Background3D: React.FC = () => {
  return (
    <div className="canvas-container">
      <div className="fixed inset-0 bg-background">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.4) 0%, rgba(15, 23, 42, 0) 50%)",
            animation: "pulse 8s ease-in-out infinite alternate"
          }}
        ></div>
        
        {/* Subtle particle effect using CSS */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-secondary/30"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            ></div>
          ))}
        </div>

        {/* Star-like elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite alternate`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            ></div>
          ))}
        </div>

        {/* Add some CSS animations */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.2; }
              50% { transform: scale(1.05); opacity: 0.3; }
              100% { transform: scale(1); opacity: 0.2; }
            }
            
            @keyframes float {
              0% { transform: translateY(0) translateX(0); }
              25% { transform: translateY(-20px) translateX(10px); }
              50% { transform: translateY(-10px) translateX(20px); }
              75% { transform: translateY(-30px) translateX(-10px); }
              100% { transform: translateY(-20px) translateX(0); }
            }
            
            @keyframes twinkle {
              0% { opacity: 0.3; }
              50% { opacity: 0.8; }
              100% { opacity: 0.3; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Background3D;
