import { useState, useEffect } from 'react';

const useCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState('');

    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); 
        const minutes = String(now.getMinutes()).padStart(2, '0'); 
        setCurrentTime(`${hours}:${minutes}`);
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 60000); 
        return () => clearInterval(intervalId); 
    }, []);

    return currentTime;
};

export default useCurrentTime;