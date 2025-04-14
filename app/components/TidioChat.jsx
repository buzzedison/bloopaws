// app/components/TidioChat.js
"use client"
import { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//code.tidio.co/tckgbtz9lexnq4xu5mdd2xfx6nwhrohv.js" // Your project ID here;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default TidioChat;
