import React, { useEffect, useRef } from "react";

const TopBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasChildNodes()) {
      const confScript = document.createElement("script");
      confScript.type = "text/javascript";
      confScript.innerHTML = `
        atOptions = {
          'key' : '11e14c94675fd7062a2c0f88fd15a27c',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highrevenueformat.com/11e14c94675fd7062a2c0f88fd15a27c/invoke.js";

      adRef.current.appendChild(confScript);
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "15px 0", overflow: "hidden" }}>
      <div ref={adRef}></div>
    </div>
  );
};

export default TopBanner;