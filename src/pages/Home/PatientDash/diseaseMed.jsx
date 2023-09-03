import React from "react";
import HorizontalBar from "./hBar";


const diseaseMed = ({
  diseaseName,
  medNames,
  medDosage,
  medDaysRemaining,
}) => {
  const n = medNames.length;
  const boxes = [];
  for (let i = 0; i < n; i++) {
    boxes.push(
      <HorizontalBar
        text1={medNames[i]}
        text2={medDosage[i]}
        text3={medDaysRemaining[i]}
      />
    );
  }

  return (
    <div style={{ padding: "2%" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{diseaseName}</h4>
      </div>
      {boxes}
    </div>
  );
};

export default diseaseMed;
