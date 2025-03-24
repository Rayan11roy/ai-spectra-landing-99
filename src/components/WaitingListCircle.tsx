
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type WaitingUser = {
  id: number;
  image: string;
  name: string;
  position: number; // For calculating position in the circle
};

const WaitingListCircle = () => {
  // Sample users for the waiting list
  const waitingUsers: WaitingUser[] = [
    { id: 1, image: "https://i.pravatar.cc/150?img=1", name: "Alex M.", position: 0 },
    { id: 2, image: "https://i.pravatar.cc/150?img=2", name: "Taylor S.", position: 1 },
    { id: 3, image: "https://i.pravatar.cc/150?img=3", name: "Jordan P.", position: 2 },
    { id: 4, image: "https://i.pravatar.cc/150?img=4", name: "Casey B.", position: 3 },
    { id: 5, image: "https://i.pravatar.cc/150?img=5", name: "Riley T.", position: 4 },
    { id: 6, image: "https://i.pravatar.cc/150?img=6", name: "Morgan L.", position: 5 },
    { id: 7, image: "https://i.pravatar.cc/150?img=7", name: "Jamie R.", position: 6 },
  ];

  // Calculate positions in a circle
  const calculatePosition = (position: number, totalUsers: number) => {
    const angle = (position / totalUsers) * 2 * Math.PI;
    const radius = 95; // Radius of the circle in pixels
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Create a count of people who have joined
  const joinedCount = 243; // Example count
  
  return (
    <div className="relative w-full max-w-[230px] h-[230px] mx-auto">
      {/* Center counter */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="red-glass-panel p-4 rounded-full w-24 h-24 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{joinedCount}+</span>
          <span className="text-[10px] text-gray-300 uppercase tracking-wider">Joined</span>
        </div>
      </div>
      
      {/* Circular path for avatars */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-techred-500/20"></div>
      
      {/* Users avatars */}
      {waitingUsers.map((user) => {
        const { x, y } = calculatePosition(user.position, waitingUsers.length);
        return (
          <div
            key={user.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              zIndex: 20 - user.position, // Higher positions get lower z-index
            }}
          >
            <div className="relative group">
              <Avatar className="border-2 border-techred-500/40 ring-2 ring-black/5 w-12 h-12 transition-all duration-300 group-hover:scale-110">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-techred-500/30 text-white text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="py-1 px-2 bg-black/80 text-white text-xs rounded whitespace-nowrap">
                  {user.name}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Additional decorative elements */}
      <div className="absolute top-0 right-0 w-5 h-5 bg-techred-400/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 left-0 w-3 h-3 bg-techred-500/30 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
    </div>
  );
};

export default WaitingListCircle;
