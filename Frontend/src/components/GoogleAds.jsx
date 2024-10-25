import React, { useEffect } from "react";

const GoogleAd = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9113761475547193"
        data-ad-slot="6380881644"
        data-ad-format="fluid"
      ></ins>
    </div>
  );
};

export default GoogleAd;
