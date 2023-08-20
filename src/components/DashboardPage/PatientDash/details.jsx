import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import LineChartComponent from "./chart";

const Details = () => {
  const age = "20";
  const bloodGroup = "A+";
  const months = [
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
  ];
  const weightHist = [60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 55];
  const gender = "female";
  const bloodPressureSys = [
    120, 130, 110, 108, 120, 130, 110, 108, 120, 130, 110, 108,
  ];
  const bloodPressureDia = [
    60, 92, 110, 108, 120, 80, 110, 108, 56, 55, 110, 80,
  ];
  const smokingHist = "Past Smoker";
  const misc = ["Recovering from Covid"];

  const [weightChartVisible, setWeightChartVisible] = useState(true);
  const [bpChartVisible, setBpChartVisible] = useState(true);

  return (
    <div>
      <h3>Details</h3>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{age} years</div>
        </div>
      </div>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{bloodGroup}</div>
        </div>
      </div>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{weightHist.slice(-1)[0]} kg</div>
        </div>
        <FontAwesomeIcon
          icon={faIcons}
          onClick={() => setWeightChartVisible(!weightChartVisible)}
        />
      </div>
      {weightChartVisible && (
        <LineChartComponent data1={weightHist} months={months} />
      )}

      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{gender}</div>
        </div>
      </div>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">
            {bloodPressureSys.slice(-1)[0]}/{bloodPressureDia.slice(-1)[0]}
          </div>
        </div>

        <FontAwesomeIcon
          icon={faIcons}
          onClick={() => setBpChartVisible(!bpChartVisible)}
        />
      </div>
      {bpChartVisible && (
        <LineChartComponent
          data1={bloodPressureDia}
          data2={bloodPressureSys}
          months={months}
        />
      )}

      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{smokingHist}</div>
        </div>
      </div>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{misc}</div>
        </div>
      </div>
    </div>
  );
};

export default Details;
