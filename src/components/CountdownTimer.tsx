
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Set up persistent target date that doesn't reset on page reload
  const calculateTargetDate = () => {
    // Check if we have a saved target date in localStorage
    const savedTargetDate = localStorage.getItem('launchTargetDate');
    
    if (savedTargetDate) {
      const parsedDate = new Date(savedTargetDate);
      
      // Validate the parsed date - if it's invalid or in the past, create a new one
      if (isNaN(parsedDate.getTime()) || parsedDate <= new Date()) {
        return createAndSaveNewTargetDate();
      }
      
      return parsedDate;
    } else {
      // No saved date, create a new one
      return createAndSaveNewTargetDate();
    }
  };
  
  // Helper function to create and save a new target date to July
  const createAndSaveNewTargetDate = () => {
    const target = new Date();
    // Set to July 31st of current year
    target.setMonth(6); // July is month 6 (zero-indexed)
    target.setDate(31);
    target.setHours(23, 59, 59, 999);
    
    // If July has already passed this year, set to next year
    if (target <= new Date()) {
      target.setFullYear(target.getFullYear() + 1);
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('launchTargetDate', target.toISOString());
    return target;
  };

  const [targetDate] = useState(calculateTargetDate());
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Calculate immediately and then set up the interval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
  };

  return (
    <div className="red-glass-panel p-2 px-3 sm:p-3 rounded-lg">
      <div className="text-center">
        <p className="text-xs font-medium text-gray-300 mb-1">Launching In <span className="text-techred-300">July</span></p>
        <div className="flex justify-center gap-2 sm:gap-3 text-white">
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm sm:text-base">{formatNumber(timeLeft.days)}</span>
            <span className="text-[9px] sm:text-[10px] text-gray-400">DAYS</span>
          </div>
          <span className="text-sm sm:text-base font-bold text-techred-400">:</span>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm sm:text-base">{formatNumber(timeLeft.hours)}</span>
            <span className="text-[9px] sm:text-[10px] text-gray-400">HRS</span>
          </div>
          <span className="text-sm sm:text-base font-bold text-techred-400">:</span>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm sm:text-base">{formatNumber(timeLeft.minutes)}</span>
            <span className="text-[9px] sm:text-[10px] text-gray-400">MIN</span>
          </div>
          <span className="text-sm sm:text-base font-bold text-techred-400">:</span>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm sm:text-base">{formatNumber(timeLeft.seconds)}</span>
            <span className="text-[9px] sm:text-[10px] text-gray-400">SEC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
