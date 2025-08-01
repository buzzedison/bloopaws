// app/components/TidioChat.js
"use client"
import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.tidio.co/YOUR_PUBLIC_KEY.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TidioChat;
