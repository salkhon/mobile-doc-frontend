import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import LineChartComponent from "./chart";
import {

  getPatient,

} from "../../../api/patient";


import LoadingBackdrop from "../../../components/Backdrop/LoadingBackdrop";
import { useEffect } from "react";
import {
  useAuth
}
  from "../../../hooks/auth";

const Details = () => {

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


  const { userId } = useAuth();


  // const weightHist = [60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 55];

  const bloodPressureSys = [
    120, 130, 110, 108, 120, 130, 110, 108, 120, 130, 110, 108,
  ];
  const bloodPressureDia = [
    60, 92, 110, 108, 120, 80, 110, 108, 56, 55, 110, 80,
  ];

  const [weightChartVisible, setWeightChartVisible] = useState(true);
  const [bpChartVisible, setBpChartVisible] = useState(true);

  const [patient, setPatient] = useState(null);
  useEffect(() => {
    getPatient(userId).then((patient) => setPatient(patient));
  }, [userId]);


  const date_of_birth = patient?.date_of_brth;

  const age = new Date().getFullYear() - new Date(date_of_birth).getFullYear();

  const blood_group = patient?.general_information.blood_group;
  const diabetes = patient?.general_information.diabetes;

  const smoking_hist = patient?.general_information.smoking_history;

  const asthma = patient?.general_information.asthema;

  const liver_problem = patient?.general_information.liver_problem;

  const kidney_problem = patient?.general_information.kidney_problem;

  const allergies = patient?.general_information.allergies;



  // create an array from patient.physical_attributes values where name=="weight"
  const weightObjects = patient?.physical_attributes.filter((item) => item.name === "Weight");

  //create weights array by taking the values from weightObjects
  const weights = weightObjects?.map((item) => item.value);

  //create dates array by taking the values from weightObjects
  const dates = weightObjects?.map((item) => item.date_added);

  //extract month from dates array
  var months2 = dates?.map((item) => item.slice(5, 10));

  //sort
  months2 = months2?.sort();


  if (!patient) {
    return <LoadingBackdrop />;
  }

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
          <div className="detailBar3">{blood_group}</div>
        </div>
      </div>
      <div className="detailBar">
        <div className="detailBar2">
          <FontAwesomeIcon icon={faIcons} />
          <div className="detailBar3">{weights.slice(-1)[0]} kg</div>
        </div>
        <FontAwesomeIcon
          icon={faIcons}
          onClick={() => setWeightChartVisible(!weightChartVisible)}
        />
      </div>
      {weightChartVisible && (
        <LineChartComponent data1={weights} months={months2} />
      )}

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


      {smoking_hist && (
        <div className="detailBar">
          <div className="detailBar2">
            <FontAwesomeIcon icon={faIcons} />
            <div className="detailBar3">Smoker</div>
          </div>
        </div>)}

      {diabetes && (
        <div className="detailBar">
          <div className="detailBar2">
            <FontAwesomeIcon icon={faIcons} />
            <div className="detailBar3">Diabetic</div>
          </div>
        </div>)}

      {asthma && (
        <div className="detailBar">
          <div className="detailBar2">
            <FontAwesomeIcon icon={faIcons} />
            <div className="detailBar3">Asthmatic</div>
          </div>
        </div>)}
      {liver_problem && (
        <div className="detailBar">
          <div className="detailBar2">
            <FontAwesomeIcon icon={faIcons} />
            <div className="detailBar3">Liver Problem: {liver_problem}</div>
          </div>
        </div>)}

      {kidney_problem && (
        <div className="detailBar">
          <div className="detailBar2">
            <FontAwesomeIcon icon={faIcons} />
            <div className="detailBar3">Kidney Problem: {kidney_problem}</div>
          </div>
        </div>)}




    </div>
  );
};

export default Details;
