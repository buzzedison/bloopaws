"use client"

import  { useEffect } from 'react';

const Newsletter = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://bloopglobal.ck.page/038e2145b8/index.js";
    script.async = true;
    script.dataset.uid = "038e2145b8";
    document.body.appendChild(script);

    return () => {
      // Clean up the script element to prevent memory leaks
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="newsletter-signup">
      {/* This div will be replaced by the contents loaded by the script */}
    </div>
  );
};

export default Newsletter;
