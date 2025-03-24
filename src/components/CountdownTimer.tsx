
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  // Set the launch date to 3 months from now
  const calculateTargetDate = () => {
    const now = new Date();
    const target = new Date();
    target.setMonth(now.getMonth() + 3);
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
        <p className="text-xs font-medium text-gray-300 mb-1">Launching In</p>
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
