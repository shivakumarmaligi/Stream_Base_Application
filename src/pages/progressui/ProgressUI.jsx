import React, { useState } from "react";

let ProgressUI = () => {
  let [progress, setProgress] = useState(0);
  return (
    <div class="progress">
      <div class="bar" style={{ width: `${progress}%` }}>
        <p class="percent"> {Math.round(progress)}</p>
      </div>
    </div>
  );
};

export default ProgressUI;
