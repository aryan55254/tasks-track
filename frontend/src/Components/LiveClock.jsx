import React, { useState, useEffect } from "react";

function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="hidden lg:block text-3xl font-mono text-gray-300 tracking-wider">
      <p>{formattedTime}</p>
    </div>
  );
}

export default LiveClock;
