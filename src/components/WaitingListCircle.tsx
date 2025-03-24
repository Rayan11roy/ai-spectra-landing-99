
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type WaitingUser = {
  id: number;
  image: string;
  name: string;
  position: number;
};

const WaitingListCircle = () => {
  // Sample users for the waiting list
  const waitingUsers: WaitingUser[] = [
    { id: 1, image: "https://i.pravatar.cc/150?img=1", name: "Alex M.", position: 0 },
    { id: 2, image: "https://i.pravatar.cc/150?img=2", name: "Taylor S.", position: 1 },
    { id: 3, image: "https://i.pravatar.cc/150?img=3", name: "Jordan P.", position: 2 },
  ];

  // Create a count of people who have joined
  const joinedCount = 243; // Example count - you can replace with actual count

  return (
    <div className="relative w-full max-w-[280px] h-auto mx-auto mb-4">
      <div className="flex items-center gap-0 relative">
        {/* User avatars in overlapping style */}
        {waitingUsers.map((user, index) => (
          <div 
            key={user.id}
            className="relative"
            style={{ 
              marginLeft: index === 0 ? '0' : '-8px',
              zIndex: 30 - index
            }}
          >
            <Avatar 
              className={`border-2 border-techred-500/40 ${index === 0 ? 'bg-techred-500' : index === 1 ? 'bg-blue-500' : 'bg-yellow-500'} w-10 h-10 text-white transition-all duration-300 hover:scale-110`}
            >
              {index === 0 && (
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">
                  {joinedCount}+
                </div>
              )}
              {index !== 0 && (
                <>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-white text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
          </div>
        ))}
        
        {/* Text content */}
        <div className="ml-2 flex-1">
          <p className="text-sm text-white/90 font-medium">
            Join <span className="text-white font-bold">{joinedCount}+</span> tech fans already waiting
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingListCircle;
