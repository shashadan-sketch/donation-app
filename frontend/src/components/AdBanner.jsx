import React, { useEffect, useRef } from "react";

const AdBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasChildNodes()) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl31496411.profitableratecpmnetwork.com/769adad94180a4073374bcb749da4553/invoke.js";

      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "25px 0" }}>
      <div id="container-769adad94180a4073374bcb749da4553" ref={adRef}></div>
    </div>
  );
};

export default AdBanner;